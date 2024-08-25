import React from "react";

const Para = ({ text }) => {
  return (
    <p className="text-sm dark:text-gray-300 text-gray-700 leading-[1.1]">
       {text}
    </p>
  );
};

const Footer = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-8 h-14 px-5">
      <Para text="all rights are &reg; reserved"/>
    </div>
  );
};

export default Footer;
