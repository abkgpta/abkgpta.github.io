// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "19 Nov 2026, 6:55 AM IST";

const QUOTE = {
  "text": "There are three responses to a piece of design: yes, no, and WOW! Wow is the one to aim for.",
  "author": "Milton Glaser"
};

const NOW = [
  {
    "name": "Celestial",
    "date": "15 Nov",
    "note": "A 3D research tool that maps a question as a solar system of topics, now with bring-your-own-key for any AI provider.",
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
    "topic": "Indian business",
    "stories": [
      {
        "title": "In first meeting since Sep 17, Tata Sons board to discuss listing next week",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/in-first-meeting-since-sep-17-tata-sons-board-to-discuss-listing-next-week-126111801431_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/18/thumb/fitandfill/1200X628/1795024716-2852.jpg",
        "why": "The board meets on 26 November; at a ₹15–18 trillion valuation the issue could be at least ₹37,500 crore."
      },
      {
        "title": "Trade deal signing after US finalises tariff architecture: Commerce secy",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/india-us-trade-deal-signing-to-await-washington-s-new-tariff-architecture-126111801141_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/18/thumb/fitandfill/1200X628/1795007810-6279.jpg",
        "why": "Signing waits on USTR tariff probes into 16 trade partners, India among them, over manufacturing excess capacity."
      },
      {
        "title": "Tata Sons board members to visit Air India HQ, review performance on Nov 19",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/tata-sons-board-members-to-visit-air-india-hq-review-performance-on-nov-19-126111801439_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-09/22/thumb/fitandfill/1200X628/1790048874-5403.png",
        "why": "Air India's loss widened to more than Rs 22,000 crore in FY2025-26; Singapore Airlines holds 25.1 per cent."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "2027 Triumph Street Triple 798 RS priced at Rs 14.39 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/2027-triumph-street-triple-798-rs-priced-at-rs-1439-lakh-441354",
        "img": "https://asset.autocarindia.com/static/news/images/20261117_130055_157d6b9a.jpg",
        "why": "The new 798cc triple makes 135hp and 86Nm and weighs 5kg less than the 765 RS it replaces."
      },
      {
        "title": "Dixon returns to MotoGP action with Honda at Portimao",
        "source": "WorldSBK",
        "url": "https://worldsbk.com/en/news/2026/11/18/dixon-returns-to-motogp-action-with-honda-at-portimao/1185725",
        "img": "https://resources.wsbk.pulselive.com/wsbk/photo/2026/11/18/1a6beb18-2438-4f9b-a715-951e0026c75a/_DS_0197.jpg",
        "why": "Jake Dixon replaces Joan Mir for his fourth MotoGP start, after two in 2021 on Yamaha machinery."
      },
      {
        "title": "Alex Marquez set for Portuguese GP return",
        "source": "MotoGP",
        "url": "https://www.motogp.com/en/news/2026/11/17/alex-marquez-set-for-portuguese-gp-return/1185531",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/10/31/5a43648b-2ddc-4584-96a4-0eb921743958/_DSC5563.jpg",
        "why": "Back after one round out following surgery; he had been on pole at the Malaysian GP and finished P3."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Tata Group draws interest from Honda, Hyundai for vehicle and technology sharing",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/tata-group-draws-interest-from-honda-hyundai-for-vehicle-and-technology-sharing-441364",
        "img": "https://asset.autocarindia.com/static/news/images/20261118_083504_6b746d16.jpeg",
        "why": "Stellantis already plans to use Tata Motors tech for vehicles in more than 50 markets."
      },
      {
        "title": "Toyota's New Small Truck Is A Corolla Cross With A Bed",
        "source": "Motor1",
        "url": "https://www.motor1.com/news/815920/toyota-corolla-deck-pickup-confirmed/",
        "img": "https://cdn.motor1.com/images/mgl/P3Vmr2/s1/toyota-corolla-deck-apresentada-em-sorocaba-sp.jpg",
        "why": "A 122hp flex-fuel hybrid pickup built at Toyota's Sorocaba 2 plant in Brazil, with 100,000 units a year of capacity."
      },
      {
        "title": "Waymo Is Banned From California Freeways After A Series Of Incidents",
        "source": "Motor1",
        "url": "https://www.motor1.com/news/815824/waymo-freeway-pause-california-ruling/",
        "img": "https://cdn.motor1.com/images/mgl/xqO2Aw/s1/waymo-jaguar-i-pace-on-freeway.jpg",
        "why": "California's DMV added a freeway restriction after three Waymos entered an active closure on US Route 101."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "China dominates battery graphite, but this startup could break the monopoly",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/18/china-dominates-battery-graphite-but-this-startup-could-break-the-monopoly/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/GettyImages-1249824774.jpg",
        "why": "Molten Industries' Oakland plant will make about 300 tons of graphite a year, using three times less electricity."
      },
      {
        "title": "Nvidia is abandoning China after Jensen Huang's ouster",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/17/nvidia-is-abandoning-china-after-jensen-huangs-ouster/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/03/jensen-huang-gtc-getty.jpg",
        "why": "Jefferies estimates the new rules could cut Nvidia's data center revenue by $44–62 billion next year."
      },
      {
        "title": "Nvidia's startup stakes ballooned to $65B, but Huang's exit puts future deals in doubt",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/17/nvidias-startup-stakes-ballooned-to-65b-but-huangs-exit-puts-future-deals-in-doubt/",
        "img": "https://techcrunch.com/wp-content/uploads/2024/11/GettyImages-2150167239.jpg",
        "why": "Its private stakes are worth $65.5 billion, up from $22 billion reported in January."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "India's Humyn Labs raises $47M to feed U.S. robotics companies the data they need",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/18/accel-backs-indias-humyn-labs-to-supply-training-data-needed-by-u-s-robotics-ai-developers/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/humyn-labs-co-founders_164602.jpg",
        "why": "A $47M Series A for the Bengaluru team, which already has 12 paying customers including frontier AI labs."
      },
      {
        "title": "Goldman Sachs leads $280M funding round in Payhawk",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/18/goldman-sachs-leads-280m-funding-round-in-payhawk/",
        "img": "https://cdn.tech.eu/uploads/2022/02/payhawk-838.png",
        "why": "The Series C values the spend-management startup at $2bn, double its 2022 valuation."
      },
      {
        "title": "Circular economy startup Recove Ventures raises Rs 56.25 Cr through equity and debt",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/circular-economy-startup-recove-ventures-raises-rs-5625-cr-through-equity-and-debt-12818941",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/18/02-2026-11-18-09-53-38.png",
        "why": "Rs 36.25 crore equity plus Rs 20 crore debt; its annualised revenue run-rate has crossed Rs 40 crore."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Thu 19 Nov",
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
    "day": "Fri 20 Nov",
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
    "day": "Sat 21 Nov",
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
    "day": "Sun 22 Nov",
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
    "day": "Mon 23 Nov",
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
      "when": "20–22 Nov, race 6:30 PM IST",
      "what": "MotoGP: Portuguese GP, Portimão"
    },
    {
      "when": "27–29 Nov",
      "what": "MotoGP: Valencia GP, season finale"
    },
    {
      "when": "19–21 Feb 2027",
      "what": "WorldSBK: Australian Round, Phillip Island (provisional)"
    },
    {
      "when": "19–21 Mar 2027",
      "what": "WorldSBK: Portuguese Round, Portimão (provisional)"
    }
  ],
  "note": "Match point for Marc Marquez: 60 clear of Martin, he is champion if he leaves Portimão 37+ points ahead. Sprint Sat 8:30 PM IST. Dixon replaces Mir; Alex Marquez returns.",
  "source": {
    "name": "motogp.com: Portuguese GP time schedule",
    "url": "https://www.motogp.com/en/news/2026/11/16/time-schedule-repsol-grand-prix-of-portugal/1185224"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 3,
  "km": "7.4",
  "latest": {
    "date": "17 Nov",
    "km": "2.2",
    "pace": "7:09"
  }
};

const MUSIC = {
  "song": {
    "title": "Phantom Ratio",
    "artist": "Ross from Friends",
    "id": "0OtNt80MQEMcz11wopMhjk",
    "why": "Hazy, melodic UK house from Ross from Friends' Epiphany, in the same lane as the Bicep and Four Tet you've had on repeat."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Vibes",
    "url": "https://open.spotify.com/playlist/6DBd39F9ldE7pnHr21inpL",
    "date": "2026-11-16"
  },
  "lately": [
    "BICEP",
    "Four Tet",
    "Floating Points",
    "Fred again..",
    "KETTAMA",
    "Elkka"
  ]
};

const LEARN = {
  "term": "Snap-fit cantilever design",
  "body": "A cantilever snap-fit is a short beam with a hook that bends as it passes a mating lip and springs back behind it, and the design limit is strain at the root, not force. For a constant rectangular section, root strain is roughly ε = 1.5·t·y / L², where t is beam thickness, y the deflection needed to clear the lip and L the beam length, so doubling length cuts strain to a quarter while doubling thickness doubles it. That strain must stay below the material's permissible strain for the intended number of cycles, and a generous root fillet matters because a sharp corner multiplies the local stress; tapering the beam toward the tip also spreads strain more evenly along its length. The return-face angle decides whether the joint is releasable or permanent, and the common claim that snap-fits make fasteners free is overstated: the hook is an undercut that needs a side action, a lifter or a through-hole in the part, and creep and fatigue limit how often it can be opened.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Deflect",
        "note": "Hook bends as it rides over the lip"
      },
      {
        "label": "Strain",
        "note": "ε ≈ 1.5·t·y / L² at the root",
        "hl": true
      },
      {
        "label": "Root",
        "note": "Fillet and taper spread the strain"
      },
      {
        "label": "Retain",
        "note": "Return angle: releasable or permanent"
      }
    ],
    "caption": "Size the beam by root strain, then shape the hook."
  },
  "source": {
    "name": "Wikipedia: Snap-fit",
    "url": "https://en.wikipedia.org/wiki/Snap-fit"
  },
  "past": [
    "Uniform wall thickness and sink marks",
    "Undercuts, shutoffs and side actions",
    "Le Corbusier's Modulor",
    "Kansei engineering",
    "The Ulm School (HfG Ulm)"
  ]
};

