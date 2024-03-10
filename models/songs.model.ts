import mongoose from 'mongoose';
import slug  from "mongoose-slug-updater";
mongoose.plugin(slug)

const SongSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: Number,
    view: {
      type: Number,
      default: 0
    },
    lyrics: String,
    audio: String,
    status: {
      type: String,
      default: "active"
    },
    slug: { type: String, slug: "title", unique: true },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt : Date
  },{ timestamps: true });
const Song = mongoose.model('Song', SongSchema,"songs");

export default Song;