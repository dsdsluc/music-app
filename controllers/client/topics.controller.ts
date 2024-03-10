import { Request, Response } from "express";
import Topic from "../../models/topics.model";

export const index = async (req: Request, res: Response): Promise<void> => {
    const find = {
        deleted: false,
        status: "active"
    }

    const topics = await Topic.find(find)
    
    res.render("client/pages/topics/index",{
        pageTitle: "Chủ đề bài hát",
        topics: topics
    });
}