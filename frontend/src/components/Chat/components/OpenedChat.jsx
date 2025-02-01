import React from "react";
import OpenedChatSingleMessage from "./OpenedChatSingleMessage";
import { BiSolidMicrophone } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import { IoSendSharp } from "react-icons/io5";
import ChatHeader from "./ChatHeader";

function OpenedChat() {
  const allMessages = [
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "121",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "122",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "121",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "121",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "122",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "121",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "121",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "122",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
    {
      id: "1",
      date: "10:30 AM",
      messageSenderId: "121",
      messageSenderName: "Jack Raymonds",
      messageSenderImg:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
      message:
        "I know, right? Weekend plans are the best. Any exciting plans on your end?",
    },
  ];
  return (
    <div className="flex flex-col h-screen w-8/12 sm:w-screen">
      <ChatHeader />
      <hr className=" h-0.5 border-t-0 bg-white/10" />

      <div className="overflow-y-scroll flex-grow">
        {allMessages.map((messageData, index) => {
          return <OpenedChatSingleMessage key={index} data={messageData} />;
        })}
      </div>

      <div className="flex bg-[#121212]  items-center justify-between px-5 mt-2">
        <input
          placeholder="Type message... "
          className="w-[650px] sm:w-min p-5 py-5 flex-grow  focus:outline-none"
        />
        <BiSolidMicrophone className="h-6 w-6" />
        <CgAttachment className="h-6 w-6 mx-2" />

        <button className="flex font-medium bg-chat-primary-color py-1.5 px-4 rounded-lg text-white">
          Send
          <IoSendSharp className="h-6 w-6 ml-3" />
        </button>
        {/* <div className="flex">
        </div> */}
      </div>
    </div>
  );
}

export default OpenedChat;
