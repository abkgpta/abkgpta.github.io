// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "28 Nov 2026, 6:57 AM IST";

const QUOTE = {
  "text": "If you can design one thing, you can design everything.",
  "author": "Massimo Vignelli"
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
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Marc Marquez announces retirement from MotoGP",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/11/27/marc-marquez-announces-retirement-from-motogp/1268528",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/27/6b621185-16d9-479a-8300-827e355ff987/RD21_Portimao_2026-04406-1-.jpg?width=1200&height=630",
        "why": "The eight-time premier-class champion, level with Agostini's record, retires as reigning champion; Valencia is his final weekend."
      },
      {
        "title": "Royal Enfield Himalayan 750 launched from Rs 4.89 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/royal-enfield-himalayan-750-launched-from-rs-489-lakh-441443",
        "img": "https://asset.autocarindia.com/static/news/images/20261127_141046_998311bd.jpg",
        "why": "Introductory prices run Rs 4.89–6.29 lakh across three variants; bookings open countrywide on December 1."
      },
      {
        "title": "Harley-Davidson turns 17 in India with Mission: The Big RIDE",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/the-big-ride-harley-davidson-india-plans-12562220.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/Artie-Starrs-Pawan-Munjal.jpeg",
        "why": "A new plan with Hero MotoCorp; the Hero-built X range has sold over 50,000 units, with new dealerships planned."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "New Mini Cooper SE launched at Rs 53.9 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/new-mini-cooper-se-launched-at-rs-539-lakh-441433",
        "img": "https://asset.autocarindia.com/static/news/images/20261127_080619_3b354e6c.png",
        "why": "The second-gen EV gets a 54.2kWh battery and 402km WLTP range; deliveries start in December."
      },
      {
        "title": "Stellantis plans further European factory halts amid rising competition",
        "source": "Just Auto",
        "url": "https://www.just-auto.com/news/stellantis-plans-further-european-factory-halts/",
        "img": "https://www.just-auto.com/wp-content/uploads/sites/30/2026/11/shutterstock_2827268783.jpg",
        "why": "Mulhouse and Rennes pause over the holidays and about 500 temporary Sochaux jobs go, citing weak demand and Chinese rivals."
      },
      {
        "title": "Toyota Innova Hycross facelift launched at Rs 19.59 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/toyota-innova-hycross-facelift-launched-at-rs-1959-lakh-441417",
        "img": "https://asset.autocarindia.com/static/news/images/20261125_131847_7b49a243.jpg",
        "why": "The mid-life update adds E85 flex-fuel capability, making it India's only strong-hybrid flex-fuel vehicle on sale."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Neuralink receives FDA approval for 'pivotal' brain implant trial in ALS patients",
        "source": "Engadget",
        "url": "https://www.engadget.com/2329008/neuralink-receives-fda-approval-for-brain-implant-trial-in-als-patients/",
        "img": "https://www.engadget.com/img/gallery/neuralink-receives-fda-approval-for-pivotal-brain-implant-trial-in-als-patients/l-intro-1795677911.jpg",
        "why": "The FDA authorised the first US pivotal trial of an implantable brain-computer interface."
      },
      {
        "title": "Firms set up memory chip 'war rooms' as some prices jump 10x",
        "source": "The Next Web",
        "url": "https://thenextweb.com/news/memory-shortage-war-rooms-musk-samsung-wsj",
        "img": "https://media.thenextweb.com/2026/10/circuit-board-processor-chip-macro.jpg",
        "why": "The shift to HBM is squeezing memory supply; dozens of phone models in India rose Rs 1,000–4,000."
      },
      {
        "title": "European quantum community reacts to new quantum strategy",
        "source": "The Quantum Insider",
        "url": "https://thequantuminsider.com/2026/11/26/european-quantum-community-reacts-to-new-quantum-strategy/",
        "img": "https://thequantuminsider.com/wp-content/uploads/2026/11/1x3li7tgf6o-1.jpg",
        "why": "The EU proposed a Quantum Act to commercialise research, secure supply chains and coordinate post-quantum migration."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Finnable raises INR 405 Cr Series C to expand formal credit",
        "source": "Entrepreneur India",
        "url": "https://india.entrepreneur.com/business-news/finnable-raises-inr-405-cr-series-c-to-expand-formal-credit",
        "img": "https://india.entrepreneur.com/wp-content/uploads/sites/5/2026/11/team_finnable_309e51b294.png",
        "why": "The Bengaluru lender's round adds Bharat Value Fund and NKSquared; AUM is above Rs 4,600 Cr."
      },
      {
        "title": "GEF Capital Partners announces first close of India Climate Fund IV at $615 Mn",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/gef-capital-partners-announces-first-close-of-india-climate-fund-iv-at-615-mn/",
        "img": "https://asset.inc42.com/2026/11/neogeo-funding-social-.jpg",
        "why": "The first close beat target, about 40% larger than the prior $440 Mn fund, for mid-market cleantech."
      },
      {
        "title": "Exclusive: Namma Yatri raises Rs 27.25 Cr led by Michael & Susan Dell Foundation",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-namma-yatri-raises-rs-2725-cr-led-by-michael-susan-dell-foundation-12844724",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/27/namma-yatri-2026-11-27-09-43-41.png",
        "why": "The zero-commission ride-hailing app's pre-Series A values it at an estimated ~Rs 526 Cr post-money."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "India-U.S. trade deal is nearing completion, minister says",
        "source": "Reuters via BNN Bloomberg",
        "url": "https://www.bnnbloomberg.ca/tariffs/2026/11/27/india-us-trade-deal-is-nearing-completion-minister-says/",
        "img": "https://www.bnnbloomberg.ca/resizer/v2/NQ3NFJWM4CMIIK2IWAL3TGEACM.jpg?smart=true&auth=aec77c83f7dabd4880ea9aa3fa34fbc066a806dbc494d9f5a814226f550dd42d&width=1200&height=630",
        "why": "Goyal says the deal is close; USTR says tariffs on Indian imports would be capped at 17% rather than 25%."
      },
      {
        "title": "RBI lets rupee rise to break one-way bets on further depreciation",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/finance/news/rbi-lets-rupee-rise-to-break-one-way-bets-on-further-depreciation-126112700277_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/04/thumb/fitandfill/1200X628/1793780659-2742.JPG",
        "why": "With foreign inflows back, RBI is letting the rupee strengthen instead of rebuilding reserves."
      },
      {
        "title": "Global brands move Bangladesh orders worth millions to India amid unrest",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/industry/news/global-brands-move-bangladesh-orders-worth-millions-to-india-amid-unrest-126112700649_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-12/03/thumb/featurecrop/1200X628/1764752140-0328.JPG",
        "why": "Zara, H&M and M&S diverted about $254M of garment orders from Bangladesh in early November, mostly to India."
      }
    ]
  },
  {
    "topic": "Design & manufacturing",
    "stories": [
      {
        "title": "Researchers turn your arm into a smartwatch trackpad",
        "source": "Core77",
        "url": "https://www.core77.com/posts/146018/Researchers-Figure-Out-How-to-Turn-Your-Arm-Into-a-Smartwatch-Trackpad",
        "img": "https://s3files.core77.com/blog/images/lead_n_spotlight/1858326_lead_400_146018_.jpg",
        "why": "NC State's EpiPad uses a 4mm x 5mm wrist radar to track finger presses on the forearm, for under $10."
      },
      {
        "title": "5 things to know about Autodesk's Q3 FY27 results",
        "source": "Autodesk News",
        "url": "https://adsknews.autodesk.com/en/news/5-things-to-know-autodesk-q3fy27-results/",
        "img": "https://adsknews.autodesk.com/app/uploads/2026/11/Earnings-thumbnailQ3.png",
        "why": "Revenue rose 17% to $2.16B, beating guidance, and Autodesk raised its full-year revenue outlook."
      },
      {
        "title": "This stainless steel cube unfolds into a camping stove",
        "source": "Core77",
        "url": "https://www.core77.com/posts/146010/This-Stainless-Steel-Cube-Unfolds-Into-a-Camping-Stove",
        "img": "https://s3files.core77.com/blog/images/lead_n_spotlight/1858219_lead_400_146010_.jpg",
        "why": "Kovea's Container Stove unfolds into a wind-resistant burner that holds pots up to 22 cm and stores its canister."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Wed 2 Dec",
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
      "when": "27–29 Nov (race Sun 2:00 PM local)",
      "what": "MotoGP: Valencian GP, Ricardo Tormo (season finale)"
    },
    {
      "when": "1 Dec 2026",
      "what": "MotoGP: Valencia Test, first official run of the 850cc 2027 bikes"
    },
    {
      "when": "19–21 Feb 2027",
      "what": "WorldSBK: Australian Round, Phillip Island (season opener)"
    },
    {
      "when": "5–7 Mar 2027",
      "what": "MotoGP: Thai GP, Buriram (season opener)"
    }
  ],
  "note": "Champion Marc Marquez announced before FP1 that Valencia is his last Grand Prix, then topped Friday Practice with a lap record of 1'28.483, ahead of Bezzecchi and Ogura.",
  "source": {
    "name": "motogp.com: Valencia Friday report",
    "url": "https://www.motogp.com/en/news/2026/11/27/marc-marquez-sets-new-lap-record-in-final-friday-of-motogp-career-in-valencia/1268364"
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
    "title": "Vacuum Boogie",
    "artist": "Floating Points",
    "id": "5xKb4N3I7NKmDy899KMTJr",
    "why": "A wiry, synth-driven Floating Points club single, in the same restless electronic lane as the Fred again.. and Mall Grab in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Explorations",
    "url": "https://open.spotify.com/playlist/0bjn5wWlxFPY44ColrnZPc",
    "date": "2026-11-23"
  },
  "lately": [
    "Fred again..",
    "SOFY",
    "Chris Lorenzo",
    "bakker",
    "TWOFACED",
    "Calvin Harris"
  ]
};

