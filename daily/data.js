// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "6 Nov 2026, 6:53 AM IST";

const QUOTE = {
  "text": "Form ever follows function.",
  "author": "Louis Sullivan"
};

const NOW = [
  {
    "name": "Celestial",
    "date": "1 Nov",
    "note": "A 3D research tool that maps a question as a solar system of topics, now with a guided demo and tour.",
    "url": "https://abkgpta.github.io/celestial/"
  },
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
        "title": "Two Wheeler Sales Oct 2026: Hero, Honda, TVS, Bajaj, Suzuki, Royal Enfield",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/two-wheeler-sales-oct-2026-hero-honda-tvs-bajaj-suzuki-royal-enfield-12560495.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/06/honda-activa-sales-new-record-black.jpeg",
        "why": "Top six makers sold 29.2 lakh units, up 16.45%; Honda edged Hero by just 163 units overall."
      },
      {
        "title": "India-bound bikes and scooters from EICMA 2026",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/auto-features/india-bound-bikes-and-scooters-from-eicma-2026-441268",
        "img": "https://asset.autocarindia.com/static/features/images/20261105_110341_c4c2b162.jpg",
        "why": "Over 20 models likely for India, including the 55hp Himalayan 750 and a 46.7hp Hero Xpulse 450."
      },
      {
        "title": "Harley-Davidson Sprint 440 Cruiser revealed",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/harley-davidson-sprint-440-cruiser-revealed-441212",
        "img": "https://asset.autocarindia.com/static/news/images/20261103_100833_eee64658.jpg",
        "why": "X440-based cruiser with a 683mm seat and £4,995 UK price; India launch unlikely soon."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "M&M Q2 consolidated profit rises 25% to ₹4,588 cr on strong auto show",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/m-m-q2-consolidated-profit-rises-25-to-4-588-cr-on-strong-auto-show-126110500963_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/05/thumb/fitandfill/1200X628/1793902339-8302.jpg",
        "why": "Auto PAT jumped 55% to ₹2,388 Cr as vehicle volumes rose 26% to 330,896."
      },
      {
        "title": "Germany's EV share hits record 37% as BEVs beat gas and diesel combined",
        "source": "Electrek",
        "url": "https://electrek.co/2026/11/04/germany-electric-car-sales-record-37-percent-share/",
        "img": "https://electrek.co/wp-content/uploads/sites/3/2025/06/gas-vs-electric.png",
        "why": "94,086 BEVs registered in October, up 79.5%, in a market that grew only 1.7%."
      },
      {
        "title": "Maruti Sales Oct 2026 All Time High: Domestic 2.12 Lakh, Exports Near 50k",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/maruti-sales-oct-2026-all-time-high-domestic-2-12-lakh-exports-near-50k-12559942.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2025/08/Maruti-Grand-Vitara-New-Colours-Launched.jpeg",
        "why": "Record 2,76,120 total units, up 25%; exports rose 59% to 49,872."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Zipline hits $21.5B valuation as Walmart expands bet on drone delivery",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/05/zipline-hits-21-5b-valuation-as-walmart-expands-bet-on-drone-delivery",
        "img": "https://techcrunch.com/wp-content/uploads/2022/09/Zipline-Package-Drop.jpg",
        "why": "Raised $1.5B; a new Walmart deal adds 300 drone delivery sites to today's 21."
      },
      {
        "title": "A YC startup is putting $1M behind five unsolved materials science problems for AI",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/05/a-yc-startup-is-putting-1m-behind-five-unsolved-materials-science-problems-for-ai",
        "img": "https://techcrunch.com/wp-content/uploads/2026/08/discoverd-materials.jpg",
        "why": "Discovered Materials offers prizes for five open problems, including a cuprate superconductivity theory."
      },
      {
        "title": "Spacetech startup Cosmoserve Space raises $6 Mn in seed round",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/spacetech-startup-cosmoserve-space-raises-6-mn-in-seed-round-12787035",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/05/comoserve-2026-11-05-20-27-14.png",
        "why": "In-orbit satellite servicing startup; total funding now over $9M."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "AI inference startup Fal doubles its valuation to $16B as demand surges",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/03/ai-inference-startup-fal-doubles-its-valuation-to-16b-as-demand-surges/",
        "img": "https://techcrunch.com/wp-content/uploads/2022/12/GettyImages-1268605503.jpg",
        "why": "$1.3B round led by Bessemer, double its $8B valuation from April."
      },
      {
        "title": "GIVA Raises ₹975 Cr Led By Multiples PE, Eyes 160 New Stores In FY27",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/giva-raises-%E2%82%B9975-cr-led-by-multiples-pe-eyes-160-new-stores-in-fy27",
        "img": "https://asset.inc42.com/2026/11/Untitled-Design-40.png",
        "why": "The jewellery brand's FY26 revenue rose to ₹865 Cr from ₹505 Cr; it has about 425 stores."
      },
      {
        "title": "Venomics AI Raises $2.7 Mn To Turn Venom Into Medicine",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/venomics-ai-raises-2-7-mn-to-turn-venom-into-medicine/",
        "img": "https://asset.inc42.com/2026/11/Venomics-Founders-SM.png",
        "why": "An IISc spinout; Speciale Invest and South Park Commons co-led the pre-seed."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Tonbo Imaging turns profitable in Q2 FY27 with Rs 23.5 Cr; shares hit 20% upper circuit",
        "source": "Entrackr",
        "url": "https://entrackr.com/fintrackr/tonbo-imaging-turns-profitable-in-q2-fy27-with-rs-235-cr-shares-hit-20-upper-circuit-12785666",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/05/tonbo-imaging-2026-11-05-13-11-55.png",
        "why": "Revenue rose to ₹183.3 Cr from ₹8.9 Cr a year ago, against a ₹9.6 Cr loss then."
      },
      {
        "title": "Amagi's Q2 FY27 profit jumps nearly 29 times to Rs 75 Cr; total income crosses Rs 500 Cr",
        "source": "Entrackr",
        "url": "https://entrackr.com/fintrackr/amagis-q2-fy27-profit-jumps-nearly-29-times-to-rs-75-cr-total-income-crosses-rs-500-cr-12786053",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/05/amagi-2026-11-05-14-55-50.png",
        "why": "Operating revenue grew 27% to ₹476 Cr, up from ₹375 Cr."
      },
      {
        "title": "LIC Q2 net profit rises 20% to ₹12,076 crore, net premium income up 16.2%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/lic-q2fy27-results-net-profit-increases-20-to-12-076-crore-126110501463_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-08/07/thumb/fitandfill/1200X628/1786098389-3318.JPG",
        "why": "Net premium income reached ₹1.47 trillion; value of new business rose 17% to ₹3,710 Cr."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Fri 6 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: brief, CAD check + colour (Plasticity mesh export AM)"
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
    "day": "Sat 7 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: renders (finals overnight on Mac)"
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
    "day": "Sun 8 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: system visuals, identity + platform screens"
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
    "day": "Mon 9 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: compile + PR (review in the evening)"
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
    "day": "Tue 10 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: OK by 10:00, merge, live before 15:30 flight"
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
  }
];

