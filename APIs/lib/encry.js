/* 
*  W3OS local encry part
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.AES encrypt & decrypt
*  2.md5
*/

import CryptoJS from "crypto-js";

//const debug=true;

let key = null;
let iv = null;

const Encry = {
  auto: (md5) => {
    Encry.setKey(md5.substring(0, 16));
    Encry.setIV(md5.substring(16, 32));
    return true;
  },
  setKey: (salt) => {
    key = CryptoJS.enc.Utf8.parse(salt);
  },
  setIV: (salt) => {
    iv = CryptoJS.enc.Utf8.parse(salt);
  },
  decrypt: (word) => {
    //if(debug) return word;
    try {
      const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      const decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      return decryptedStr.toString();
    } catch (error) {
      return false;
    }
  },
  encrypt: (word) => {
    //if(debug) return word;
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    //return encrypted.ciphertext.toString().toBase64();
    return encrypted.ciphertext.toString().toUpperCase();
  },
  md5: (str) => {
    return CryptoJS.MD5(str).toString();
  },
};

export default Encry;
