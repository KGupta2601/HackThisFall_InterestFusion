import React from "react";

function ChatConnectionDetails() {
  const selectedUserData = {
    messageSenderName: "Jack Raymonds",
    isOnline: false,
    email: "email@gmail.com",
    phone: "+91-1234567891",
    address: "Po Box 2103 Lindeb 07036 USA",
    joined: "Mon 22nd Feb 2021",

    src: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
  };
  return (
    <div className="flex bg-[#121212] hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex w-3/12 ">
      <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
      <div className="flex flex-col ">
        <div className=" flex flex-col w-[300px] items-center">
          <img
            src={selectedUserData.src}
            alt="Profile image"
            className="rounded-full w-40 h-40 mt-12 shadow-xl shadow-chat-primary-color "
          />
          <p className="font-bold text-white mt- mb-1 text-xl truncate max-w-64 ">
            {selectedUserData.messageSenderName.toUpperCase()}
          </p>
          <div className="flex justify-center items-center">
            {selectedUserData.isOnline ? (
              <>
                <div className="bg-green-700 rounded-full h-3 w-3"></div>
                <p className="ml-1.5 ">Active Now</p>
              </>
            ) : (
              <>
                <div className="bg-yellow-300 rounded-full h-3 w-3"></div>
                <p className="ml-1.5 ">Inactive Now</p>
              </>
            )}
          </div>
        </div>
        <div className="mx-5">
          <p className="text-lg mt-12">Email</p>
          <p className="text-base text-white truncate max-w-64">
            {selectedUserData.email}
          </p>

          <p className="text-lg mt-3">Phone</p>
          <p className="text-base text-white">{selectedUserData.phone}</p>

          <p className="text-lg mt-3">Address</p>
          <p className="text-base text-white max-w-64 overflow-auto">
            {selectedUserData.address}
          </p>
          <p className="text-lg mt-3">Joined</p>
          <p className="text-base text-white max-w-64 overflow-auto">
            {selectedUserData.joined}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatConnectionDetails;
