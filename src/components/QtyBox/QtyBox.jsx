import Button from "@mui/material/Button";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";

const QtyBox = () => {
  const [qtyVal, setqtyVal] = useState(1);

  const plusQty = () => {
    setqtyVal(qtyVal + 1);
  };

  const minusQty = () => {
    if (qtyVal===1) {
        setqtyVal(1)
    } else {
       setqtyVal(qtyVal - 1); 
    }
    
  };

  return (
    <div className="qtyBox flex items-center relative">
      <input
        type="number"
        className="w-full h-[40px] p-2 pl-5 text-[15px] focus:outline-none border-1 border-amber-800 rounded-md "
        Value={qtyVal}
      />

      <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50">
        <Button
          className="!min-w-[30px] !w-[30px] !h-[20px] !text-black !rounded-none "
          onClick={plusQty}
        >
          <FaAngleUp />
        </Button>
        <Button
          className="!min-w-[30px] !w-[30px] !h-[20px] !text-black !rounded-none "
          onClick={minusQty}
        >
          <FaAngleDown />
        </Button>
      </div>


      
    </div>
  );
};

export default QtyBox;
