import { Request, Response } from "express";
export declare class AuthController {
    loginPage(query: any): {
        error: any;
        username: any;
    };
    login(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
}
