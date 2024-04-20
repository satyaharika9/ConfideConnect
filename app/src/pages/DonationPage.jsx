import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import Donation from "../components/donation/donation";
import donationService from "../services/donationService";

function StripeContainerPage() {
    return (
        <Elements stripe={stripeTestPromise}>
            <Donation />
        </Elements>
    );
}

export default StripeContainerPage;
