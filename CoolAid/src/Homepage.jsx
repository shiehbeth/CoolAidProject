import './Homepage.css';
import NavBar from "./NavBar"

export default function Homepage() {

    return (
        <div>
            <NavBar />
            <div className="page-content">

                <h3 className="big-text">Connecting people to donate and access essential heat relief resources locally</h3>

                <div className="image-div">
                    <div className="image-row">
                        <img src="../food-resource.png"
                            width="200"
                            height="200"
                            className="d-inline-block align-top align-center"
                            alt="food resource"
                            id="food-resource"/>
                        <img src="../water-resource.png"
                            width="200"
                            height="200"
                            className="d-inline-block align-top align-center"
                            alt="water resource"
                            id="water-resource"/>
                    </div>
                    <div className="image-row">
                        <img src="../fan-resource.png"
                            width="200"
                            height="200"
                            className="d-inline-block align-top align-center"
                            alt="fan resource"
                            id="fan-resource"/>
                        <img src="../shelter-resource.png"
                            width="200"
                            height="200"
                            className="d-inline-block align-top align-center"
                            alt="shelter resource"
                            id="shelter-resource"/>
                    </div>

                </div>
            </div>
        </div>
    );

}
