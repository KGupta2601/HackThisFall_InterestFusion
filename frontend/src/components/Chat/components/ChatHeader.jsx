import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function ChatHeader({}) {
  const selectedUserData = {
    messageSenderName: "Jack Raymonds",
    isOnline: true,
    src: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
  };
  return (
    <div className="flex bg-[#121212] items-center justify-between px-5 py-1 ">
      <div className="flex my-2 mx-5">
        <img
          src={selectedUserData.src}
          alt="Profile image"
          className="rounded-3xl w-12 h-12 "
        />
        <div className="flex flex-col ml-3 ">
          <p
            className={
              "font-medium text-[#DADADA] text-lg truncate max-w-60 text-right"
            }
          >
            {selectedUserData.messageSenderName}
          </p>
          <p className="text-chat-primary-color text-sm">
            {selectedUserData.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <BsThreeDotsVertical className="h-7 w-7 " />
    </div>
  );
}

export default ChatHeader;
