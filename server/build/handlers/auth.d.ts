import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
    user?: any;
}
export declare const authenticate: (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
