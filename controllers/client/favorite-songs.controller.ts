import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singers.model";
import FavoriteSong from "../../models/favorite-song.model";

export const index = async (req: Request, res: Response): Promise<void> => {
    const favoriteSongs = await FavoriteSong.find({
        deleted: false
    })

    for (const item of favoriteSongs) {
        const song = await Song.findOne({
            _id: item.songId
        });
        item["inforSong"] = song;

        const singer = await Singer.findOne({
            _id: song.singerId
        })
        item["inforSinger"] = singer;
    }

    res.render("client/pages/favorite/index",{
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favoriteSongs.reverse()
    });
}
