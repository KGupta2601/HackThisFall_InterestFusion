import React from "react";

function ChatConnectionSingleCard({ isSelected }) {
  //   const isSelected = true;

  const data = {
    date: "10:25 AM",
    isNewMessage: false,
  };
  return (
    <div
      className={` flex py-1 items-center my-1 ${
        isSelected ? " bg-[#00A3FF] bg-opacity-30 " : ""
      }`}
    >
      <img
        src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"
        alt="Profile image"
        className="rounded-3xl w-12 ml-1.5   "
      />
      <div className="flex flex-col ml-2">
        <div className="flex justify-between ">
          <p
            className={`${
              data.isNewMessage
                ? "font-semibold text-[#F0F0F0] text-lg"
                : "font-medium text-[#DADADA] text-lg"
            } truncate w-40 `}
          >
            Titleeeeeeeeeeeeee eeeeeeeeee
            Titleeerrrrrrrrrrrrrriiiiiiiiiiiieeeeeeeeeeeeeeeeeeeee
          </p>
          <p className="ml-2 text-sm">{data.date}</p>
        </div>
        <div className="flex justify-between mt-1 ">
          <p
            className={` text-lg truncate w-56  ${
              data.isNewMessage ? "text-[#E0E0E0]" : "text-[#A0A0A0]"
            }`}
          >
            dessssssssssss dessssssssssss dessssssssssss
          </p>
          <div className="bg-[#00A3FF] rounded-full  px-2 py-1  text-sm items-center justify-center text-white ml-2">
            12
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatConnectionSingleCard;
