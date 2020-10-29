const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membersSchema = new Schema(
    {
        name: String,
        email : String,
        isWriter : Boolean,
        favetags : [String],
        password : String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const membersModel = mongoose.model('Members', membersSchema);

module.exports = membersModel