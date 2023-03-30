import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-[#F8FAFC] rounded-lg w-[100%] shadow-card h-[95%] mx-auto">
      {children}
    </div>
  );
};

export default Card;
