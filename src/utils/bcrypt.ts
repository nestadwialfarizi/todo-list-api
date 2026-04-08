import { compareSync, genSaltSync, hashSync } from "bcrypt";

const salt = genSaltSync(10);

export function encrypt(text: string) {
  return hashSync(text, salt);
}

export function compareEncrypted(text: string, encrypted: string) {
  return compareSync(text, encrypted);
}
