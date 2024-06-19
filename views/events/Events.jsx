import React, { useEffect, useState } from "react";
import EventsCard from "./EventsCard.jsx";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [currentEvent, setCurrentEvent] = useState("All Events");
  const [eventTypes, setEventTypes] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();


        data["EventTypes"] = [
          { id: "234", name: "All Events" },
          ...data["EventTypes"],
        ];
        data["Events"] = {
          ...data["Events"],
          "All Events": Object.values(data["Events"]).flat(),
        };

        setEvents(data["Events"]);
        setEventTypes(data["EventTypes"]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full lg:h-[50vh] md:h-[60vh] max-md:h-[40vh]  relative">

        <img src="/g7.jpg" className="object-stretch w-full h-full " />
        <div className="w-full max-w-md absolute left-0 right-0 ml-auto mr-auto bottom-10">
          <form className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-700 bg-white border-non rounded-lg shadow-sm focus:outline-none opacity-40 backdrop-blur-md focus:opacity-100"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-red-400 hover:text-red-700 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.73-5.57a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="relative w-screen overflow-hidden h-fit">
        <div className="flex flex-row w-full h-fit justify-evenly text-xl mx-4 my-2">
          {eventTypes.map((ele) => {
            return (
              <span
                className={
                  ele.name === currentEvent
                    ? `border-b-2 border-b-red-300 cursor-pointer w-full text-center pb-2`
                    : "w-full text-center cursor-pointer pb-2"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentEvent(ele.name);
                }}
              >
                {ele.name}
              </span>
            );
          })}
        </div>
        <div className="w-full h-full items-start justify-center">
          <div
            id="eventCardsContainer"
            className="w-full h-full grid max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-8"
          >
            {events.length != 0
              ? events[currentEvent].map((ele) => {
                  return (
                    <EventsCard
                      imgPath={ele.mediaFiles[0]}
                      eventName={ele.name}
                      time={ele.startTime}
                      date={ele.startDate}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
