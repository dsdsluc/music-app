import mongoose from 'mongoose';

const FavoriteSongSchema = new mongoose.Schema({
    userId: String,
    songId: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt : Date
  },{ timestamps: true });
const FavoriteSong = mongoose.model('FavoriteSong', FavoriteSongSchema,"favorite-songs");

export default FavoriteSong;