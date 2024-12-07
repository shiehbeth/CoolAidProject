const express = require('express');
const router = express.Router();
const donationsModel = require('./db/donations.model');

router.get('/', async function(req, res){
    const donationsList = await donationsModel.getAllDonations();
    res.send(donationsList);
})

router.get('/search', async function (req, res) {
    const { itemName } = req.query;
    try {
        const searchResults = await donationsModel.findDonationByItem(itemName);
        if (searchResults.length === 0) {
            return res.status(404).send("No matching donations found.");
        }
        res.json(searchResults);
    } catch (error) {
        console.error("Error searching donations:", error);
        res.status(500).send("Error searching donations.");
    }
});

router.post('/', async function(req, res) {
    try {
        const {lat, lng, item, amount} = req.body;
        if (!lat || ! lng || !item) {
            res.status(400);
            return res.send("Missing fields in donation");
        }
        const newDonation = {
            lat: lat,
            lng: lng,
            item: item,
            amount: amount || 1
        };
        const donationDBResponse = await donationsModel.addDonation(newDonation);
        res.status(201).send(donationDBResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send("error saving donation");
    }
});

router.put('/update', async function (req, res) {
    const { lat, lng, amount } = req.body;

    if (!lat || !lng || amount === undefined) {
        return res.status(400).send("Missing required fields: lat, lng, and amount");
    }

    try {
        const donation = await donationsModel.DonationsModel.findOne({ lat, lng });

        if (!donation) {
            return res.status(404).send("Donation not found with the provided lat and lng.");
        }

        if (donation.amount <= 0) {
            return res.status(400).send("Donation amount is 0 or less and cannot be updated.");
        }

        const newAmount = donation.amount - amount;

        if (newAmount < 0) {
            return res.status(400).send("Not enough amount available to subtract.");
        }

        donation.amount = newAmount;
        await donation.save();

        return res.status(200).json(donation);
    } catch (error) {
        console.error("Error updating donation:", error);
        return res.status(500).send("Error updating donation.");
    }
});

module.exports = router;
