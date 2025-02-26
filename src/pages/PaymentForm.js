import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const cardStyle = {
    style: {
        base: {
            fontSize: "16px",
            color: "#424770",
            "::placeholder": { color: "#aab7c4" },
            padding: "10px",
        },
        invalid: { color: "#9e2146" },
    },
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setMessage("");

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/create-stripe-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 10, currency: "eur" }),
            });

            const data = await response.json();

            if (!data.clientSecret) {
                setMessage("Error: Missing client secret.");
                setLoading(false);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                data.clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setMessage(confirmError.message);
                setLoading(false);
            } else if (paymentIntent.status === "succeeded") {
                setMessage("Payment successful!");
                elements.getElement(CardElement).clear(); // Reset form
                setTimeout(() => navigate("/thank-you"), 2000); // Redirect after success
            }
        } catch (error) {
            console.error("Payment error:", error);
            setMessage("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">Secure Payment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-3 border rounded-md">
                        <CardElement options={cardStyle} />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:bg-gray-400"
                        disabled={!stripe || loading}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                    {message && <p className="text-center text-red-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
