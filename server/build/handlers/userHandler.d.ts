import { Request, Response } from "express";
export declare const signupHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
