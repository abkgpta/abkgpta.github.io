// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "25 Oct 2026, 12:40 AM IST";

const QUOTE = { text: "The best way to predict the future is to invent it.", author: "Alan Kay" };

const NOW = [
  { name: "Celestial", note: "A 3D research tool that maps a question as a solar system of related topics.", url: "https://abkgpta.github.io/" },
  { name: "portfolio.27", note: "Industrial design portfolio: DASH, overgrwth, cortX." }
];

const NEWS = [
  {
    topic: "Startups & Indian startups",
    stories: [
      { title: "From Navi To BookMyShow — Indian Startups Raised Over $233 Mn This Week", source: "Inc42", url: "https://inc42.com/buzz/from-navi-to-bookmyshow-indian-startups-raised-over-233-mn-this-week/", img: "https://asset.inc42.com/2026/08/Social-100-1-1.jpg", why: "Inc42's weekly roundup of Indian funding rounds." },
      { title: "Funding and acquisitions in Indian startups this week [Oct 19 – Oct 24]", source: "Entrackr", url: "https://entrackr.com/report/weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-oct-19-oct-24-12744844", img: "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/23/feature-image-2026-10-23-21-08-45.png", why: "$133.9M across 15 startups, down 56% from the week before." }
    ]
  },
  {
    topic: "Deep tech",
    stories: [
      { title: "DeepSeek reportedly raises $15B days after US restrictions", source: "TechCrunch", url: "https://techcrunch.com/2026/10/22/deepseek-reportedly-raises-15b-days-after-us-restrictions/", img: "https://techcrunch.com/wp-content/uploads/2025/01/deepseek-2.jpg?resize=1200,800" }
    ]
  },
  {
    topic: "Motorcycles",
    stories: [
      { title: "CFMoto motorcycle sales jump 30 per cent in first half of 2026", source: "Visordown", url: "https://www.visordown.com/news/cfmoto-motorcycle-sales-jump-30-cent-first-half-2026", img: "https://www.visordown.com/sites/default/files/2026-06/cfmoto-1000-mt-x-review18.jpg?width=1600&aspect_ratio=16:9" },
      { title: "Adventure motorcycle sales “well ahead of market trend”", source: "Visordown", url: "https://www.visordown.com/news/adventure-motorcycle-sales-well-ahead-market-trend", img: "https://www.visordown.com/sites/default/files/2026-04/site-image-resize-2026-04-10t104929.813.png?width=1600&aspect_ratio=16:9" }
    ]
  }
];

const CALENDAR = [
  { day: "Sun 25 Oct", items: [ { time: "9:00 PM", title: "Leave office" }, { time: "10:00 PM", title: "Bedtime: be in bed" } ] },
  { day: "Mon 26 Oct", items: [ { time: "9:00 PM", title: "Leave office" }, { time: "10:00 PM", title: "Bedtime: be in bed" } ] },
  { day: "Tue 27 Oct", items: [ { time: "9:00 PM", title: "Leave office" }, { time: "10:00 PM", title: "Bedtime: be in bed" } ] },
  { day: "Wed 28 Oct", items: [ { time: "9:00 PM", title: "Leave office" }, { time: "10:00 PM", title: "Bedtime: be in bed" } ] },
  { day: "Thu 29 Oct", items: [ { time: "9:00 PM", title: "Leave office" }, { time: "10:00 PM", title: "Bedtime: be in bed" } ] }
];

const RACING = {
  items: [
    { when: "23–25 Oct", what: "MotoGP: Australian GP, Phillip Island" },
    { when: "30 Oct–1 Nov", what: "MotoGP: Malaysian GP, Sepang" },
    { when: "6–8 Nov", what: "MotoGP: Qatar GP, Lusail (rescheduled)" }
  ],
  note: "Qatar's new date was still awaiting final confirmation in late September.",
  source: { name: "RTR Sports, MotoGP 2026 calendar", url: "https://rtrsports.com/en/blog/calendar-motogp-2026/" }
};

const STRAVA = {
  period: "last 30 days",
  runs: 2,
  km: "4.1",
  latest: { date: "11 Oct", km: "2.0", pace: "7:40" }
};

const LEARN = {
  term: "Solid-state batteries",
  body: "They replace the liquid electrolyte inside a lithium-ion cell with a solid one, such as a ceramic, glass, sulfide or polymer. The solid layer is far less flammable and can make a lithium-metal anode practical, which promises more energy in the same space. The hard parts are keeping the solid layers in tight contact as the cell swells and shrinks, and making them cheaply at scale.",
  past: []
};

const DESIGN = {
  name: "Ducati Monster (M900)",
  designer: "Miguel Galluzzi",
  year: "1993",
  why: "It stripped a sportbike down to an exposed trellis frame, a big tank and a round headlight, and turned the 'naked' bike into a category of its own. A lesson in getting character from structure you would normally hide."
};

const FUNDING = {
  summary: "$133.9M across 15 Indian startups, 19–24 Oct, down 56% from the week before.",
  rounds: [
    { company: "Even Healthcare", amount: "$50M", stage: "Series B", sector: "Healthcare" },
    { company: "AuxoAI", amount: "$20.7M", stage: "Series A", sector: "AI" },
    { company: "The Pant Project", amount: "₹109 Cr", stage: "Series B", sector: "Menswear" },
    { company: "Battery Smart", amount: "~₹100 Cr", stage: "", sector: "EV battery swapping" },
    { company: "CureBay", amount: "~₹100 Cr", stage: "Pre-Series C", sector: "Rural healthcare" },
    { company: "Chapter Home", amount: "₹63 Cr", stage: "", sector: "Home & kitchen" }
  ],
  source: { name: "Entrackr weekly funding report", url: "https://entrackr.com/report/weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-oct-19-oct-24-12744844" }
};

const LAUNCHES = {
  items: [
    { model: "Honda Rebel 500", when: "Nov 2026", price: "₹4.40–4.60 lakh" },
    { model: "Ducati DesertX V2", when: "Nov 2026", price: "₹19–22 lakh" },
    { model: "Royal Enfield Himalayan 750", when: "Dec 2026", price: "₹4.50–5.00 lakh" }
  ],
  source: { name: "Autocar India, upcoming bikes", url: "https://www.autocarindia.com/upcoming-bikes" }
};
