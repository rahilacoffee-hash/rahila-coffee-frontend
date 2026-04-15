import React, { useState } from "react";

const OtpBox = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;

    // Allow only numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Send OTP to parent
    onChange(newOtp.join(""));

    // Move to next input
    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (element, index, e) => {
    // Move back on backspace
    if (e.key === "Backspace" && !element.value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className=" otpBox flex gap-2 justify-center">
      {otp.map((data, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e.target, index, e)}
          className="w-[45px] h-[45px] text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-none"
        />
      ))}
    </div>
  );
};

export default OtpBox;