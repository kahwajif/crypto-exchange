const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema and Model

const BtcHistoricalSchema = new Schema({
    _id: Schema.Types.ObjectId,
    time: Number, //convert from UNIX time to real time
    price: Number //price at closing
});

const BtcHistorical = mongoose.model('btcHistorical', BtcHistoricalSchema);

module.exports = BtcHistorical;

