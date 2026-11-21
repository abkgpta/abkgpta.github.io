// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "21 Nov 2026, 6:54 AM IST";

const QUOTE = {
  "text": "Simplicity is not the goal. It is the by-product of a good idea and modest expectations.",
  "author": "Paul Rand"
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
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Anthropic hits Nasdaq exchanges at $111, 33% above IPO price",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/19/anthropic-hits-nasdaq-exchanges-at-110-27-above-ipo-price",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/anthropic-opening-Getty.jpg",
        "why": "Shares opened well above the $83 IPO price, which itself was priced above the $70–78 range."
      },
      {
        "title": "Physical AI startup Humyn Labs raises $47 Mn in equity and debt",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/physical-ai-startup-humyn-labs-raises-47-mn-in-equity-and-debt-12820886",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/18/humyn-labs-2026-11-18-18-09-02.png",
        "why": "Accel-led Series A ($26M equity, $21M debt) for a Bengaluru startup building robotics training data."
      },
      {
        "title": "Disseqt AI raises $8 Mn led by Gresham House Ventures, Rahul Dravid joins round",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/disseqt-ai-raises-8-mn-led-by-gresham-house-ventures-rahul-dravid-joins-round-12822900",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/19/disseqt-2026-11-19-13-49-33.png",
        "why": "Pre-Series A for an AI governance startup, with angels from OpenAI, Salesforce and Meta."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Alex Marquez shines to top Practice on return, Martin scrapes into Q2",
        "source": "MotoGP",
        "url": "https://www.motogp.com/en/news/2026/11/20/alex-marquez-shines-to-top-practice-on-return-martin-scrapes-into-q2/1186064",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/20/a15ed872-92c1-498b-8d8c-1aa51180415b/Report-MGP-PR-PT-TOP.jpg",
        "why": "Back from surgery, Alex Marquez topped Friday at Portimão; title favourite Marc Marquez was sixth."
      },
      {
        "title": "New Bajaj Pulsar RS200 launched at Rs 1.98 lakh with USD forks, TFT and ride modes",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-bajaj-pulsar-rs200-launch-price-rs-1-98-lakh-usd-forks-tft-ride-modes-12561710.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-bajaj-pulsar-rs-200-launch-price-usd-forks-tft-display-29.jpg",
        "why": "The updated RS200 adds USD forks, a 5-inch TFT, ride modes and traction control."
      },
      {
        "title": "Harley-Davidson Sprint 440 launched in Japan at JPY 900K",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/harley-sprint-440-launch-price-jpy-900k-rs-5-26-l-100-buyback-12561634.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/harley-sprint-440-launch-in-japan-cover.jpg",
        "why": "Built on the Hero-developed X440 platform; US sales follow in spring 2027, India expected in 2027."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "BYD crosses 20,000-unit sales milestone in India",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/byd-crosses-20000-unit-sales-milestone-in-india-441387",
        "img": "https://asset.autocarindia.com/static/news/images/20261120_112139_be62fe1d.png",
        "why": "BYD doubled India sales from 10,000 in just over a year, using only imported cars."
      },
      {
        "title": "New Honda Avancier SUV debuts brand's next-gen hybrid system",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/new-honda-avancier-suv-debuts-brands-next-gen-hybrid-system-441389",
        "img": "https://asset.autocarindia.com/static/news/images/20261120_113714_fadff451.jpg",
        "why": "The second-gen three-row Avancier is the first Honda on its next-gen hybrid platform, with dual-motor AWD."
      },
      {
        "title": "Range Rover GT EV debut confirmed for early 2027",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/range-rover-gt-ev-launch-confirmed-for-early-2027-441383",
        "img": "https://asset.autocarindia.com/static/news/images/20261120_072921_abd928d0.jpg",
        "why": "JLR's low-slung coupe SUV arrives electric-first, likely on its 800V EMA platform; a hybrid follows."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Daniel Ek backs AI researcher's fusion power startup. Here's what they're building.",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/20/daniel-ek-backs-ai-researchers-fusion-power-startup-heres-what-theyre-building/",
        "img": "https://techcrunch.com/wp-content/uploads/2023/07/GettyImages-1500013882.jpg",
        "why": "Europa Fusion, a UK pulsed-power fusion startup led by an ex-DeepMind researcher, gets Ek's backing."
      },
      {
        "title": "Chips can survive the space environment. Can their financing?",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/20/chips-can-survive-the-space-environment-can-their-financing/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/06/SpaceXAIsatrender.jpg",
        "why": "Lenders balk at chip-backed loans for orbital data centres, since chips in space can't be repossessed."
      },
      {
        "title": "Centre's Antariksh VC Fund leads SatSure's ₹200 Cr Series B round",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/centres-antariksh-vc-fund-leads-satsures-%E2%82%B9200-cr-series-b-round",
        "img": "https://asset.inc42.com/2025/06/shutterstock_363654452si-satellite-1.jpg",
        "why": "The state-backed fund leads a ₹60 Cr first tranche for SatSure's optical payloads and geospatial AI."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "India's core sector growth hits 31-month high of 10.9% in October",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/core-sectors-growth-rises-to-10-9-in-oct-coal-iron-ore-key-drivers-126112000852_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/11/thumb/fitandfill/1200X628/1791736672-9469.jpg",
        "why": "First double-digit growth in the 2022-23 series; electricity up 21.6% and iron ore up 26.4%."
      },
      {
        "title": "India's forex reserves fall $14.21 bn to $705.34 bn on revaluation",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/india-s-forex-reserves-fall-14-21-bn-to-705-34-bn-on-revaluation-126112001283_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2020-02/07/thumb/fitandfill/1200X628/1581091561-2435.png",
        "why": "Gold holdings dropped $6.18 billion and foreign currency assets $7.90 billion in the week."
      },
      {
        "title": "Paytm, Pine Labs, MobiKwik shares tank over 7% amid reports of further UPI MDR delay",
        "source": "Entrackr",
        "url": "https://entrackr.com/all-article/paytm-pine-labs-mobikwik-shares-tank-over-7-amid-reports-of-further-upi-mdr-delay-12823081",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/19/mdr-2026-11-19-14-53-40.png",
        "why": "Reports say UPI merchant fees may slip past the 2027 assembly elections, hitting fintech stocks."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Tue 24 Nov",
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
    "day": "Wed 25 Nov",
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
      "when": "20–22 Nov, race Sun 6:30 PM IST",
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
  "note": "Portimão is match point for Marc Marquez. Friday: Alex Marquez fastest on his return, Marc sixth, Martin scraped into Q2. Sprint today 8:30 PM IST, race Sunday 6:30 PM IST.",
  "source": {
    "name": "motogp.com: Portuguese GP Friday report",
    "url": "https://www.motogp.com/en/news/2026/11/20/alex-marquez-shines-to-top-practice-on-return-martin-scrapes-into-q2/1186064"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 4,
  "km": "9.0",
  "latest": {
    "date": "19 Nov",
    "km": "1.7",
    "pace": "5:45"
  }
};

const MUSIC = {
  "song": {
    "title": "Drone Logic",
    "artist": "Daniel Avery",
    "id": "6cjUtb7XopHEeQKBjj0rER",
    "why": "Hypnotic, acid-tinged title track from the London producer's 2013 debut, close to the Overmono and Joy Orbison in your plays."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Vibes",
    "url": "https://open.spotify.com/playlist/6DBd39F9ldE7pnHr21inpL",
    "date": "2026-11-16"
  },
  "lately": [
    "Floating Points",
    "Fred again..",
    "Overmono",
    "Max Cooper",
    "Pional",
    "Joy Orbison"
  ]
};

const LEARN = {
  "term": "Dieter Rams' ten principles",
  "body": "In the late 1970s Dieter Rams, then head of design at Braun, asked himself whether his own work was good design and answered with ten principles: good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally friendly, and involves as little design as possible. They are ordered by use, not by look: aesthetics sits third, after usefulness, and only counts because objects we use daily shape our wellbeing. The popular reading as a minimalist style guide is overstated, since \"less, but better\" means removing whatever does not serve the user, not making things flat, white or featureless. Many of the principles echo the systematic, function-led thinking of Hans Gugelot and the Ulm school, who shaped Braun's approach before Rams. Rams himself later criticised a throwaway consumer culture, which is why long-lasting and environmentally friendly sit in the list beside the formal virtues.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Useful",
        "note": "The product must serve its purpose first"
      },
      {
        "label": "Legible",
        "note": "Form makes the product self-explanatory"
      },
      {
        "label": "Honest",
        "note": "Promises nothing it cannot deliver"
      },
      {
        "label": "Less",
        "note": "As little design as possible",
        "hl": true
      }
    ],
    "caption": "Restraint in service of use, not a visual style."
  },
  "source": {
    "name": "Vitsœ: Dieter Rams, ten principles for good design",
    "url": "https://www.vitsoe.com/gb/about/good-design"
  },
  "past": [
    "Form follows function: what Sullivan meant",
    "Snap-fit cantilever design",
    "Uniform wall thickness and sink marks",
    "Undercuts, shutoffs and side actions",
    "Le Corbusier's Modulor"
  ]
};

const DESIGN = {
  "name": "Olivetti Lettera 22 portable typewriter",
  "designer": "Marcello Nizzoli",
  "year": "1950",
  "why": "Nizzoli wrapped a full typing mechanism in a low, enamelled metal shell with soft radii and a flush keyboard, turning an office machine into a compact, approachable personal tool. It won the first Compasso d'Oro in 1954 and remains a lesson in how a well-proportioned enclosure can make complex mechanics feel simple.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Olivetti_Lettera_22_by_LjL.jpeg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Olivetti_Lettera_22_by_LjL.jpeg"
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
      "model": "Volkswagen Virtus facelift",
      "when": "11 Dec 2026",
      "price": "₹10.7–19.2 lakh (current)"
    },
    {
      "model": "Hyundai Compact EV",
      "when": "Late 2026",
      "price": "₹9.8–13 lakh"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming cars and bikes",
    "url": "https://www.autocarindia.com/upcoming-cars"
  }
};

