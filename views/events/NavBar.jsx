import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/navlinks");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setNavLinks(data["NavLinks"]);
     
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(null);



  return (
     <header className="bg-white">
    <nav className="navbar flex justify-between items-center w-[92%] mx-auto py-4">
      <div className="flex items-center">
        <img
          className="w-16 cursor-pointer"
          src="/assets/saa_logo_jpeg.jpeg"
          alt="..."
        />
        <span className="title-holder">
          <span className="title text-2xl font-semibold whitespace-nowrap dark:text-black ml-3">
            Society of Alumni Affairs
          </span>
        </span>
      </div>
      <div className="nav-link duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 md:justify-end">
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
          {Object.entries(navLinks).map(([key, [text, linkOrSublinks]], index) => (
            <li key={key}>
              {Array.isArray(linkOrSublinks) ? (
                <>
                  <button
                    id={`dropdownDelayButton${index}`}
                    data-dropdown-toggle={`dropdownDelay${index}`}
                    data-dropdown-delay="200"
                    data-dropdown-trigger="hover"
                    className="text-black bg-white hover:text-gray-500 focus:outline-none rounded-lg text-center inline-flex items-center dark:bg-white dark:hover:text-gray-500"
                    type="button"
                
                  >
                    {text}
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  { (
                    <div
                      id={`dropdownDelay${index}`}
                      className="z-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white hidden"
                    >
                      <ul
                        className="py-2 text-sm text-black dark:text-black"
                        aria-labelledby={`dropdownDelayButton${index}`}
                      >
                        {linkOrSublinks.map(([subText, subLink]) => (
                          <li key={subLink}>
                            <a
                              href={subLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:text-black"
                            >
                              {subText}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <a className="nav-link nav-link-ltr" href={linkOrSublinks}>
                  {text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </header>
  );
};

export default Navbar;
