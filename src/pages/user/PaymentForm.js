import React, { useEffect, useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
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
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [subscriptionData, setSubscriptionData] = useState(null);
  const { user,updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.role !== "player") {
        navigate("/subscriptions");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const response = await API.get(`/api/user/subscriptions/${id}`);
        setSubscriptionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscriptions data:", error);
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });

      setLoading(false);
      return;
    }

    try {
      const formDataToSend = {
        amount: subscriptionData.price,
        currency: "eur",
      };
      const response = await API.post(
        `${BASE_URL}/api/create-stripe-payment-intent`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data.clientSecret) {
        toast.error("Error: Missing client secret.", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        toast.error(confirmError.message || "Submit failed. Try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        try {
          const formDataToSend = {
            userId: user._id,
            subscriptionId: subscriptionData._id,
            price: subscriptionData.price,
            duration: subscriptionData.duration,
            paymentMethod: paymentMethod.type,
            paymentStatus: paymentIntent.status,
            transactionId: paymentIntent.id,
          };

          await API.post(
            `${BASE_URL}/api/user/subscriptions/purchase`,
            formDataToSend,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Payment Detail Submitted Successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Submit failed. Try again.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        } finally {
          setLoading(false);
        }
        await updateUser();
        toast.success("Payment successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        elements.getElement(CardElement).clear();

        setTimeout(() => {
          
          const redirectUrl =
            localStorage.getItem("redirectAfterPurchase") || "/";
          localStorage.removeItem("redirectAfterPurchase");
          navigate(redirectUrl);
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Submit failed. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Secure Payment
        </h2>
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
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
