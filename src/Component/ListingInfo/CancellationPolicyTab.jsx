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
        "Cancelling within 48 hours of booking is free, and guest will have a full refund of their total booking amount. Cancellation after 48 hours, guest will be refunded 70% of their total booking amount.";
      break;

    case "Moderate Cancellation Policy":
      policyText =
        "Cancellation after booking, guest will be refunded 70% of their total booking amount.";
      break;

    case "Strict Cancellation Policy":
      policyText =
        "Cancellation after booking, guest will be refunded 50% of their total booking amount.";
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
