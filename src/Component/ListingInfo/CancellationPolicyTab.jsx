import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../../Axios";

const CancellationPolicyTab = () => {
  const { id } = useParams();
  const [cancellationPolicy, setCancellationPolicy] = useState(null);

  useEffect(() => {
    const fetchCancellationPolicy = async () => {
      try {
        const response = await Axios.get(`showGuestHome/${id}`);
        setCancellationPolicy(response.data.data.cancelPolicy);
      } catch (error) {
        console.error("Error fetching cancellation policy:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchCancellationPolicy();
  }, [id]);

  if (!cancellationPolicy) {
    return <div>Loading cancellation policy...</div>;
  }

  let policyText = "";

  switch (cancellationPolicy) {
    case "Flexible Cancellation Policy":
      policyText =
        "We offer a flexible cancellation policy that allows you to cancel your reservation free of charge within 48 hours of booking, provided that the check-in date is at least 10 days away. We believe in giving our guests the freedom to plan their trips without financial stress in the early stages of booking.";
      break;

    case "Moderate Cancellation Policy":
      policyText =
        "If you need to cancel your reservation within 7 days of the check-in date, you are eligible for a refund of 50% of the total booking amount.";
      break;

    case "Strict Cancellation Policy":
      policyText =
        "Cancellations made within 5 days of the check-in date are non-refundable";
      break;

    default:
      // Handle other cases if needed
      break;
  }

  return (
    <div className="py-1 mb-1 max-w-lg">
      <div className="px-2 space-y-3">
        <p className="cancellation-type font-medium text-lg">
          {cancellationPolicy}
        </p>
        <div className="font-medium">{policyText}</div>
        <div className="underline">
          <Link
            to={"/CancellationPolicy"}
            className="hover:font-medium text-xs transition-all font-normal hover:text-black"
          >
            Learn more about cancellation policies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyTab;