const RACING = {
  "items": [
    {
      "when": "6–8 Nov",
      "what": "MotoGP: Qatar GP, Lusail (rescheduled)"
    },
    {
      "when": "20–22 Nov",
      "what": "MotoGP: Portuguese GP, Portimão"
    },
    {
      "when": "27–29 Nov",
      "what": "MotoGP: Valencia GP, season finale"
    }
  ],
  "note": "Qatar GP at Lusail runs this weekend. Marc Marquez won the Malaysian GP on 1 Nov and leads Jorge Martin by 44 points, so he could seal the title at Qatar. WorldSBK's 2026 season has ended.",
  "source": {
    "name": "Al Jazeera, Malaysian GP report; motogp.com calendar",
    "url": "https://www.aljazeera.com/sports/2026/11/1/marquez-wins-malaysian-grand-prix-to-close-in-on-retaining-championship"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 2,
  "km": "4.1",
  "latest": {
    "date": "25 Oct",
    "km": "2.1",
    "pace": "8:41"
  }
};

const MUSIC = {
  "song": {
    "title": "Hyph Mngo",
    "artist": "Joy Orbison",
    "id": "2BTjb4H2FLh2e5zx3nI6Ul",
    "why": "Joy Orbison's 2009 debut single, a UK bass and house touchstone in the same lineage as the Overmono and Bicep tracks you've saved."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "Deftones",
    "Foster The People"
  ]
};

const LEARN = {
  "term": "Anthropometrics and the percentile myth",
  "body": "Anthropometrics is the measurement of human body dimensions, and ergonomics uses those percentile tables to size products for a target population. The familiar rule of designing from the 5th-percentile female to the 95th-percentile male only works one dimension at a time: percentiles are not additive, so someone can be 95th percentile in stature and 40th in arm reach. Gilbert Daniels' 1952 study of 4,063 US Air Force pilots found that none fell within the middle 30 percent on all ten dimensions measured, which is why the 'average user' is a design fiction. Each dimension is set by its limiting user: clearances such as door height use the large end, while reaches such as the distance to a control use the small end. Where several dimensions interact, as in a seat, a cockpit or a motorcycle's rider triangle, designers rely on adjustability, multivariate test cases and digital human models rather than a single percentile.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "95th %ile",
        "note": "Large user sets clearance and space"
      },
      {
        "label": "5th %ile",
        "note": "Small user sets reach and force"
      },
      {
        "label": "Combine",
        "note": "Each extra dimension cuts real coverage"
      },
      {
        "label": "Adjust",
        "note": "Adjustability spans the spread",
        "hl": true
      }
    ],
    "caption": "No one is average on every dimension."
  },
  "past": [
    "Design for manufacture and assembly (DFMA)",
    "Simultaneous contrast in CMF",
    "Shut lines, gap and flush",
    "Class-A surfacing and highlight lines",
    "Affordances and signifiers"
  ]
};