const LEARN = {
  "term": "Tolerance stack-up: worst case vs RSS",
  "body": "A tolerance stack-up adds the tolerances of every part in a dimensional chain to predict the variation of one critical feature, such as a shut line, a button's travel or a snap-fit's engagement. The worst-case method sums all tolerances arithmetically, guaranteeing fit for every combination of parts but forcing tight, expensive tolerances as the chain grows. The root-sum-square (RSS) method takes the square root of the sum of the squared tolerances, assuming independent, normally distributed and centred processes, so four parts at ±0.1 mm stack to ±0.2 mm instead of ±0.4 mm. RSS is often oversold: it breaks down when processes drift off-centre, when the chain is short, or when errors are correlated, as with parts from one mould cavity, so engineers add a correction factor or run a Monte Carlo simulation. For designers the real lever is shortening the chain: locate a visible gap from a datum on as few parts as possible, so fewer tolerances accumulate where the eye can see them.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Chain",
        "note": "List every dimension between the two faces"
      },
      {
        "label": "Worst",
        "note": "Add them: 4 × ±0.1 = ±0.4 mm"
      },
      {
        "label": "RSS",
        "note": "√Σt²: 4 × ±0.1 ≈ ±0.2 mm",
        "hl": true
      },
      {
        "label": "Datum",
        "note": "Fewer links where the gap is visible"
      }
    ],
    "caption": "Fewer links in the chain, smaller visible gap."
  },
  "source": {
    "name": "Wikipedia: Tolerance analysis",
    "url": "https://en.wikipedia.org/wiki/Tolerance_analysis"
  },
  "past": [
    "Fitts's law for physical controls",
    "Form hierarchy: primary, secondary, tertiary",
    "Natural mapping: controls that explain themselves",
    "Poka-yoke: designing out mistakes",
    "The Bauhaus: what it actually taught"
  ]
};

