import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singers.model";
import Topic from "../../models/topics.model";
import { systemConfig } from "../../config/config";


export const index =async (req: Request, res: Response): Promise<void> =>{
    const songs = await Song.find({
        deleted: false
    })


    res.render("admin/pages/songs/index",{
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
}

export const create =async (req: Request, res: Response): Promise<void> =>{
    const singers = await Singer.find({
        deleted: false
    })
    const topics = await Topic.find({
        deleted: false
    })

    res.render("admin/pages/songs/create",{
        pageTitle: "Tạo mới bài hát",
        singers: singers,
        topics: topics
    });
}
export const createPost =async (req: Request, res: Response): Promise<void> =>{
    let avatar = "";
    let audio = "";

    if(req.body.avatar){
        avatar = req.body.avatar[0]
    }

    if(req.body.audio){
        audio = req.body.audio[0]
    }

    const objectSong ={
        title: req.body.title,
        avatar: avatar,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.TopicId,
        lyrics: "",
        audio: audio,
    }

    const newSong = new Song(objectSong);
    await newSong.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs/`)
}

export const edit =async (req: Request, res: Response): Promise<void> =>{
    const idSong = req.params.id;
    const song = await Song.findOne({
        _id: idSong
    })

    const singers = await Singer.find({
        deleted: false
    })
    const topics = await Topic.find({
        deleted: false
    })


    res.render("admin/pages/songs/edit",{
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        singers: singers,
        topics: topics
    });  
}

export const editPost =async (req: Request, res: Response): Promise<void> =>{
    const objectSong ={
        title: req.body.title,
        description: req.body.description,
        singerId: req.body.singerId,
        topicId: req.body.TopicId,
        lyrics: req.body.lyrics
    }

    if(req.body.avatar){
        objectSong["avatar"] = req.body.avatar[0]
    }

    if(req.body.audio){
        objectSong["audio"]  = req.body.audio[0]
    }


    await Song.updateOne({
        _id: req.params.id
    },objectSong)

    res.redirect(`back`)
}