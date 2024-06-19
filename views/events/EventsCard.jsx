import React from "react";
const EventsCard = ({ eventName, imgPath, date, time }) => {
    return (
      <>
        <article className="shadow-lg w-full  max-w-64 h-52 rounded-lg m-4 overflow-hidden hover:scale-105 duration-300 transition-all cursor-pointer">
          <div className="w-full h-2/3 overflow-hidden">
          <img src={`${imgPath}`} className="w-full rounded-t-lg" />
          </div>
         
          <div className="mx-2 px-3 rounded-2xl flex flex-row  mt-2">
            <p className="text-xs font-light inline">
              <span>
                <i className="fas fa-calendar-alt font-light mr-1"></i>
                {date}
              </span>
            </p>
            <p className="text-xs font-light inline">
              <span>
                <i className="fas fa-clock font-light text-xs ml-2 mr-1"></i>
                {time}
              </span>
            </p>
          </div>
          <p className="text-md ml-5 mr-2 mt-1 leading-4">{eventName}</p>
        </article>
      </>
    );
  };
  export default EventsCard;
  