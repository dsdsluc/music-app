import { upLoadToClouldinary } from "../../helpers/uploadToClouldinary";
import { Request, Response, NextFunction } from "express";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const link = await upLoadToClouldinary(req["file"].buffer);
        req.body[req["file"].fieldname] = link;
    } catch (error) {
        console.log(error)
    }
    
    next();
}


export const uploadFields = async (req: Request, res: Response, next: NextFunction)=>{

    for (const key in req["files"]) {
        req.body[key] = []

        const array = req["files"][key];
        for (const item of array) {
            try {
                const link = await upLoadToClouldinary(item.buffer);
                req.body[key].push(link);
            } catch (error) {
                console.log(error)
            }
        }
    }

    
    next();
};