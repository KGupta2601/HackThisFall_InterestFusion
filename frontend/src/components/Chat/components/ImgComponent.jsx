import React from "react";

function ImgComponent({ src }) {
  return (
    <img
      src={src}
      alt="Profile image"
      className="rounded-3xl w-12 h-12 mt-2.5  "
    />
  );
}

export default ImgComponent;
