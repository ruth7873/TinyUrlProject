const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClickSchema = new Schema({
    insertedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    targetParamValue: { type: String }
});

const targetValuesSchema = new Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
})

const LinkSchema = new Schema({
    originalUrl: { type: String, required: true },
    clicks: [ClickSchema],
    targetParamName: { type: String },
    targetValues: [targetValuesSchema]
});

module.exports = mongoose.model('Link', LinkSchema);
