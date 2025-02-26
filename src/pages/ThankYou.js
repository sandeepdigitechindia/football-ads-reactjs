import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h2 className="text-2xl font-semibold text-green-600">Payment Successful!</h2>
                <p className="mt-2 text-gray-600">Thank you for your payment.</p>
                <Link to="/" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ThankYou;
