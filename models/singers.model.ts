import mongoose from 'mongoose';

const SingerSchema = new mongoose.Schema({
    fullName: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt : Date
  },{ timestamps: true });
const Singer = mongoose.model('Singer', SingerSchema,"singers");

export default Singer;