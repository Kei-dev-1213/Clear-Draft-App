import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.VITE_ENCRYPTION_KEY!;
const IV_LENGTH = 16;

// 暗号化
const encrypt = (text: string) => {
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
  const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.toString();
};

// 復号化
const decrypt = (text: string) => {
  const textParts = text.split(":");
  const iv = CryptoJS.enc.Hex.parse(textParts.shift()!);
  const encryptedText = textParts.join(":");
  const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const Util = {
  encrypt,
  decrypt,
};
