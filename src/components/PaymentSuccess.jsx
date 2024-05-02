// import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from "react";
import { useSearchParams } from "react-router-dom";
import icon from "../assets/i.png";

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];

  const referenceNum = seachQuery.get("reference");
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-black">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full m-8">
        <div className="flex justify-center mb-8">
          <img src={icon} alt="Company Icon" className="w-33 h-24" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Order Successful
        </h2>
        <div className="flex justify-center">
          <parseInt>Reference No.{referenceNum}</parseInt>
        </div>

        {/* <form className="w-full" onSubmit={handleVerification}>
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter OTP
            </label>
            <input
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              type="text"
              id="otp"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form> */}
      </div>
    </div>

    // <div >

    //     <h2> Order Successfull</h2>

    //     <parseInt>
    //         Reference No.{referenceNum}
    //     </parseInt>

    // </div>
  );
};

export default PaymentSuccess;
