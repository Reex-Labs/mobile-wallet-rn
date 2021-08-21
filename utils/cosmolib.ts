/*
    Developed / Developing by Cosmostation
    [WARNING] CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.
*/
// import fetch from "node-fetch";
// import request from "request";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import { bech32 } from "bech32";
// import * as secp256k1 from "secp256k1";
const secp256k1 = require("secp256k1");
import { createHash } from "crypto-browserify";
// import bitcoinjs from "bitcoinjs-lib";
import * as message from "../proto/proto";
import seed from "./seed";

export class Cosmolib {
  url;
  chainId;
  path;
  bech32MainPrefix;

  constructor(url: string, chainId: string) {
    this.url = url;
    this.chainId = chainId;
    this.path = "m/44'/118'/0'/0/0";
    this.bech32MainPrefix = "reex";
  }

  // strength(128): 12 words, strength(256): 24 words
  getRandomMnemonic(strength = 256) {
    return bip39.generateMnemonic(strength);
  }

  setBech32MainPrefix(value: string) {
    this.bech32MainPrefix = value;
    if (!this.bech32MainPrefix)
      throw new Error("bech32MainPrefix object was not set or invalid");
  }

  setPath(value: string) {
    this.path = value;
    if (!this.path) throw new Error("path object was not set or invalid");
  }

  async getAddress(mnemonic: string, checkSum = true) {
    if (typeof mnemonic !== "string") {
      throw new Error("mnemonic expects a string");
    }
    if (checkSum) {
      if (!bip39.validateMnemonic(mnemonic))
        throw new Error("mnemonic phrases have invalid checksums");
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const node = bip32.fromSeed(seed);
    const child = node.derivePath(this.path);
    const words = bech32.toWords(child.identifier);
    return bech32.encode(this.bech32MainPrefix, words);
  }

  async getECPairPriv(mnemonic: string) {
    if (typeof mnemonic !== "string") {
      throw new Error("mnemonic expects a string");
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const node = bip32.fromSeed(seed);
    const child = node.derivePath(this.path);
    return child.privateKey;
  }

  getPubKey(privKey: string) {
    const pubKeyByte = secp256k1.publicKeyCreate(privKey);
    return pubKeyByte;
  }

  getPubKeyAny(privKey: string) {
    const pubKeyByte = secp256k1.publicKeyCreate(privKey);
    var buf1 = new Buffer.from([10]);
    var buf2 = new Buffer.from([pubKeyByte.length]);
    var buf3 = new Buffer.from(pubKeyByte);
    const pubKey = Buffer.concat([buf1, buf2, buf3]);
    const pubKeyAny = new message.google.protobuf.Any({
      type_url: "/cosmos.crypto.secp256k1.PubKey",
      value: pubKey,
    });
    return pubKeyAny;
  }

  getAccounts(address: string) {
    let accountsApi = "/cosmos/auth/v1beta1/accounts/";
    return fetch(this.url + accountsApi + address).then((response) =>
      response.json()
    );
  }

  async getBalance(address: string) {
    let balancesApi = "/cosmos/bank/v1beta1/balances/";
    const response = await fetch(this.url + balancesApi + address);
    if (response.status === 200) {
      return await response.json();
    } else {
      return null;
    }
  }

  getTxBody(from: string, to: string, amount: string) {
    const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
      from_address: from,
      to_address: to,
      amount: [{ denom: "reex", amount: String(amount) }], // 6 decimal places (1000000 uatom = 1 ATOM)
    });

    const msgSendAny = new message.google.protobuf.Any({
      type_url: "/cosmos.bank.v1beta1.MsgSend",
      value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish(),
    });

    const txBody = new message.cosmos.tx.v1beta1.TxBody({
      messages: [msgSendAny],
      memo: "",
    });

    return txBody;
  }

  async getAuthInfo(
    amount: string,
    pubKeyAny: string,
  ) {
    const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
      public_key: pubKeyAny,
      mode_info: {
        single: {
          mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
        },
      },
      sequence: "42", //getAccounts(address) - data => data.account.sequence
    });

    const feeValue = new message.cosmos.tx.v1beta1.Fee({
      amount: [{ denom: "reex", amount: String(amount) }],
      gas_limit: 200000,
    });

    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({
      signer_infos: [signerInfo],
      fee: feeValue,
    });

    return authInfo;
  }

  sign(txBody: any, authInfo: any, accountNumber: any, privKey: ArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer; } | undefined) {
    const bodyBytes = message.cosmos.tx.v1beta1.TxBody.encode(txBody).finish();
    const authInfoBytes =
      message.cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish();
    const signDoc = new message.cosmos.tx.v1beta1.SignDoc({
      body_bytes: bodyBytes,
      auth_info_bytes: authInfoBytes,
      chain_id: this.chainId,
      account_number: Number(accountNumber),
    });
    let signMessage =
      message.cosmos.tx.v1beta1.SignDoc.encode(signDoc).finish();
    const hash = createHash("sha256").update(signMessage).digest();
    const sig = secp256k1.ecdsaSign(hash, Buffer.from(privKey));
    const txRaw = new message.cosmos.tx.v1beta1.TxRaw({
      body_bytes: bodyBytes,
      auth_info_bytes: authInfoBytes,
      signatures: [sig.signature],
    });
    const txBytes = message.cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish();
    return txBytes;
  }

  async sendToken(from: string, to: string, amount: string, mnemonic: string) {
    // const data = await this.getAccounts(from);
    // console.log(data)
    const privKey = await this.getECPairPriv(mnemonic);
    const pubKeyAny = this.getPubKeyAny(privKey);
    const txBody = this.getTxBody(from, to, amount);
    const authInfo = await this.getAuthInfo(amount, pubKeyAny);
    const signedTx = this.sign(
      txBody,
      authInfo,
      '1', // data.account.account_number
      privKey
    );

    const responce = await this.broadcast(signedTx, "BROADCAST_MODE_BLOCK");
    return this.assertTransaction(responce);
  }

  // "BROADCAST_MODE_UNSPECIFIED", "BROADCAST_MODE_BLOCK", "BROADCAST_MODE_SYNC", "BROADCAST_MODE_ASYNC"
  async broadcast(signedTxBytes: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }, broadCastMode = "BROADCAST_MODE_SYNC") {
    const txBytesBase64 = Buffer.from(signedTxBytes, "binary").toString("base64");

    var options = {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tx_bytes: txBytesBase64, mode: broadCastMode }),
      // json: true,
    };

    try {
      let response = await fetch(this.url + "/cosmos/tx/v1beta1/txs", options);
      return await response.json()
    } catch (e) {
      console.log(e);
    }
  }

  assertTransaction(transactionResult: any) {
    const transactionInfo = {
      status: false,
      code: '',
      log: ''
    }
    if (!transactionResult) {
      return transactionInfo;
    }

    transactionInfo.code = transactionResult.tx_response.code;

    if (transactionInfo.code === '0') {
      transactionInfo.status = true
    }
    else {
      transactionInfo.log = transactionResult.tx_response.raw_log
    }
    
    return transactionInfo;
  }
}

export default new Cosmolib(seed[0], "reex");
