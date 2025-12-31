import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class PickupController {
    static schedulePickup(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getPickupsByContribution(req: Request, res: Response): Promise<void>;
    static getNgoPickups(req: AuthRequest, res: Response): Promise<void>;
    static updatePickupStatus(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getPickupById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=pickup.controller.d.ts.map