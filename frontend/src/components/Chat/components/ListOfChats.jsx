import React from "react";
import ChatConnectionSingleCard from "./chatConnectionSingleCard";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

function ListOfChats() {
  return (
    <div className="hidden md:flex bg-[#121212] w-3.5/12  ">
      <div className=" flex flex-col   ">
        <Link to="#" className=" ml-7 my-3 text-xl">
          👩‍💻 InterestFusion
        </Link>
        <div className="ml-7 mr-12 flex  items-center border mt-2 border-[#ABAFB1]  rounded-lg ">
          <IoSearch className="mx-2 h-6 w-6" />

          <input
            placeholder="Search messages, people"
            className="h-10 hover:outline-none w-60"
          />
        </div>
        <div className="overflow-y-scroll flex-grow">
          <ChatConnectionSingleCard isSelected={false} />
          <ChatConnectionSingleCard isSelected={false} />
          <ChatConnectionSingleCard isSelected={true} />
          <ChatConnectionSingleCard isSelected={false} />
          <ChatConnectionSingleCard isSelected={false} />
        </div>
      </div>
      <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
    </div>
  );
}

export default ListOfChats;
