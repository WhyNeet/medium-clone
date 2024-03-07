import { Test } from "@nestjs/testing";
import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/features/auth/auth.service";
import { UserRepositoryService } from "@/features/user/user-repository.service";
import { UserFactoryService } from "@/features/user/user-factory.service";
import { User } from "@/core/entities/user.entity";
import { CreateUserDto, UserCredentialsDto } from "@/core/dtos/user.dto";
import { Response } from "express";
import { CryptoService } from "@/frameworks/auth-services/crypto/crypto.service";
import { AuthTokenFactoryService } from "@/features/auth/auth-token-factory.service";
import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { CommonHttpException } from "@/frameworks/exception-handing/common/common-http.exception";

const exampleUser = new User();

exampleUser.email = "12123@gmail.com";
exampleUser.name = "qwewee";
exampleUser.password = "123223123";
exampleUser.username = "weiyeehee";

describe("AuthController", () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            issueTokenPair: jest
              .fn()
              .mockResolvedValue({ accessToken: "at", refreshToken: "rt" }),
            verifyUserPassword: jest
              .fn()
              .mockImplementation((password) => password === "password123"),
          },
        },
        {
          provide: UserFactoryService,
          useValue: {
            createFromDto: jest.fn().mockReturnValue(exampleUser),
            createDto: jest.fn().mockReturnValue(exampleUser),
          },
        },
        {
          provide: UserRepositoryService,
          useValue: {
            getById: jest.fn().mockResolvedValue(exampleUser),
            createUser: jest.fn().mockResolvedValue(exampleUser),
            getUserByEmail: jest.fn().mockResolvedValue(exampleUser),
          },
        },
        {
          provide: CryptoService,
          useValue: {
            hashPassword: jest
              .fn()
              .mockImplementation((password: string) => password + "HASHED"),
          },
        },
        {
          provide: AuthTokenFactoryService,
          useValue: {},
        },
        {
          provide: IDataServices,
          useValue: {},
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe("when register is called", () => {
    it("should register a user with valid credentials", async () => {
      const createUserDto = new CreateUserDto();

      createUserDto.email = "123123@gmail.com";
      createUserDto.name = "name";
      createUserDto.password = "password";
      createUserDto.username = "username";

      const response: Record<string, unknown> = {
        cookie: jest.fn(),
      };

      const user = await authController.register(
        createUserDto,
        response as unknown as Response,
      );
      expect(user.user).toBe(exampleUser);
    });
  });

  describe("when login is called", () => {
    it("should login a user with valid credentials", async () => {
      const createUserDto = new UserCredentialsDto();

      createUserDto.email = "123123@gmail.com";
      createUserDto.password = "password123";

      const response: Record<string, unknown> = {
        cookie: jest.fn(),
      };

      const user = await authController.login(
        createUserDto,
        response as unknown as Response,
      );
      expect(user.user).toBe(exampleUser);
    });

    it("should not login a user with invalid credentials", async () => {
      const createUserDto = new UserCredentialsDto();

      createUserDto.email = "123123@gmail.com";
      createUserDto.password = "password1";

      const response: Record<string, unknown> = {
        cookie: jest.fn(),
      };

      expect(
        authController.login(createUserDto, response as unknown as Response),
      ).rejects.toThrow(CommonHttpException);
    });
  });
});
