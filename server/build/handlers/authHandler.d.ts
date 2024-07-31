import { Request, Response } from "express";
export declare const checkAuthHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refreshHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
