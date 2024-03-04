import type { Request } from "express";
import type { TokenType } from "../types/token-type.enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CookiesExtractorService {
  constructor() {}

  public extractToken(req: Request, tokenType: TokenType): string | null {
    if (!req.cookies) return null;
    return req.cookies[tokenType];
  }

  public tokenExtractor(tokenType: TokenType): (req: Request) => string | null {
    return (req: Request) => this.extractToken(req, tokenType);
  }
}
