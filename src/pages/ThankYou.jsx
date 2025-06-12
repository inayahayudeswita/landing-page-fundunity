import React from "react";
import { useLocation } from "react-router-dom";

export default function ThankYou() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const transactionStatus = query.get("transaction_status");
  const orderId = query.get("order_id");
  const statusCode = query.get("status_code");

  const renderMessage = () => {
    if (transactionStatus === "settlement") {
      return "🎉 Thank you! Your donation was successful.";
    } else if (transactionStatus === "pending") {
      return "⏳ Your donation is still pending. Please complete the payment.";
    } else if (transactionStatus === "deny" || transactionStatus === "cancel") {
      return "❌ Your transaction was denied or canceled.";
    } else {
      return "ℹ️ Transaction status unknown.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Donation Status</h1>
      <p className="text-lg mb-2">{renderMessage()}</p>
      <p className="text-sm text-gray-600">
        Order ID: <strong>{orderId}</strong> <br />
        Status Code: {statusCode}
      </p>
    </div>
  );
}
