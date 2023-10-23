import React from "react";
import { ColorRing } from "react-loader-spinner";

function LoadingSpinner({ width, height, colors }) {
  return (
    <ColorRing
      visible={true}
      height={width}
      width={height}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={colors}
    />
  );
}

export default LoadingSpinner;
