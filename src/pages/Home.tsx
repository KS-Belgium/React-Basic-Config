// Import components
import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";

// Import the styles
import "../styles/pages/Style-HomePage.scss";

// Import the function from the model
import {displayAlertBoxes} from "../models/display-alert-boxes.ts";

function Home() {

    function displayAlertBox() {
        const checkedRadioButton: HTMLInputElement | null = document.querySelector('input[type="radio"]:checked');
        checkedRadioButton ? displayAlertBoxes(checkedRadioButton.value) : alert('No radio button selected');
    }

    function hideAlertBox() {
        const existingAlertBox = document.getElementById('alert-box');
        if (existingAlertBox) {
            existingAlertBox.remove();
        }
    }

    return (
        <>
            <NavBar/>

            <div className="container">
                <h1 className="title">Home</h1>
                <div className="content">
                    <div className="radio-group">
                        <div className="field">
                            <input type="radio" id="success" name="alert" value="success"/>
                            <label htmlFor="success">Success</label>
                        </div>
                        <div className="field">
                            <input type="radio" id="info" name="alert" value="info"/>
                            <label htmlFor="info">Info</label>
                        </div>
                        <div className="field">
                            <input type="radio" id="warning" name="alert" value="warning"/>
                            <label htmlFor="warning">Warning</label>
                        </div>
                        <div className="field">
                            <input type="radio" id="danger" name="alert" value="danger"/>
                            <label htmlFor="danger">Danger</label>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="button" onClick={displayAlertBox}>Show Alert</button>
                        <button className="button" onClick={hideAlertBox}>Hide Alert</button>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default Home;