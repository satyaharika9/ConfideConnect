import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import donationService from '../../services/donationService';
import '../../App.css'

function Donation() {
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await donationService.makeDonation(name, parseInt(amount) * 100, id);
                if (response.success) {
                    console.log('Successful payment');
                    setSuccess(true);
                }
            } catch (error) {
                console.error('Error making donation:', error);
            }
        } else {
            console.error(error.message);
        }
    };

    return (
        <div className="donation-container"> {/* This div wraps your form in a box */}
            {!success ? (
                <form onSubmit={handleSubmit} className="donation-form">
                    <div className="donation-input">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="donation-input">
                        <label>Donation Amount ($):</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter donation amount"
                            required
                        />
                    </div>
                    <div className="donation-input">
                        <label>Full Name on Card:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="donation-input">
                        <label>Country or Region:</label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                            <option value="">Select Country</option>
                            <option value="United States">United States</option>
                            <option value="India">India</option>
                            <option value="Australia">Australia</option>
                            <option value="Dubai">Dubai</option>
                        </select>
                    </div>
                    <fieldset className="FormGroup">
                        <CardElement className="FormRow" />
                    </fieldset>
                    <button type="submit" className="donate-button">Pay</button>
                </form>
            ) : (
                <div className="thank-you-message">
                    <h2>Thank you for your Donation, {name}! Your donation has been received.</h2>
                </div>
            )}
        </div>
    );
    
}

export default Donation;
