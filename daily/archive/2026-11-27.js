// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "27 Nov 2026, 6:55 AM IST";

const QUOTE = {
  "text": "Imagination is more important than knowledge.",
  "author": "Albert Einstein"
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
    "topic": "Automotive",
    "stories": [
      {
        "title": "JLR wins EU ban on BYD's alleged copycat Land Rover Defender",
        "source": "WardsAuto",
        "url": "https://www.wardsauto.com/news/jlr-wins-eu-ban-on-byds-alleged-copycat-land-rover-defender/875438/",
        "img": "https://imgproxy.divecdn.com/aulrsaI1BPI3iHDIhS4Oh_GoXL-uo9LW2yDaCBM8XaI/g:ce/rs:fit:770:435/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9CWURUaTdTVVYyMDI2LmpwZw==.webp",
        "why": "A Hague court ruled BYD's Ti7 copies the Defender and barred it from the EU; BYD will appeal."
      },
      {
        "title": "New Honda Alpha EV teaser previews front-end design",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/new-honda-alpha-ev-teaser-previews-front-end-design-441424",
        "img": "https://asset.autocarindia.com/static/news/images/20261126_113404_75586764.png",
        "why": "Honda's first midsize electric SUV for India, based on the 0 Alpha prototype, debuts on December 2."
      },
      {
        "title": "Hyundai Ioniq P EV to debut on January 16",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/hyundai-ioniq-p-ev-to-debut-on-january-16-441421",
        "img": "https://asset.autocarindia.com/static/news/images/20261126_075440_dc5c7e99.jpg",
        "why": "Hyundai's first compact EV for India gets a firm date; prices may come at Auto Expo 2027."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "BMW M 1000 RR launched in India at Rs 59.90 lakh",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/bmw-m-1000-rr-india-launch-price-rs-59-90-lakh-218-hp-300-kmph-12562122.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/BMW-M-1000-RR-india-launch-price-4.jpg",
        "why": "The WorldSBK-derived superbike arrives as a CBU with 218 hp, M Winglets 3.0 and the M Competition Package standard."
      },
      {
        "title": "Honda is betting big on Brazil: vast factory targets capacity for 2.3 million bikes a year",
        "source": "Visordown",
        "url": "https://www.visordown.com/news/honda-betting-big-brazil-vast-factory-targets-capacity-23-million-bikes-year",
        "img": "https://www.visordown.com/sites/default/files/2026-11/honda-brazil-01.jpg",
        "why": "A R$3.3bn investment lifts Manaus capacity from 1.6 to 2.3 million bikes a year by 2029."
      },
      {
        "title": "Bagnaia sidelined from Valencia, Lecuona to stand in",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/11/25/bagnaia-sidelined-from-valencia-lecuona-to-stand-in/1268169",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/25/d910fb66-77ec-4b1a-9873-86bbc8dfa625/_DS_2127.jpg",
        "why": "A foot injury from Qatar means Bagnaia misses his final Ducati race before joining Aprilia."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Nvidia halts shipments of AI servers to four Southeast Asian countries",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/world-news/nvidia-halts-shipments-of-ai-servers-to-four-southeast-asian-countries-126112601562_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/26/thumb/fitandfill/1200X628/1795712939-0843.jpg",
        "why": "New US export curbs halt servers to Malaysia, Singapore, Thailand and Indonesia, aiming to close routes to China."
      },
      {
        "title": "IQM to deploy 54-qubit quantum computer at South Korean data centre",
        "source": "The Quantum Insider",
        "url": "https://thequantuminsider.com/2026/11/25/iqm-deploy-54-qubit-quantum-computer-south-korea-data-centre",
        "img": "https://thequantuminsider.com/wp-content/uploads/2026/11/2026-11-25_23-06.png",
        "why": "IQM's first system in a private Asian data centre will run alongside GPUs as quantum-as-a-service."
      },
      {
        "title": "Agnit aims to wrap up chip pilots soon, says CEO Hareesh Chandrasekar",
        "source": "Business Standard",
        "url": "https://business-standard.com/companies/people/agnit-semiconductors-expects-2-3-gan-chip-projects-to-scale-up-soon-126112601500_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/26/thumb/fitandfill/1200X628/1795709743-6216.jpg",
        "why": "The IISc-incubated GaN chip startup has seven strategic-sector pilots; two or three may scale to volume within months."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Green Aero raises $14 Mn led by Crane Ventures",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/green-aero-raises-14-mn-led-by-crane-ventures-12842280",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2025/07/09/green-aero-2025-07-09-11-43-25.png",
        "why": "A Series A for jet engines for high-speed drones and combat aircraft, after 100+ ground-fire tests."
      },
      {
        "title": "GIVA raises Rs 90 Cr from BlackSoil for retail expansion",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/giva-raises-rs-90-cr-from-blacksoil-for-retail-expansion-12842327",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/03/giva-2026-11-03-16-14-04.png",
        "why": "Its second raise in November, this time debt, to fund store capex across 400+ stores."
      },
      {
        "title": "Exclusive: Univest to raise Rs 75 Cr at Rs 1,500 Cr valuation",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-univest-to-raise-rs-75-cr-at-rs-1500-cr-valuation-12840305",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/25/univest-financial-team-portrait-2026-11-25-16-00-05.png",
        "why": "Sources say the valuation is about 2.4x its last, with ARR near Rs 230 crore."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "APL Apollo deal: working on stakeholders' concerns, says Tata Steel CEO",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/working-on-issues-raised-by-both-stakeholders-says-tata-steel-ceo-126112501216_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/18/thumb/fitandfill/1200X628/1795013578-5319.jpg",
        "why": "Tata Steel weighs shareholder concerns over its ₹28,000-crore tubes deal after sharp share falls on both sides."
      },
      {
        "title": "NSE share price rallies 9% in two days; market capitalisation nears ₹6 trn",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/nse-share-price-rallies-9-in-two-days-market-capitalisation-nears-6-trn-126112600195_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-07/06/thumb/fitandfill/1200X628/1751820375-8099.jpg",
        "why": "NSE hit a record ₹2,400, passing L&T in market value, 34% above its ₹1,785 IPO price."
      },
      {
        "title": "Govt picks BSNL, MTNL assets worth ₹1,300 crore for monetisation",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/govt-picks-bsnl-mtnl-assets-worth-1-300-crore-for-monetisation-126112601034_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/26/thumb/fitandfill/1200X628/1795694905-5259.jpg",
        "why": "NLMC targets ₹15,000 crore of CPSE asset sales this fiscal year to cut debt."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Fri 27 Nov",
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
    "day": "Sat 28 Nov",
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
    "day": "Sun 29 Nov",
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
    "day": "Mon 30 Nov",
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
    "day": "Tue 1 Dec",
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
      "when": "27–29 Nov (race Sun 6:30 PM IST)",
      "what": "MotoGP: Valencian GP, Ricardo Tormo (season finale)"
    },
    {
      "when": "19–21 Feb 2027",
      "what": "WorldSBK: Australian Round, Phillip Island (provisional)"
    },
    {
      "when": "5–7 Mar 2027",
      "what": "MotoGP: Thailand GP, Buriram (season opener)"
    },
    {
      "when": "12–14 Mar 2027",
      "what": "MotoGP: Qatar GP, Lusail"
    }
  ],
  "note": "Finale weekend starts today. Marquez is already champion; Martin and Bezzecchi are 2 points apart for P2, and Ducati trail Aprilia by 9 for constructors. Bagnaia is out injured, Lecuona stands in.",
  "source": {
    "name": "motogp.com: Valencia preview",
    "url": "https://www.motogp.com/en/news/2026/11/25/hot-headlines-valencia-brings-the-fireworks-for-sold-out-finale/1268061"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 4,
  "km": "18.0",
  "latest": {
    "date": "22 Nov",
    "km": "11.0",
    "pace": "8:27"
  }
};

const MUSIC = {
  "song": {
    "title": "Offshore",
    "artist": "Chicane",
    "id": "3HofSXf406PxfUu1p3IUWV",
    "why": "Chicane's 1996 Balearic trance debut, the same sunset-euphoric lane as the Energy 52 and Three Drives in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Explorations",
    "url": "https://open.spotify.com/playlist/0bjn5wWlxFPY44ColrnZPc",
    "date": "2026-11-23"
  },
  "lately": [
    "Joey Valence & Brae",
    "Three Drives On A Vinyl",
    "Daft Punk",
    "Paul van Dyk",
    "Nalin & Kane",
    "Energy 52"
  ]
};

const LEARN = {
  "term": "Fitts's law for physical controls",
  "body": "Fitts's law (Paul Fitts, 1954) predicts the time to hit a target as MT = a + b·log2(D/W + 1) in the Shannon form popularised by MacKenzie, where D is the distance to the target and W its width along the line of motion. The log term is the index of difficulty in bits: doubling distance or halving width adds about one bit, so time grows slowly with distance but punishes small targets hard. For product designers this argues for large, close primary controls, such as a big start button or a wide trigger, and for placing frequent controls near the hand's resting position. The constants a and b are empirical and change with limb, device and user, so the law ranks layouts rather than giving absolute timings. It is often over-applied: it models aimed pointing only, not choice time (Hick's law), gloves, vibration or eyes-free use, and the 'infinite edge' trick applies to screens bounded by a cursor, not to physical panels.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "D",
        "note": "Distance from start to target centre"
      },
      {
        "label": "W",
        "note": "Target width along the line of motion"
      },
      {
        "label": "ID",
        "note": "log2(D/W + 1): difficulty in bits"
      },
      {
        "label": "MT",
        "note": "a + b·ID: predicted movement time",
        "hl": true
      }
    ],
    "caption": "Bigger and closer beats small and far, logarithmically."
  },
  "source": {
    "name": "Wikipedia: Fitts's law",
    "url": "https://en.wikipedia.org/wiki/Fitts%27s_law"
  },
  "past": [
    "Form hierarchy: primary, secondary, tertiary",
    "Natural mapping: controls that explain themselves",
    "Poka-yoke: designing out mistakes",
    "The Bauhaus: what it actually taught",
    "Wabi-sabi and designing for patina"
  ]
};

