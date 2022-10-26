import React from "react";
import { MdDisabledByDefault } from "react-icons/md";

function NoData() {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <MdDisabledByDefault />
      <p>NoData</p>
    </div>
  );
}

export default NoData;