const DESIGN = {
  "name": "Honda Super Cub C100",
  "designer": "Soichiro Honda and Takeo Fujisawa (concept), Jozaburo Kimura (industrial design)",
  "year": "1958",
  "why": "Its step-through frame, polyethylene leg shield and automatic centrifugal clutch let anyone ride it one-handed in ordinary clothes, which turned a motorcycle into an everyday appliance. The form has barely changed because every curve does a job, and it became the best-selling motor vehicle in history.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Honda_super_cub,_1st_Gen._1958,_Left_side.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Honda_super_cub,_1st_Gen._1958,_Left_side.jpg"
  },
  "source": {
    "name": "Honda Global: Cub Stories",
    "url": "https://global.honda/en/Cub/history/stories/vol1/p1.html"
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
      "model": "Honda Alpha EV (debut)",
      "when": "2 Dec 2026",
      "price": "~₹16 lakh (expected)"
    },
    {
      "model": "JSW Combat SUV (unveil)",
      "when": "4 Dec 2026",
      "price": "₹30–50 lakh (reported est.)"
    },
    {
      "model": "Italjet Dragster 300",
      "when": "4–5 Dec 2026 (India Bike Week)",
      "price": "TBA"
    },
    {
      "model": "Volkswagen Virtus facelift",
      "when": "11 Dec 2026",
      "price": "₹10.7–19.2 lakh (current range)"
    },
    {
      "model": "Hyundai Ioniq P",
      "when": "16 Jan 2027",
      "price": "₹9.8–13 lakh (est.)"
    },
    {
      "model": "Hero Xpulse 450",
      "when": "Early 2027",
      "price": "~₹3 lakh (est.)"
    }
  ],
  "source": {
    "name": "Business Today / Autocar India",
    "url": "https://businesstoday.in/latest/trends/photo/december-car-launches-new-fortuner-honda-alpha-ev-jsw-combat-and-the-one-you-can-actually-buy-567675-2026-11-17"
  }
};
