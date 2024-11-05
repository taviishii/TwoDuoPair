import React, { useState } from "react";
import './AddressForm.css';

function AddressForm() {
    const [yourAddress, setYourAddress] = useState('');
    const [theirAddress, setTheirAddress] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!yourAddress || !theirAddress) {
            setError("Both addresses are required.");
            return;
        }

        setError('');
        console.log("Your address:", yourAddress);
        console.log("Their address:", theirAddress);

        // Add geocoding and midpoint calculation logic here
    };

    return (
        <div className="background">
            <header className="header">
                <nav>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="#help">Help</a>
                </nav>
            </header>
            <div className="container">
                <h1 className="welcome-text">Welcome to Two Duo Pair!</h1>
                <div className="box">
                    <h3>Find Your Meeting Spot</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="yourAddress">Your Address:</label>
                            <input
                                id="yourAddress"
                                type="text"
                                value={yourAddress}
                                onChange={(e) => setYourAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="theirAddress">Their Address:</label>
                            <input
                                id="theirAddress"
                                type="text"
                                value={theirAddress}
                                onChange={(e) => setTheirAddress(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-text">{error}</p>}
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <footer className="footer">
                    <p>
                        &copy; {new Date().getFullYear()} Two Duo Pair | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default AddressForm;
