// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "26 Oct 2026, 7:15 AM IST";

const QUOTE = {
  "text": "Design is not just what it looks like and feels like. Design is how it works.",
  "author": "Steve Jobs"
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
        "title": "MotoGP Australian GP cancelled due to weather",
        "source": "Motorsport Week",
        "url": "https://www.motorsportweek.com/2026/10/25/final-motogp-australian-gp-cancelled-phillip-island-weather/",
        "img": "https://www.motorsportweek.com/wp-content/uploads/2026/10/SI202610240245_hires_jpeg_24bit_rgb.jpg",
        "why": "Low visibility grounded the medical helicopter; only Sprint points count and Marc Marquez leaves with a 10-point lead."
      },
      {
        "title": "TVS sales breakup Sep 2026: Jupiter, Apache, XL, iQube, Raider, Ntorq, Radeon",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/tvs-sales-breakup-sep-2026-jupiter-apache-xl-iqube-raider-ntorq-radeon-12559465.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/08/new-tvs-jupiter-sales-record.jpg",
        "why": "Domestic sales rose 16.65% to 4,82,073 units and exports 29.74%; Jupiter alone was 32% of domestic volume."
      },
      {
        "title": "New Ducati Hypermotard V2 launched at Rs 16.53 lakh: 120 bhp, 94 Nm, 177 kg",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-ducati-hypermotard-v2-launch-price-rs-16-53-l-120-bhp-94-nm-177-kg-12559331.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/new-ducati-hypermotard-v2-india-launch-3.jpg",
        "why": "Replaces the Hypermotard 950 with a new 890cc V-twin and monocoque chassis; the SP costs Rs 20.78 lakh."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "TechCrunch Mobility: Blue-green is the color of autonomy",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/25/techcrunch-mobility-blue-green-is-the-color-of-autonomy/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/tesla-cybercab-getty.jpg",
        "why": "NHTSA proposed optional steady cyan lights, visible from all sides, to show a vehicle is driving itself."
      },
      {
        "title": "Top 50 car exports H1 FY2027: Maruti takes 51% share, Fronx and Jimny lead",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/top-50-car-exports-h1-fy2027-maruti-takes-51-share-fronx-and-jimny-lead-12559439.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/08/maruti-fronx-exports-fastest-india-2-lakh-5.jpg",
        "why": "Exports rose only 1.25% to 4.51 lakh units, but Maruti grew 12%; e Vitara exports jumped 261%."
      },
      {
        "title": "Mahindra Vision S design patented: new SUV launch likely in 2027",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/mahindra-vision-s-design-patented-new-suv-launch-likely-in-2027-12558245.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/Mahindra-Vision-S-Design-Patented-10.jpg",
        "why": "The last of four NU_IQ Vision concepts to be patented: an upright, Jimny-rivalling sub-4m monocoque SUV."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Mistral boss and Yann LeCun back Swiss robotics startup Enact in $30M pre-seed round",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/10/22/mistral-boss-and-yann-lecun-back-swiss-robotics-startup-enact-in-30m-pre-seed-round/",
        "img": "https://cdn.tech.eu/uploads/2026/10/enact-708.png",
        "why": "Enact builds general-purpose robot tech that relies on force and touch sensing rather than mainly cameras."
      },
      {
        "title": "Anglo-Finnish Oxford University quantum spinout QuantrolOx raises €12M",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/10/22/anglo-finnish-oxford-university-quantum-spinout-raises-eur12m/",
        "img": "https://cdn.tech.eu/uploads/2026/10/smart-2-516.jpg",
        "why": "Its software automates tuning and control of quantum computers, a bottleneck; IW Capital led the Series A."
      },
      {
        "title": "SpaceX alum's aviation startup, Reliable Robotics, lands $115M, topping $1B valuation",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/20/spacex-alums-aviation-startup-reliable-robotics-lands-115m-topping-1b-valuation/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/Autonomous-Flight_820-Autoland_2026-09.jpg",
        "why": "Retrofit autonomous flight for existing aircraft; first FAA certification expected in 18 to 24 months."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "From Even Health to The Pant Project: Indian startups raised over $184 Mn this week",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/from-even-health-to-the-pant-project-indian-startups-raised-over-184-mn-this-week/",
        "img": "https://asset.inc42.com/2026/10/FG_Oct-23-Soc-100.jpg",
        "why": "17 deals, with funding down 22% week on week; AI startup Different raised a $48 Mn seed round."
      },
      {
        "title": "Blacksmith raises $66 Mn at $1 Bn valuation led by Sequoia",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/blacksmith-raises-66-mn-at-1-bn-valuation-led-by-sequoia-12696481",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/08/13/blacksmith-2026-08-13-10-23-10.png",
        "why": "The 2024-founded CI and code-testing platform says ARR grew 17x since January; over 10,000 companies use it."
      },
      {
        "title": "Mygate, Adonmo set to merge; Eternal to hold 4.4% stake in combined entity",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/mygate-adonmo-set-to-merge-eternal-to-hold-44-stake-in-combined-entity-12695913",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/21/adonmo-mygate-eternal-2026-10-21-16-53-50.png",
        "why": "Eternal swaps its Adonmo holding for a Rs 156 crore Mygate stake; Mygate's FY26 turnover rose 34%."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "AU Small Finance Bank Q2FY27 result: Net profit jumps 53% to ₹858 crore",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/au-small-finance-bank-q2fy27-result-net-profit-jumps-53-to-858-crore-126102400743_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-04/27/thumb/fitandfill/1200X628/1777291070-0818.jpg",
        "why": "Net interest income rose 32% and gross NPAs fell to 1.99% from 2.41%."
      },
      {
        "title": "JK Cement Q2FY27 result: Profit rises 6.3% to ₹169 cr; revenue jumps 23.7%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/jk-cement-q2fy27-result-profit-rises-6-3-pc-to-rs-169-cr-126102400740_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/24/thumb/fitandfill/1200X628/1792841266-8595.jpg",
        "why": "Grey cement volume rose 21%; the board approved a ₹130 crore paint plant in Telangana."
      },
      {
        "title": "MCA extends annual filing deadlines, waives extra fees for FY26 filings",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/finance/news/mca-extends-annual-filing-deadlines-waives-extra-fees-for-fy26-filings-126102401098_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2021-06/02/thumb/fitandfill/1200X628/1622572536-5553.jpg",
        "why": "Financial statements now due 31 Dec and annual returns 31 Jan, after glitches on the MCA-21 V3 portal."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Fri 30 Oct",
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
  "note": "Sunday's Australian GP was cancelled for low visibility, so no race winner; Marc Marquez leaves Phillip Island 10 points ahead of Jorge Martin on Sprint points. WorldSBK's 2026 season has ended.",
  "source": {
    "name": "Crash.net, updated 2026 MotoGP calendar",
    "url": "https://www.crash.net/motogp/news/1091546/1/updated-2026-motogp-schedule-full-after-qatar-postponement"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 3,
  "km": "6.2",
  "latest": {
    "date": "25 Oct",
    "km": "2.1",
    "pace": "8:41"
  }
};

const MUSIC = {
  "song": {
    "title": "Gosh",
    "artist": "Jamie xx",
    "id": "79Jl8KMvmnXedTjjW6pJan",
    "why": "The opening track of Jamie xx's 2015 solo debut In Colour: UK rave nostalgia that sits next to your Fred again.. plays."
  },
  "playlist": {
    "name": "Weekly Discovery Mix",
    "url": "https://open.spotify.com/playlist/4dGNwkanrYF7nnKUPk52nX",
    "date": "2026-10-26"
  },
  "lately": [
    "Fred again..",
    "Outkast",
    "Marshmello",
    "Jake Antonio",
    "X CLUB.",
    "Basement Jaxx"
  ]
};

const LEARN = {
  "term": "The golden ratio: use and myth",
  "body": "The golden ratio φ ≈ 1.618 is the proportion where the whole is to the larger part as the larger part is to the smaller, (1+√5)/2, and ratios of consecutive Fibonacci numbers converge on it. Many famous claims are post-hoc fitting: the Parthenon, the Mona Lisa and modern logos only 'match' once you choose convenient measuring points, and the nautilus shell is a logarithmic spiral whose growth rate is not φ. Fechner's 19th-century preference tests seemed to favour golden rectangles, but later studies have not reliably reproduced a special preference over nearby ratios. Where φ earns its place is as a deliberate proportion system, as in Le Corbusier's Modulor, giving a family of related sizes rather than a magic number. In practice √2 (the ISO A-paper ratio), simple ratios like 3:2 and a strict grid do the same job, so pick a system for consistency, then let function and ergonomics override it.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "1.618",
        "note": "Whole : large part = large : small."
      },
      {
        "label": "Fibonacci",
        "note": "Consecutive-term ratios converge on φ."
      },
      {
        "label": "Myth",
        "note": "Parthenon, nautilus: fitted after the fact."
      },
      {
        "label": "System",
        "note": "Useful as one proportion system among many.",
        "hl": true
      }
    ],
    "caption": "φ is a tool for consistency, not a law of beauty."
  },
  "source": {
    "name": "Wikipedia: Golden ratio",
    "url": "https://en.wikipedia.org/wiki/Golden_ratio"
  },
  "past": [
    "Draft angles and the parting line",
    "Surface continuity: G0 to G3"
  ]
};

const DESIGN = {
  "name": "Braun SK 4 radio-phonograph",
  "designer": "Dieter Rams and Hans Gugelot",
  "year": "1956",
  "why": "It replaced the wooden radio cabinet with white-painted sheet steel, wooden end panels and a clear acrylic lid, so the controls and turntable are laid out like a clean diagram you can read at a glance. That transparent lid, nicknamed 'Snow White's Coffin', set the language of rational, quiet product design that shaped Braun for decades.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/1956_Braun_Phonosuper_SK4_Schneewittchensarg.JPG?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:1956_Braun_Phonosuper_SK4_Schneewittchensarg.JPG"
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
