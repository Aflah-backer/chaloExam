import mongoose from "mongoose";
const Schema = mongoose.Schema;

const docSchema = new Schema({
    filename: String,
    content: String
})

export default mongoose.model('docSchema', docSchema)