const DESIGN = {
  "name": "Citroën 2CV",
  "designer": "André Lefèbvre and Flaminio Bertoni",
  "year": "1948",
  "why": "Built to a brief of carrying four people and a basket of eggs across a ploughed field, it reduced a car to a light steel body, soft long-travel suspension and a canvas roof that rolls back. Every surface follows cost and function, yet Bertoni's simple curved panels gave it a character so strong it stayed in production until 1990.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/1955_Citroen_2CV.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:1955_Citroen_2CV.jpg"
  }
};

const FUNDING = {
  "summary": "$290M across 23 Indian startup deals, 16–21 Nov, up nearly 826% from $31.3M the week before.",
  "rounds": [
    {
      "company": "Dreamteam",
      "amount": "$53 million",
      "stage": "",
      "sector": "AI CRM"
    },
    {
      "company": "Nexon Omniverse",
      "amount": "Rs 485 crore",
      "stage": "Series E",
      "sector": "Fashion retail"
    },
    {
      "company": "Humyn Labs",
      "amount": "$47 million",
      "stage": "Series A",
      "sector": "Physical AI"
    },
    {
      "company": "Bharat Semi",
      "amount": "$24 million",
      "stage": "Seed",
      "sector": "Semiconductors"
    },
    {
      "company": "Boba Bhai",
      "amount": "$18 million",
      "stage": "",
      "sector": "Food and beverage"
    },
    {
      "company": "Henfruit",
      "amount": "$15 million",
      "stage": "Series A",
      "sector": "Branded eggs"
    }
  ],
  "source": {
    "name": "Entrackr weekly funding report",
    "url": "https://entrackr.com/report/weekly-funding-report-weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-nov-16-nov-21-12829487"
  }
};

const LAUNCHES = {
  "items": [
    {
      "model": "Royal Enfield Himalayan 750",
      "when": "27–29 Nov 2026 (Motoverse)",
      "price": "₹3.8–6 lakh (est.)"
    },
    {
      "model": "Ducati DesertX V2",
      "when": "Nov–Dec 2026",
      "price": "₹19–22 lakh"
    },
    {
      "model": "Honda Alpha EV (India debut)",
      "when": "2 Dec 2026",
      "price": "~₹16 lakh (expected)"
    },
    {
      "model": "Volkswagen Virtus facelift",
      "when": "11 Dec 2026",
      "price": "₹10.75–19.5 lakh"
    },
    {
      "model": "JSW Combat SUV",
      "when": "Dec 2026 (debut)",
      "price": "Not stated"
    },
    {
      "model": "Hyundai Ioniq P",
      "when": "16 Jan 2027",
      "price": "₹9.8–13 lakh"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming cars and bikes",
    "url": "https://www.autocarindia.com/upcoming-cars"
  }
};
