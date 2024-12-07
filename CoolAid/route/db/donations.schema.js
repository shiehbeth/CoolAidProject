const Schema = require('mongoose').Schema;

exports.DonationsSchema = new Schema(
    {
        lng: Number,
        lat: Number,
        item: String,
        amount: String
    }, { collection: 'coolAid'}
);
