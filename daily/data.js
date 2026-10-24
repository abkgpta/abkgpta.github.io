// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "25 Oct 2026, 12:18 AM IST";
const NEWS = [
  {
    topic: "Startups & Indian startups",
    stories: [
      { title: "From Navi To BookMyShow — Indian Startups Raised Over $233 Mn This Week", source: "Inc42", url: "https://inc42.com/buzz/from-navi-to-bookmyshow-indian-startups-raised-over-233-mn-this-week/", img: "https://asset.inc42.com/2026/08/Social-100-1-1.jpg" },
      { title: "Funding and acquisitions in Indian startups this week [Oct 19 – Oct 24]", source: "Entrackr", url: "https://entrackr.com/report/weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-oct-19-oct-24-12744844", img: "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/23/feature-image-2026-10-23-21-08-45.png" }
    ]
  },
  {
    topic: "Deep tech",
    stories: [
      { title: "DeepSeek reportedly raises $15B days after US restrictions", source: "TechCrunch", url: "https://techcrunch.com/2026/10/22/deepseek-reportedly-raises-15b-days-after-us-restrictions/", img: "https://techcrunch.com/wp-content/uploads/2025/01/deepseek-2.jpg?resize=1200,800" },
      { title: "India has changed its startup rules for deep tech", source: "TechCrunch", url: "https://techcrunch.com/2026/02/07/india-has-changed-its-startup-rules-for-deep-tech/", img: "https://techcrunch.com/wp-content/uploads/2024/02/india-space-getty.jpg?w=1200" }
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

// Calendar snapshot from Google Calendar (next 7 days, Asia/Kolkata)
const CALENDAR = [
  { day: "Sun 25 Oct", items: [
    { time: "9:00 PM", title: "Leave office" },
    { time: "10:00 PM", title: "Bedtime: be in bed" }
  ]},
  { day: "Mon 26 Oct", items: [
    { time: "9:00 PM", title: "Leave office" },
    { time: "10:00 PM", title: "Bedtime: be in bed" }
  ]},
  { day: "Tue 27 Oct", items: [
    { time: "9:00 PM", title: "Leave office" },
    { time: "10:00 PM", title: "Bedtime: be in bed" }
  ]},
  { day: "Wed 28 Oct", items: [
    { time: "9:00 PM", title: "Leave office" },
    { time: "10:00 PM", title: "Bedtime: be in bed" }
  ]},
  { day: "Thu 29 Oct", items: [
    { time: "9:00 PM", title: "Leave office" },
    { time: "10:00 PM", title: "Bedtime: be in bed" }
  ]}
];

// Quote of the day: update every day
const QUOTE = {
  text: "The best way to predict the future is to invent it.",
  author: "Alan Kay"
};

