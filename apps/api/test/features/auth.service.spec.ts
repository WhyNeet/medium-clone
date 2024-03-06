import { AuthTokenFactoryService } from "@/features/auth/auth-token-factory.service";
import { AuthService } from "@/features/auth/auth.service";
import { CryptoService } from "@/frameworks/auth-services/crypto/crypto.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CryptoService,
          useValue: {
            hashPassword: jest
              .fn()
              .mockImplementation((password: string) => password),
            comparePassword: jest
              .fn()
              .mockImplementation((p1, p2) => p1 === p2),
          },
        },
        {
          provide: AuthTokenFactoryService,
          useValue: {
            issueAccessToken: jest.fn().mockResolvedValue("at"),
            issueRefreshToken: jest
              .fn()
              .mockResolvedValue({ token: "rt", jti: "123123" }),
          },
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
        ConfigService,
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe("when verifyUserPassword is called", () => {
    it("should return true if password matches", async () => {
      const password = "123";

      expect(
        await authService.verifyUserPassword(password, password),
      ).toBeTruthy();
    });
  });

  describe("when issueTokenPair is called", () => {
    it("should return both tokens", async () => {
      const id = "123";

      const { accessToken, refreshToken } =
        await authService.issueTokenPair(id);

      expect(accessToken).toBe("at");
      expect(refreshToken).toBe("rt");
    });
  });
});
