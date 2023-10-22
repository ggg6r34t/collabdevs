import { useState, useEffect } from "react";

// function to format numbers
function formatNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "m";
  } else if (number >= 1000) {
    return Math.floor(number / 1000) + "k";
  } else {
    return number.toString();
  }
}

const useFormattedNumber = (initialNumber: number) => {
  const [number, setNumber] = useState(initialNumber);

  useEffect(() => {
    // update the formatted number whenever the initial number changes
    setNumber(initialNumber);
  }, [initialNumber]);

  const formattedNumber = formatNumber(number);

  return formattedNumber;
};

export default useFormattedNumber;
