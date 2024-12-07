import NavBar from "./NavBar";
import { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function OfferAid() {
    const [showCustomItem, setShowCustomItem] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [donationItem, setDonationItem] = useState("");
    const [amount, setAmount] = useState(1);
    const currMarkerRef = useRef(null);
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

            map.addListener("click", (event) => {
                const clickedLat = event.latLng.lat();
                const clickedLng = event.latLng.lng();

                setSelectedLocation({ lat: clickedLat, lng: clickedLng });

                if (currMarkerRef.current) {
                    currMarkerRef.current.setMap(null);
                }

                const newMarker = new google.maps.Marker({
                    position: { lat: clickedLat, lng: clickedLng },
                    map: map,
                    title: "Selected Location",
                });

                currMarkerRef.current = newMarker;
            });
        });
    }, []);

    const displayCustomItem = (e) => {
        const selectedVal = e.target.value;
        setShowCustomItem(selectedVal === 'otheroption');
        setDonationItem(selectedVal);
    };

    const fetchDonations = (map) => {
        fetch("/api/donations/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch donations");
                }
                return response.json();
            })
            .then((donations) => {

                markersRef.current.forEach(marker => marker.setMap(null));
                markersRef.current = [];

                // iterate through donations
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
                        infoWindow.open(map, marker);
                    });
                    // add to arr of markers
                    markersRef.current.push(marker);
                });
            })
            .catch((error) => console.error("Error fetching donations: ", error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedLocation) {
            alert("Select location on the map");
            return;
        }

        const newDonation = {
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            item: donationItem,
            amount: amount
        };

        try {
            const response = await fetch("/api/donations/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDonation),
            });

            if (!response.ok) {
                throw new Error("Failed to save donation.");
            }

            alert("Donation saved");

            // get the donations again
            fetchDonations(mapRef.current);
        } catch (error) {
            console.error(error);
            alert("Error occurred while saving donation");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="page-content">
                <h1>Offer Aid</h1>
                <p>Use the map below to donate resources at a specific location on the map.</p>
                <div id="map" style={{ height: "500px", width: "50%" }}></div>
                <div className='form-body'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="donationItemSelect">
                            <Form.Label>Donation Item</Form.Label>
                            <Form.Select
                                aria-label="Aid type"
                                value={donationItem}
                                onChange={displayCustomItem}
                            >
                                <option>Select Aid Type</option>
                                <option value="water">Bottled Water</option>
                                <option value="fan">Fan</option>
                                <option value="shelter">Air Conditioned Shelter</option>
                                <option value="otheroption">Other</option>
                            </Form.Select>
                            {
                                showCustomItem && (
                                    <Form.Control
                                        type="text"
                                        placeholder="Custom item"
                                        value={donationItem}
                                        onChange={(e) => setDonationItem(e.target.value)}
                                    />
                                )
                            }
                        </Form.Group>

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
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
