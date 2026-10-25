// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "25 Oct 2026, 6:55 AM IST";

const QUOTE = {
  "text": "The details are not the details. They make the design.",
  "author": "Charles Eames"
};

const NOW = [
  {
    "name": "Ideakicks",
    "date": "24 Oct",
    "note": "Brand system v2, a brand film plan and a pre-launch social media strategy."
  },
  {
    "name": "We Are All Nodes",
    "date": "22 Oct",
    "note": "An interactive five-slide story about mesh networks, made for nNode."
  },
  {
    "name": "nNode",
    "date": "20 Oct",
    "note": "Online store, ecommerce logistics, city maps and a promo video plan."
  },
  {
    "name": "Celestial",
    "date": "13 Oct",
    "note": "A 3D research tool that maps a question as a solar system of related topics.",
    "url": "https://abkgpta.github.io/celestial/"
  },
  {
    "name": "TVET Gujarat",
    "date": "1 Oct",
    "note": "System design research: scope and stakeholder map for technical and vocational education in Gujarat."
  }
];

const NEWS = [
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Jorge Martin ruled out of Australian GP after Sprint crash",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/10/24/jorge-martin-ruled-out-of-australian-gp-after-sprint-crash/1180521",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/10/24/a3bef971-6f46-4b4d-bde7-67506e620ff5/LGZ_1468.jpg?width=1200&height=630",
        "why": "Martin fractured his radius fighting Marquez for the Sprint lead, misses Sunday's race and lost the title lead."
      },
      {
        "title": "New Ultraviolette X-47 Venom launched at Rs 2.65 lakh onwards",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-ultraviolette-x-47-venom-launch-price-rs-2-65-lakh-onwards-12559248.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/new-ultraviolette-x-47-venom-electric-launch-price-3.jpg",
        "why": "Electric bike with up to 343 km claimed range and 0–100 km/h in 5.9s; introductory price for the first 5,000 units."
      },
      {
        "title": "New KTM 200 Duke launched at Rs 2.09 lakh with ETB, TCS, ride modes and quickshifter",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-ktm-200-duke-launch-price-rs-2-09-l-etb-tcs-ride-modes-quickshifter-12559419.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/new-updated-2026-ktm-200-duke-launched.jpg",
        "why": "Ride-by-wire, traction control, a bi-directional quickshifter and Rain/Street modes; the engine is unchanged."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Car Sales H1 FY 2027 – Maruti and Tata grow market share",
        "source": "Rushlane",
        "url": "https://rushlane.com/car-sales-h1-fy-2027-maruti-and-tata-grow-market-share-12559326.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/02/2026-tata-punch-ev-facelift-first-drive-review.jpg",
        "why": "H1 sales rose 27.16% to 26.37 lakh units; Tata passed Mahindra for second and Maruti's share rose to 40.97%."
      },
      {
        "title": "BYD Denza luxury brand India debut confirmed for 13th Nov 2026",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/byd-denza-luxury-brand-india-debut-confirmed-for-13th-nov-2026-12559377.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/byd-denza-teased-for-india-cover.jpg",
        "why": "BYD's premium EV brand targets the Rs 80 lakh–1.5 crore segment; the D9 electric MPV is expected first."
      },
      {
        "title": "Hyundai Bayon variant-wise features and dimensions leak before launch",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/hyundai-bayon-variant-wise-features-dimensions-leak-before-launch-12559375.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/hyundai-bayon-new-colours.jpg",
        "why": "A leak ahead of the 26 Oct launch shows seven trims, a 1.5L petrol and Level 2 ADAS on the top trim."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Hottest toy for Christmas? Nvidia CEO plays with adorable Microduck robots, 20,000 sell",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/23/hottest-toy-for-christmas-nvidia-ceo-plays-with-adorable-microduck-robots-20000-sell/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/microduck-kickabout.jpg",
        "why": "Pollen Robotics' open-source Microduck passed 20,000 preorders after a viral video of Jensen Huang at GTC Berlin."
      },
      {
        "title": "Commonwealth Fusion Systems gets $85M to build better fusion-ready semiconductors",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/23/commonwealth-fusion-systems-gets-85m-to-build-better-fusion-ready-semiconductors/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/CFS-Brandon-Sorbom-Disrupt-2026.jpg",
        "why": "A US CHIPS award, with a government stake, funds silicon carbide power electronics and radiation-hardened controls."
      },
      {
        "title": "Tonbo Imaging shares end debut session at 62% premium to IPO price",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/tonbo-imaging-makes-strong-market-debut-lists-at-66-premium-to-ipo-price/",
        "img": "https://asset.inc42.com/2026/10/Tonbo-FTR-1-760x570.jpg",
        "why": "The defence imaging firm listed at ₹1,162 against a ₹700 IPO price after a 135.9x subscribed issue."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Zetwerk shares list at over 5% premium in stock market debut",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/zetwerk-shares-list-at-over-5-premium-in-stock-market-debut-12740395",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/23/zetwerk-listing-2026-10-23-11-21-26.png",
        "why": "The manufacturing startup opened at Rs 159.25 against a Rs 151 issue price; FY26 revenue rose 40.4%."
      },
      {
        "title": "Y Combinator-backed Firstwork nets $15 Mn to expand across US and Europe",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/y-combinator-backed-firstwork-nets-15-mn-to-expand-footprint-across-us-and-europe/",
        "img": "https://asset.inc42.com/2026/10/Untitled-Design-22.png",
        "why": "Earlybird led the Series A for its AI agents that automate HR operations for frontline workers."
      },
      {
        "title": "Daytona hits $1B valuation with $60M Series B for AI agent cloud",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/10/20/daytona-hits-1b-valuation-with-60m-series-b-for-ai-agent-cloud/",
        "img": "https://cdn.tech.eu/uploads/2026/10/daytona-featured-149.png",
        "why": "FirstMark led the round for the maker of sandboxed clouds for AI agents; run-rate revenue grew 25x this year."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Jio Platforms IPO rides institutional demand to 22.19 times subscription",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/jio-platforms-ipo-rides-institutional-demand-to-22-19-times-subscription-126102301595_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/22/thumb/fitandfill/1200X628/1713808608-4766.jpg",
        "why": "India's largest IPO, at ₹30,213 crore, was subscribed 22.19x; listing is set for 28 October."
      },
      {
        "title": "JSW Steel Q2 profit jumps; board approves Utkal Phase-II expansion",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/jsw-steel-q2fy27-result-net-profit-rises-14-1-to-5-359-crore-126102300833_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-09/26/thumb/fitandfill/1200X628/1758868544-2245.JPG",
        "why": "Record 7.27 mt output; a 5 mtpa Odisha expansion was approved at ₹16,150 crore."
      },
      {
        "title": "Infosys cuts FY27 guidance; Q2 net profit rises 6.2%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/infosys-q2-results-net-profit-rises-6-2-to-7-823-cr-revenue-up-10-2-126102300941_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/23/thumb/fitandfill/1200X628/1792778815-4648.jpg",
        "why": "Revenue guidance cut to 1–2% constant-currency growth from 1.5–3%; profit missed estimates."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Sun 25 Oct",
    "items": [
      {
        "time": "9:30 AM",
        "title": "Run 2k"
      },
      {
        "time": "9:00 PM",
        "title": "Leave office"
      },
      {
        "time": "10:00 PM",
        "title": "Bedtime: be in bed"
      }
    ]
  },
  {
    "day": "Mon 26 Oct",
    "items": [
      {
        "time": "9:00 PM",
        "title": "Leave office"
      },
      {
        "time": "10:00 PM",
        "title": "Bedtime: be in bed"
      }
    ]
  },
  {
    "day": "Tue 27 Oct",
    "items": [
      {
        "time": "9:00 PM",
        "title": "Leave office"
      },
      {
        "time": "10:00 PM",
        "title": "Bedtime: be in bed"
      }
    ]
  },
  {
    "day": "Wed 28 Oct",
    "items": [
      {
        "time": "9:00 PM",
        "title": "Leave office"
      },
      {
        "time": "10:00 PM",
        "title": "Bedtime: be in bed"
      }
    ]
  },
  {
    "day": "Thu 29 Oct",
    "items": [
      {
        "time": "9:00 PM",
        "title": "Leave office"
      },
      {
        "time": "10:00 PM",
        "title": "Bedtime: be in bed"
      }
    ]
  }
];

