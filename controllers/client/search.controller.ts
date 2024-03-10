import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singers.model";
import { convertStringToSlug } from "../../helpers/convertStringToSlug";

export const result = async (req: Request, res: Response): Promise<void> => {
    const type: string = req.params.type;
    const keyWord:string = `${req.query.keyword}`;
    if(keyWord){
        const slugUnidecode = convertStringToSlug(keyWord);

        const keyWordRegex = new RegExp(keyWord,"i");
        const slugRegex = new RegExp(slugUnidecode,"i")

        const songs = await Song.find({
            $or: [
                {title: keyWordRegex},
                {slug: slugRegex}
            ]
        }).select("-lyrics");
    

        let newSongs = [];

        for (const item of songs) {
            const singer = await Singer.findOne({
                _id: item.singerId
            });

            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                inforSinger: {
                    fullName : singer.fullName,
                    avatar: singer.avatar
                }
            })
        }
        switch (type) {
            case "result":
                res.render("client/pages/search/result",{
                    pageTitle: `Kết quả: ${keyWord}`,
                    songs: newSongs
                });
                break;
        
            case "suggest":
                res.json({
                    code:200,
                    message: "Thành công",
                    songs: newSongs
                })
                break;
            default:
                break;
        }

    } 
}