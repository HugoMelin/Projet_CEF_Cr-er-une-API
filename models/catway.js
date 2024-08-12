const mongoose = require('mongoose');

const catwaySchema = mongoose.Schema(
    {
        catwayNumber: {
            type: Number,
            require: true
        },

        type: {
            type: String,
            require: true,
            lowercase: true,
            trim: true,
            enum: [ ["long", "short"], "Most be long or short" ]
        }, 

        catwayState: {
            type: String
        }
    }
);

const Catway = mongoose.model('Catway', catwaySchema);
module.exports = Catway;