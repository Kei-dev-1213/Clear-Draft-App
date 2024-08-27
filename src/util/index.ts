import CryptoJS from "crypto-js";
import { ArticleFormType } from "../domain/Article";

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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// 必須チェック
const validateRequireInputs = (formData: ArticleFormType) => {
  if (!formData.title.trim() || !formData.tag.trim() || !formData.main_text.trim()) {
    return true;
  }
};

// タグの数チェック
const validateTagsNum = (tag: string) => {
  if (tag.split(" ").length > 5) {
    return true;
  }
};

export const Util = {
  encrypt,
  decrypt,
  formatDate,
  validateRequireInputs,
  validateTagsNum,
};
