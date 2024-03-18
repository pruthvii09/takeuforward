import React from "react";

const SubmitButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-lg bg-blue-700">
      Submit
    </button>
  );
};

export default SubmitButton;
