import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import donationService from '../../services/donationService';
import '../../App.css';

function Donation() {
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (!error) {
            try {
                const response = await donationService.makeDonation({
                    name,
                    email,
                    country,
                    amount: parseInt(amount) * 100,
                    paymentMethodId: paymentMethod.id,
                }).then(() => {
                    setSuccess(true);
                });
            } catch (error) {
                alert('Error making donation: ' + error.message);
            }
        } else {
            alert(error.message);
        }
    };

    return (
        <div className="donation-container">
            {!success ? (
                <>
                    <h1 className="donation-heading">Donate to Our Cause</h1>
                    <form onSubmit={handleSubmit} className="donation-form">
                        <div className="donation-input">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                
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
                                
                            />
                        </div>
                        <div className="donation-input">
                            <label>Country or Region:</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)} >
                                <option value="">Select Country</option>
                                <option value="United States">United States</option>
                                <option value="India">India</option>
                                <option value="Australia">Australia</option>
                                <option value="Dubai">Dubai</option>
                            </select>
                        </div>
                        <fieldset className="FormGroup">
                            <CardElement className="FormRow" required />
                        </fieldset>
                        <button type="submit" className="donate-button">Donate</button>
                    </form>
                </>
            ) : (
                <div className="thank-you-message">
                    <h2>Thank you for your Donation, {name}! Your donation has been received.</h2>
                </div>
            )}
        </div>
    );
}

export default Donation;