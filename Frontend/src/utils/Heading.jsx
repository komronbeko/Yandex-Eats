import React from "react";

const Heading = ({text, color}) => {
  return (
    <div className="flex flex-col mb-10 gap-3 justify-center items-center px-2 text-center">
      <h2 className={`text-4xl font-rubik text-${color} font-extrabold`}>
        {text}
      </h2>
      <span className="text-gray">Replenish man have thing gathering lights yielding shall you</span>
    </div>
  );
};

export default Heading;
