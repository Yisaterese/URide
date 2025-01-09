import React from 'react';
import {RideDetailsModalProps} from "../../types/types";

const RideDetailsModal: React.FC<RideDetailsModalProps> = ({ closeModal ,baseFare,
                                                               minimumFare,
                                                               perMinuteFare,
                                                               perKilometerFare,
                                                               EstimatedSurCharges}) => {
    return (
        <div className="modal-overlay  fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" style={{ zIndex: 1999 }}>
            <div className="modal-container bg-white p-6 rounded-md w-96 relative px-8">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold text-black mb-4">
                    product confirmation price
                </h2>
                <p className="text-sm text-gray-700 mb-6">
                    Your fare will be the price presented before the trip or based on the rates below and other applicable surcharges and adjustments.
                </p>

                <div className="text-sm text-gray-900">
                    <div className="flex justify-between py-1 border-b">
                        <span>Base Fare</span>
                        <span>{baseFare}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span>Minimum Fare</span>
                        <span>{minimumFare}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span>+ Per Minute</span>
                        <span>{perMinuteFare}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span>+ Per Kilometer</span>
                        <span>{perKilometerFare}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl py-1">
                        <span>Estimated Surcharges</span>
                        <span>{EstimatedSurCharges}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                    Additional wait time charges may apply to your trip if the driver has waited 5 minute(s): up to NGN 36.10 per minute, depending on how busy it is.
                </p>

                <button
                    onClick={closeModal}
                    className="bg-black text-white px-4 py-2 rounded-md w-full mt-6 hover:bg-gray-800"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default RideDetailsModal;
