import { Injectable } from "@nestjs/common";
import { CryptoService } from "@/frameworks/auth-services/crypto/crypto.service";
import { AuthTokenFactoryService } from "./auth-token-factory.service";

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private authTokenFactoryService: AuthTokenFactoryService,
  ) {}

  /**
   *
   * @param {string} password The input password.
   * @param {string} encrypted The user's hashed password from a database.
   * @returns {Promise<boolean>} The password matches encrypted.
   */
  public async verifyUserPassword(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return await this.cryptoService.comparePassword(password, encrypted);
  }

  /**
   *
   * @param id The user's id.
   * @returns Access and refresh tokens.
   */
  public async issueTokenPair(
    id: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { token: refreshToken, jti } =
      await this.authTokenFactoryService.issueRefreshToken(id.toString());
    const accessToken = await this.authTokenFactoryService.issueAccessToken(
      id,
      jti,
    );

    return { accessToken, refreshToken };
  }
}
