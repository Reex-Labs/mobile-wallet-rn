import * as bip39 from "bip39";
import { bech32 } from "bech32";
import * as bip32 from "bip32";
import { randomBytes, createHash } from "crypto";
// import * as secp256k1 from 'secp256k1'
import RIPEMD160 from "ripemd160";
import elliptic from "elliptic";
const secp256k1 = new elliptic.ec("secp256k1");

function sha256(text: Uint8Array) {
  const hash = createHash("sha256");
  return Uint8Array.from(hash.update(text).digest());
}

function ripemd160(text: Uint8Array) {
  const hash = new RIPEMD160();
  return Uint8Array.from(hash.update(Buffer.from(text)).digest());
}

function compressPubkey(pubkey: Uint8Array): Uint8Array {
  switch (pubkey.length) {
    case 33:
      return pubkey;
    case 65:
      return Uint8Array.from(
        secp256k1.keyFromPublic(pubkey).getPublic(true, "array")
      );
    default:
      throw new Error("Invalid pubkey length");
  }
}

export function getAddress() {
  const entropy = randomBytes(32);
  console.log("entropy:", entropy);
  const mnemonic = bip39.entropyToMnemonic(entropy);
  console.log("mnemonic:", mnemonic);
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  console.log("seed:", seed);
  const node = bip32.fromSeed(seed);
  console.log("node:", node);
  const child = node.derivePath("m/44'/118'/0'/0/0");
  console.log("child:", child);
  const privKey = child.privateKey;
  console.log("privKey:", privKey);
  const arrayBuffer = new Uint8Array(privKey.buffer);
  const keyPair = secp256k1.keyFromPrivate(privKey as Buffer);
  const pubKey = Uint8Array.from(keyPair.getPublic("array"));
  console.log("pubkey:", pubKey);
  const address = bech32.encode(
    "reex",
    ripemd160(sha256(compressPubkey(pubKey)))
  );
  console.log("address:", address);
  // const keyPair =
  // const address = bech32.encode('reex', )
}

export function generateMnemonic() {
  const entropy = randomBytes(32);
  const mnemonic = bip39.entropyToMnemonic(entropy);
  return mnemonic;
}