const RACING = {
  "items": [
    {
      "when": "23–25 Oct",
      "what": "MotoGP: Australian GP, Phillip Island (race today)"
    },
    {
      "when": "30 Oct–1 Nov",
      "what": "MotoGP: Malaysian GP, Sepang"
    },
    {
      "when": "6–8 Nov",
      "what": "MotoGP: Qatar GP, Lusail (rescheduled)"
    },
    {
      "when": "20–22 Nov",
      "what": "MotoGP: Portuguese GP, Portimão"
    }
  ],
  "note": "Marc Marquez won Saturday's Australian Sprint; Jorge Martin crashed and misses Sunday's race. WorldSBK's 2026 season has ended.",
  "source": {
    "name": "Crash.net, updated 2026 MotoGP calendar",
    "url": "https://www.crash.net/motogp/news/1091546/1/updated-2026-motogp-schedule-full-after-qatar-postponement"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 2,
  "km": "4.1",
  "latest": {
    "date": "11 Oct",
    "km": "2.0",
    "pace": "7:40"
  }
};

const MUSIC = {
  "song": {
    "title": "Innerbloom",
    "artist": "RÜFÜS DU SOL",
    "id": "6CGMZijOAZvTXG21T8t6R0",
    "why": "A nine-and-a-half-minute melodic house slow-burner from the 2016 album Bloom, for the Bicep and Overmono side of your listening."
  },
  "playlist": {
    "name": "Weekly UK Electronic Discovery",
    "url": "https://open.spotify.com/playlist/56rZTdOy5kEwHq12HLmThZ",
    "date": "2026-10-25"
  },
  "lately": [
    "Cartoon",
    "Coldplay",
    "Loud Luxury",
    "Calvin Harris",
    "David Guetta",
    "G-Eazy"
  ]
};

const LEARN = {
  "term": "Draft angles and the parting line",
  "body": "Draft is the taper given to faces that run parallel to the mould's opening direction, so a moulded part can release without scraping, sticking or ejector-pin marks. Common guidance for injection moulding is at least 0.5–1° on smooth faces, plus roughly 1–1.5° for every 0.025 mm of texture depth, so heavily grained surfaces can need 3–5°. Draft is always measured from the pull direction, and every face must slope away from the parting line, the boundary where the two mould halves meet. Placing that line is a design decision, not just a tooling one: it leaves a visible witness mark and decides which features become undercuts, so designers often hide it on a crisp edge or a deliberate feature line. Truly vertical walls need side actions or very short, polished cores, which is why perfectly straight CAD sides rarely survive into production.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Pull",
        "note": "The mould opens along one pull direction."
      },
      {
        "label": "Parting",
        "note": "The line where the two mould halves meet."
      },
      {
        "label": "Draft",
        "note": "Faces taper away from the parting line.",
        "hl": true
      },
      {
        "label": "Texture",
        "note": "Add ~1–1.5° per 0.025 mm of grain depth."
      }
    ],
    "caption": "Releasing a part: direction, split, taper, texture."
  },
  "source": {
    "name": "Wikipedia: Draft (engineering)",
    "url": "https://en.wikipedia.org/wiki/Draft_(engineering)"
  },
  "past": [
    "Surface continuity: G0 to G3"
  ]
};

