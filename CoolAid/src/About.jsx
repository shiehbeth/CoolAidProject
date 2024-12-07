import NavBar from "./NavBar"
import './About.css'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default function About() {

    return (
        <div>
            <NavBar />
            <div className="page-content">
                <div>
                    <h3>Helping communities stay cool during heatwaves.</h3>
                    <p>Whether you're seeking aid or offering it, navigating CoolAid is easy and intuitive. Together, we can build a stronger, more resilient community.</p>
                </div>
                <Card className="about-card">
                    <Card.Header className="card-header">Mission</Card.Header>
                    <Card.Body>
                    {/* <Card.Title>Climate Change</Card.Title> */}
                    <Card.Text>
                    The 2021 Heat Dome Event in Seattle and the Pacific Northwest saw temperatures soar to unprecedented levels, with Seattle reaching 108°F, surpassing previous records by 30°F. This extreme heat, caused by a high-pressure system blocking cooling maritime winds, severely affected vulnerable groups—low-income households, the elderly, BIPOC communities, and non-English speakers—who often lacked access to air conditioning or cooling centers. During the event, emergency room visits due to heat-related illness spiked 69 times over previous years, leading to overwhelmed medical services and contributing to 30 reported heat-related deaths in King County. The event illuminated the region's need for accessible heat relief resources, as the city’s 36 cooling centers were inadequate for many residents’ needs.
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="about-card">
                    <Card.Header className="card-header">Purpose</Card.Header>
                    <Card.Body>
                    {/* <Card.Title>Climate Justice</Card.Title> */}
                    <Card.Text>
                    To address these challenges, CoolAid offers a dual approach: it allows individuals to donate essential resources like water, fans, and cooling packs and mark donation locations on a map, including open spaces with AC, specifying capacity limits. Simultaneously, individuals seeking relief can use the app to locate these resources and cooling spots, matching them with nearby available aid. Inspired by shared mobility apps, CoolAid connects those in need with nearby resources in real-time, fostering a collaborative community response to heat crises. This interdisciplinary solution leverages technology, community support, and public health to build climate resilience and promote climate justice, ensuring Seattle is better prepared for extreme heat events.                    </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="about-card">
                    <Card.Header className="card-header">Participate</Card.Header>
                    <Card.Body>
                    <Card.Title className="card-title">Find Aid</Card.Title>
                    <Card.Text>Need relief from the heat? Head to the Find Aid page to locate nearby resources, such as cooling centers, water stations, or air-conditioned spaces. Use the map and filters to quickly find what you need.</Card.Text>
                    <Card.Title className="card-title">Offer Aid</Card.Title>
                    <Card.Text>Want to help others? Visit the Offer Aid page to list resources or locations you’re providing, such as fans, water, or access to shaded areas. Your contributions make a big difference!</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )

}
