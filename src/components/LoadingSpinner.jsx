import React from "react";
import { ColorRing } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <ColorRing
      visible={true}
      height="30"
      width="30"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
    />
  );
}

export default LoadingSpinner;