const DESIGN = {
  "name": "Piaggio Vespa 98",
  "designer": "Corradino D'Ascanio",
  "year": "1946",
  "why": "An aeronautical engineer who disliked motorcycles designed it from scratch: a stressed pressed-steel monocoque instead of a frame, a step-through floor, and the engine tucked beside the rear wheel under a cowl. Every visible surface does a job, from the legshield that keeps clothes clean to the single-sided front arm that makes tyre changes easy.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/1947_Vespa_98_100cc.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:1947_Vespa_98_100cc.jpg"
  }
};

const FUNDING = {
  "summary": "$133.9M across 15 Indian startups, 19–24 Oct, down 56% from the week before.",
  "rounds": [
    {
      "company": "Even Healthcare",
      "amount": "$50M",
      "stage": "Series B",
      "sector": "Healthcare"
    },
    {
      "company": "AuxoAI",
      "amount": "$20.7M",
      "stage": "Series A",
      "sector": "AI"
    },
    {
      "company": "The Pant Project",
      "amount": "₹109 Cr",
      "stage": "Series B",
      "sector": "Menswear"
    },
    {
      "company": "Battery Smart",
      "amount": "~₹100 Cr",
      "stage": "",
      "sector": "EV battery swapping"
    },
    {
      "company": "CureBay",
      "amount": "~₹100 Cr",
      "stage": "Pre-Series C",
      "sector": "Rural healthcare"
    },
    {
      "company": "Chapter Home",
      "amount": "₹63 Cr",
      "stage": "",
      "sector": "Home & kitchen"
    }
  ],
  "source": {
    "name": "Entrackr weekly funding report",
    "url": "https://entrackr.com/report/weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-oct-19-oct-24-12744844"
  }
};

const LAUNCHES = {
  "items": [
    {
      "model": "Hyundai Bayon",
      "when": "26 Oct 2026",
      "price": "₹9.49–14.90 lakh"
    },
    {
      "model": "Mercedes-Benz GLC Electric",
      "when": "4 Nov 2026",
      "price": "₹85 lakh"
    },
    {
      "model": "Honda Rebel 500",
      "when": "Nov 2026",
      "price": "₹4.40–4.60 lakh"
    },
    {
      "model": "Ducati DesertX V2",
      "when": "Nov 2026",
      "price": "₹19–22 lakh"
    },
    {
      "model": "JSW Motors Combat (hybrid SUV)",
      "when": "4 Dec 2026",
      "price": "₹38 lakh"
    },
    {
      "model": "Royal Enfield Himalayan 750",
      "when": "Dec 2026",
      "price": "₹4.50–5.00 lakh"
    }
  ],
  "source": {
    "name": "Autocar India, upcoming bikes and cars",
    "url": "https://www.autocarindia.com/upcoming-bikes"
  }
};

