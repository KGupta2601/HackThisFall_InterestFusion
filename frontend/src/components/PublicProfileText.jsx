import React from "react";

function PublicProfileText(props) {
  return (
    <div className="flex my-2 ">
      {" "}
      <p className="text-purple-600 text-2xl font-semibold mr-10">
        {props.initial}
      </p>
      <p className="text-2xl font-semibold">{props.detail}</p>
    </div>
  );
}

export default PublicProfileText;
