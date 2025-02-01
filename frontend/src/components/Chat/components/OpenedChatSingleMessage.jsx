import React from "react";
import ImgComponent from "./ImgComponent";

function OpenedChatSingleMessage({ data }) {
  const userId = "122";
  const isMessageByMe = true;

  return (
    <div className="flex  my-2.5 mx-10 ">
      {/* if messgageByMe */}
      {data.messageSenderId === userId ? (
        <div className="flex justify-end w-full ">
          <div className="mr-3 ">
            <div className="flex items-end justify-end mb-1">
              <p className="mr-2 ">{data.date}</p>

              <p
                className={
                  "font-medium text-[#DADADA] text-lg truncate max-w-60 text-right"
                }
              >
                {data.messageSenderName}
              </p>
            </div>
            <div className="bg-chat-primary-color px-6 py-2.5 text-white rounded-b-lg rounded-tl-lg max-w-[450px]">
              {" "}
              {data.message}{" "}
            </div>
          </div>
          <ImgComponent src={data.messageSenderImg} />
        </div>
      ) : (
        <div className="flex ">
          <ImgComponent src={data.messageSenderImg} />

          <div className="ml-3 ">
            <div className="flex items-end  mb-1">
              <p
                className={
                  "font-medium text-[#DADADA] text-lg truncate max-w-60 text-left"
                }
              >
                {data.messageSenderName}
              </p>
              <p className="ml-2 ">{data.date}</p>
            </div>
            <div className="bg-chat-secondary-color px-6 py-2.5 text-white rounded-b-lg rounded-tr-lg  border-[#323232]  border-2 max-w-[450px]">
              {" "}
              {data.message}{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenedChatSingleMessage;
