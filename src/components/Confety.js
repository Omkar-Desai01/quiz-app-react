import React from "react";

import Confetti from "react-confetti";
// const { height, width } = useWindowDimensions();
const { innerWidth: width, innerHeight: height } = window;
export default () => {
  return <Confetti width={width} height={height} />;
};