const DESIGN = {
  "name": "Mini (Morris Mini-Minor)",
  "designer": "Alec Issigonis",
  "year": "1959",
  "why": "Turning the engine sideways over a front-wheel-drive gearbox and pushing the small wheels to the corners gave about 80 percent of a car only three metres long over to people and luggage. The form follows that package so directly that its short overhangs, upright glasshouse and visible seams became an identity rather than a styling exercise.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Morris_Mini-Minor_1959_(621_AOK).jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Morris_Mini-Minor_1959_(621_AOK).jpg"
  }
};

const FUNDING = {
  "summary": "$31.3M across 12 Indian startups, 9–14 Nov, down nearly 88% from $258.1M the week before.",
  "rounds": [
    {
      "company": "Greenjoules",
      "amount": "Rs 150 crore",
      "stage": "Series B",
      "sector": "Biofuels"
    },
    {
      "company": "Olyv",
      "amount": "Rs 57.62 crore",
      "stage": "Series C",
      "sector": "Lending"
    },
    {
      "company": "Desible.ai",
      "amount": "Rs 32 crore",
      "stage": "",
      "sector": "AI"
    },
    {
      "company": "Froncort.AI",
      "amount": "$2.3 million",
      "stage": "",
      "sector": "Health AI"
    },
    {
      "company": "mistEO",
      "amount": "Rs 18 crore",
      "stage": "Seed",
      "sector": "Climate data"
    },
    {
      "company": "Rigi",
      "amount": "Rs 10 crore",
      "stage": "",
      "sector": "Creators"
    }
  ],
  "source": {
    "name": "Entrackr weekly funding report",
    "url": "https://entrackr.com/report/funding-and-acquisitions-in-indian-startups-this-week-nov-09-nov-14-12808553"
  }
};

const LAUNCHES = {
  "items": [
    {
      "model": "Toyota Innova Hycross facelift",
      "when": "25 Nov 2026",
      "price": "₹19.5–27.5 lakh"
    },
    {
      "model": "Mini Cooper SE (2nd gen)",
      "when": "27 Nov 2026",
      "price": "₹50 lakh"
    },
    {
      "model": "Royal Enfield Himalayan 750",
      "when": "Nov 2026",
      "price": "₹5.25–6 lakh"
    },
    {
      "model": "Ducati DesertX V2",
      "when": "Nov 2026",
      "price": "₹19–22 lakh"
    },
    {
      "model": "Hyundai Compact EV",
      "when": "Late 2026",
      "price": "₹9.8–13 lakh"
    },
    {
      "model": "Hyundai Ioniq P",
      "when": "Jan 2027",
      "price": "₹9.8–13 lakh"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming cars and bikes",
    "url": "https://www.autocarindia.com/upcoming-cars"
  }
};
