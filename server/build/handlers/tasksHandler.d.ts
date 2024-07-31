import { Request, Response } from "express";
interface CustomRequest extends Request {
    user?: any;
}
export declare const getTasksHandler: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addTaskHandler: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editTaskHandler: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTaskHandler: (req: CustomRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
