import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import donationService from '../../services/donationService';

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#fce883' },
            '::placeholder': { color: '#87bbfd' }
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee'
        }
    }
};

function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
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
        <>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Donation Amount ($):
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter donation amount"
                            />
                        </label>
                    </div>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button type="submit">Donate</button>
                </form>
            ) : (
                <div>
                    <h2>Thank you for your Donation, {name}! Your donation has been received.</h2>
                </div>
            )}
        </>
    );
}

export default PaymentForm;
