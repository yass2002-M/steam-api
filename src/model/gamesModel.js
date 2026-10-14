const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema(
    {
        _id: { type: Number, required: true },
        title: { type: String, required: true, trim: true },
        required_age: { type: Number, default: 0 },
        is_free: { type: Boolean, default: false },
        description: String,
        image: String,
        website: String,
        developers: [String],
        publishers: [String],
        platforms: [String],
        metacritic_score: Number,
        categories: [{ _id: false, id: Number, description: String }],
        genres: [{ _id: false, id: Number, description: String }],
        recommendations: Number,
        release_date: String,
        release_year: Number,
    },
    { collection: 'filRougeCollection', versionKey: false }
);

module.exports = mongoose.model('Game', gameSchema);