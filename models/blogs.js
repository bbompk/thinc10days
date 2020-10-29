const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema(
    {
        title : String,
        body : String,
        author : String,
        tags : [String],
        ispublished : Boolean,
        views : Number
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const blogsModel = mongoose.model('Blogs', blogsSchema);

module.exports = blogsModel