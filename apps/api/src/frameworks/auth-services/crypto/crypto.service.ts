import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class CryptoService {
  constructor() {}

  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  public async comparePassword(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, encrypted);
  }
}
