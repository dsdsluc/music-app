import { Request, Response } from "express";
import Topic from "../../models/topics.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singers.model";
import FavoriteSong from "../../models/favorite-song.model";

export const list = async (req: Request, res: Response): Promise<void> => {
    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    })

    const songs = await Song.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("title avatart like slug singerId id")
    
    for (const song of songs) {
        const inforSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["inforSinger"] = inforSinger
    }
    res.render("client/pages/songs/list",{
        pageTitle: topic.title,
        songs: songs
    });
}

export const detail = async (req: Request, res: Response): Promise<void> => {
    const slug:string = req.params.slugSong;

    const song = await Song.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })

    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName avatar")

    const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title")

    const favoriteSong = await FavoriteSong.findOne({
        songId: song.id
    })

    song["isFavorite"] = favoriteSong ? true: false

    res.render("client/pages/songs/detail",{
        pageTitle: song.title,
        song: song,
        singer: singer,
        topic: topic
        
    });
}

export const like = async (req: Request, res: Response): Promise<void> => {
    const idSong:string = req.params.idSong;
    const typeLike:string = req.params.typeLike;

    const song = await Song.findOne({
        _id: idSong
    })
    
    const newLike:number = typeLike == "like" ? (song.like + 1):(song.like - 1)

    await Song.updateOne({
        _id: idSong
    },{
        like: newLike
    })


    res.json({
        code: 200,
        message: "Thành công",
        like: newLike
    })
}

export const favorite = async (req: Request, res: Response): Promise<void> => {
    const idSong:string = req.params.idSong;
    const typeFavorite:string = req.params.typeFavorite;

    switch (typeFavorite) {
        case "favorite":
            const newRecord = new FavoriteSong({
                songId:idSong
            })
            await newRecord.save()
            break;
        case "unfavorite":
            await FavoriteSong.deleteOne({
                songId: idSong
            })
            break;
        default:
            break;
    }
    

    res.json({
        code: 200,
        message: "Thành công",
    })
}

export const listen = async (req: Request, res: Response): Promise<void> => {
    const idSong = req.params.idSong;
    
    const song = await Song.findOne({
        _id: idSong
    });
    const viewSong = song.view + 1;

    await Song.updateOne({
        _id: idSong
    },{
        view: viewSong
    })

    res.json({
        code: 200,
        message: "Thành công",
        viewSong: viewSong
    })
}