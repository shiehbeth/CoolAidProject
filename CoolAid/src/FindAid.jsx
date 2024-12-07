import NavBar from "./NavBar";
import { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './FindAid.css';

export default function FindAid() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [donationItem, setDonationItem] = useState("");
    const [amount, setAmount] = useState(1);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const apiKey = import.meta.env.VITE_GMAPS_API_KEY;

    useEffect(() => {
        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
        });

        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 47.6062, lng: -122.3321 },
                zoom: 10,
            });
            mapRef.current = map;

            fetchDonations(map);

            // select location on map
            map.addListener("click", (event) => {
                const clickedLat = event.latLng.lat();
                const clickedLng = event.latLng.lng();
                setSelectedLocation({ lat: clickedLat, lng: clickedLng });
                console.log("SELECTED LOCATION: ", { lat: clickedLat, lng: clickedLng });
            });
        });
    }, [donationItem]);

    // get donations and update map
    const fetchDonations = (map) => {
        fetch(`/api/donations/search?itemName=${donationItem}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch donations");
                }
                return response.json();
            })
            .then((donations) => {
                markersRef.current.forEach(marker => marker.setMap(null));
                markersRef.current = [];

                donations.forEach((donation) => {
                    const marker = new google.maps.Marker({
                        position: { lat: donation.lat, lng: donation.lng },
                        map: map,
                        title: donation.item,
                    });

                    const infoWindow = new google.maps.InfoWindow({
                        content: `<h3>${donation.item}</h3><p>Amount: ${donation.amount}</p>`,
                    });

                    marker.addListener("click", () => {
                        setSelectedLocation({
                            lat: donation.lat,
                            lng: donation.lng,
                        });
                        infoWindow.open(map, marker);
                    });

                    markersRef.current.push(marker);
                });
            })
            .catch((error) => console.error("Error fetching donations: ", error));
    };

    // search input
    const handleSearchChange = (e) => {
        setDonationItem(e.target.value);
    };

    // submit form action
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedLocation) {
            alert("Please select a location on the map.");
            return;
        }

        const donationData = {
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            amount: amount
        };

        console.log("I WANT THIS DONATION", donationData);

        try {
            const response = await fetch('/api/donations/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Donation updated successfully!');
                console.log('Donation response:', data);
                fetchDonations(mapRef.current, donationItem);
            } else {
                const errorData = await response.json();
                console.log("Error response:", errorData);
                alert(`Error: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting donation update:", error);
            alert("Error submitting donation update.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="page-content">
                <h1>Find Aid</h1>
                <p>Enter item name keyword to search for specific donation items.</p>
                <Form.Group className="mb-3" controlId="donationItemSearch">
                    <Form.Label>Search Donation Item</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Item name"
                        value={donationItem}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
                <p>Use the map below to select a specific item to collect.</p>
                <div id="map" style={{ height: "500px", width: "50%" }}></div>
                <div className="form-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="amountInput">
                            <Form.Label>Amount/Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Collect Item
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
