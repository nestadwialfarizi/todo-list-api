import { sign } from "jsonwebtoken";

export function generateToken(userId: string) {
  return sign({ userId }, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}