const DESIGN = {
  "name": "Eames Lounge Chair and Ottoman (670/671)",
  "designer": "Charles and Ray Eames",
  "year": "1956",
  "why": "Three moulded plywood shells, originally veneered in rosewood, carry leather cushions, so the structure is the expression. The shells sit on rubber shock mounts over a die-cast aluminium base, giving club-chair comfort with a fraction of the visual mass.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Eames_Lounge_Chair_-_side.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Eames_Lounge_Chair_-_side.jpg"
  }
};

const FUNDING = {
  "summary": "$115M across 28 Indian startups, 26–31 Oct, down 14% from $133.9M the week before.",
  "rounds": [
    {
      "company": "Cent",
      "amount": "$15M",
      "stage": "Series A",
      "sector": "Healthtech"
    },
    {
      "company": "Simplismart",
      "amount": "$14M",
      "stage": "",
      "sector": "AI inference"
    },
    {
      "company": "Live2.ai",
      "amount": "$14M",
      "stage": "",
      "sector": "AI marketing SaaS"
    },
    {
      "company": "Troovy",
      "amount": "$11.5M",
      "stage": "Series B",
      "sector": "E-commerce"
    },
    {
      "company": "Matiks",
      "amount": "$10M",
      "stage": "Pre-Series A",
      "sector": "Gaming"
    },
    {
      "company": "Ace Blend",
      "amount": "$9.91M",
      "stage": "Series A",
      "sector": "E-commerce"
    }
  ],
  "source": {
    "name": "Entrackr weekly funding report",
    "url": "https://entrackr.com/report/weekly-funding-report-weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-oct-26-oct-31-12770310"
  }
};

const LAUNCHES = {
  "items": [
    {
      "model": "Denza Z9 GT",
      "when": "13 Nov 2026",
      "price": "₹1.2–1.5 crore (est.)"
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
      "model": "Toyota Innova Hycross facelift",
      "when": "25 Nov 2026",
      "price": "₹20–35 lakh (est.)"
    },
    {
      "model": "Royal Enfield Himalayan 750",
      "when": "Late Nov 2026",
      "price": "₹4.50 lakh (est.)"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming car launches in November 2026; upcoming bikes",
    "url": "https://www.autocarindia.com/car-news/upcoming-car-launches-in-november-2026-441173"
  }
};

