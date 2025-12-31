import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class UserController {
    static register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getProfile(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateProfile(req: AuthRequest, res: Response): Promise<void>;
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static getUsersByRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=user.controller.d.ts.map