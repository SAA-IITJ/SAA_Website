const HOME_PAGE_RENDER_INPUTS = {
  NavLinks: "NavLinks",
  CarouselMedia: "CarouselMedia",
};
const HOME_PAGE_NAVLINKS = {
  home: ["Home", "/home"],
  team: [
    "Team", 
    [
      ["Faculty Advisor", "/facultyAdvisor"],
      ["Student Team", "/studentTeam"],
    ],
  ],
  
 
  activities: ["Activities", "/events"],
  visit_IITJ: ["Visit IITJ", "/visitIITJ"],
  giving_back: ["Giving back", "/givingBack"],
  quick_access: [
    "Quick Access",
    [
      ["IIT Jodhpur", "https://www.iitj.ac.in/"],
      ["Alumni Portal", "https://alumni.iitj.ac.in/"],
    ],
  ],
};

const TEAM_PAGE_RENDER_INPUTS = {
  TeamMembers: "TeamMembers",
};

const TEAM_PAGE_POSITION_TYPES = {
  1: "President",
  2: "Vice President",
  3: "Overall Coordinators",
  4: "Coordinators",
  5: "Team Members",
};

const TEAM_PAGE_TEAM_TYPES = {
  1: "Super",
  2: "Design",
  3: "Content",
  4: "Tech",
  5: "Events",
  6: "Media",
  7: "Alumni Mentorship Programme"
};

const GALLERY_PAGE_RENDER_INPUTS = {
  Gallery: "Gallery",
};

const EVENTS_PAGE_RENDER_INPUTS = {
  Events: "Events",
  EventTypes: "EventTypes",
};

module.exports = {
  HOME_PAGE_RENDER_INPUTS,
  HOME_PAGE_NAVLINKS,
  TEAM_PAGE_RENDER_INPUTS,
  TEAM_PAGE_POSITION_TYPES,
  TEAM_PAGE_TEAM_TYPES,
  GALLERY_PAGE_RENDER_INPUTS,
  EVENTS_PAGE_RENDER_INPUTS,
};
