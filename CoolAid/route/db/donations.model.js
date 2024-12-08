const mongoose = require("mongoose")
const { DonationsSchema } = require("./donations.schema")

const DonationsModel = mongoose.model("Donations", DonationsSchema);

function addDonation(donation) {
    return DonationsModel.create(donation);
}

function getAllDonations() {
    return DonationsModel.find().exec();
}

function findDonationByItem(itemName) {
    return DonationsModel.find({
        item: { $regex: itemName, $options: 'i' }
    }).exec();
}

function updateDonation(lat, lng, amount) {
    return DonationsModel.findOneAndUpdate(
        { lat: lat, lng: lng },
        { amount: amount },
        { new: true }
    ).exec();
}

function deleteDonation(lat, lng) {
    return DonationsModel.findOneAndDelete({ lat: lat, lng: lng }).exec();
}


module.exports = {
    addDonation,
    getAllDonations,
    findDonationByItem,
    updateDonation,
    deleteDonation,
    DonationsModel,
}
