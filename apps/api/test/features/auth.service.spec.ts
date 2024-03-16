import { IAuthScopesResolverService } from "@/core/abstracts/auth-scopes-resolver.abstract";
import { AuthService } from "@/features/auth/auth.service";
import { TokenRepositoryService } from "@/features/data-services/token/token-repository.service";
import { TokenEncryptionService } from "@/features/token/token-encryption.service";
import { TokenFactoryService } from "@/features/token/token-factory.service";
import { CryptoService } from "@/frameworks/auth-services/crypto/crypto.service";
import { createMock } from "@golevelup/ts-jest";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

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
					provide: TokenEncryptionService,
					useValue: {
						issueAccessToken: jest.fn().mockResolvedValue("at"),
						issueRefreshToken: jest.fn().mockResolvedValue("rt"),
					},
				},
				{
					provide: TokenFactoryService,
					useValue: {
						createNewRefreshToken: jest.fn(),
					},
				},
				{
					provide: TokenRepositoryService,
					useValue: {
						createToken: jest.fn().mockResolvedValue({ id: "rt" }),
					},
				},
				{
					provide: JwtService,
					useValue: createMock<JwtService>(),
				},
				{
					provide: IAuthScopesResolverService,
					useValue: {
						getAvailableScopes: jest.fn(),
					},
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
