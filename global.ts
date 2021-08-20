import * as Buffer from "buffer";
import process from "process";

global.process = process;
global.Buffer = Buffer.Buffer;

import * as crypto from "crypto-js";
import { randomBytes } from "react-native-randombytes";

// exports.randomBytes =
//   exports.rng =
//   exports.pseudoRandomBytes =
//   exports.prng =
//     randomBytes;

global.crypto = crypto;
global.msCrypto = crypto;
global.crypto.getRandomBytes = randomBytes;
global.crypto.randomBytes = randomBytes;
global.crypto.getRandomValues = function getRandomValues(arr) {
  let orig = arr;
  if (arr.byteLength != arr.length) {
    // Get access to the underlying raw bytes
    arr = new Uint8Array(arr.buffer);
  }
  const bytes = crypto.randomBytes(arr.length);
  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes[i];
  }

  return orig;
};
global.crypto.createHash = () => {};