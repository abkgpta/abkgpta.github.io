// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "20 Nov 2026, 6:55 AM IST";

const QUOTE = {
  "text": "Design depends largely on constraints.",
  "author": "Charles Eames"
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
        "title": "MEDIA DAY DISPATCH: MotoGP match point 2 incoming at Portimao",
        "source": "MotoGP",
        "url": "https://www.motogp.com/en/news/2026/11/19/media-day-dispatch-motogp-match-point-2-incoming-at-portimao/1186058",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/19/986b4a7c-72f0-4c09-acac-15b9528cacae/LG9_5769-1-.jpg",
        "why": "Marc Marquez can seal his eighth MotoGP title at Portimão, possibly in the Sprint; Martin and Bezzecchi still in contention."
      },
      {
        "title": "Honda Rebel 500 launched at Rs 4.50 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/honda-rebel-500-launched-at-rs-450-lakh-441372",
        "img": "https://asset.autocarindia.com/static/news/images/20261119_064442_2d6c9318.jpg",
        "why": "Rs 4.50 lakh Standard, Rs 4.90 lakh E-Clutch; the 471cc twin makes 46hp and is sold via BigWing dealers."
      },
      {
        "title": "Three made-for-India VinFast e-scooters launching next year",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/three-made-for-india-vinfast-e-scooters-launching-next-year-441355",
        "img": "https://asset.autocarindia.com/static/news/images/20261118_024616_5108c86f.jpg",
        "why": "Locally made e-scooters based on the Evo, Kyo and Kinet, with India-specific chassis and design changes."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "BMW's Alpina luxury brand to enter India in 2027",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/bmws-alpina-luxury-brand-to-enter-india-in-2027-441358",
        "img": "https://asset.autocarindia.com/static/news/images/20261118_070003_357e5dd1.jpeg",
        "why": "Alpina arrives as a standalone brand across 10 cities; BMW sold 9,075 cars in India in H1 2026."
      },
      {
        "title": "Kia rejigs Seltos, Carens Clavis and Sonet line-up; Seltos iMT dropped",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/kia-rejigs-seltos-carens-clavis-and-sonet-lineup-drops-seltos-imt-441371",
        "img": "https://asset.autocarindia.com/static/news/images/20261119_062816_0e843710.jpg",
        "why": "The Seltos 160hp turbo-petrol is now DCT-only as Kia reshuffles variants; Seltos priced Rs 11.25–21.82 lakh."
      },
      {
        "title": "Tesla goes all-in on the Cybercab with upcoming €3B Berlin gigafactory expansion",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/16/tesla-goes-all-in-on-the-cybercab-with-upcoming-e3b-berlin-gigafactory-expansion/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/09/Tesla-cybercab-Getty.jpg",
        "why": "The €3 billion Grünheide expansion could build up to 1 million vehicles a year, with Cybercab production from 2029."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Mahanadi Coalfields raises ₹2,295 crore from investors ahead of IPO",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/mahanadi-coalfields-raises-2-295-crore-from-investors-ahead-of-ipo-126111800582_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-04/01/thumb/fitandfill/1200X628/1775034697-5409.jpg",
        "why": "ADIA and LIC are in the anchor book; Coal India sells 10% at ₹129–136, seeking a $9.6 billion valuation."
      },
      {
        "title": "Sebi approves transfer of ICICI Securities' PMS biz to ICICI Prudential AMC",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/sebi-approves-transfer-of-icici-securities-pms-biz-to-icici-prudential-amc-126111900710_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/07/thumb/fitandfill/1200X628/1791365134-9817.jpg",
        "why": "The slump-sale transfer is cleared; ICICI Prudential AMC's Q2 FY27 profit rose 6.1% to ₹889 crore."
      },
      {
        "title": "Boba Bhai raises $18 million in Series B funding to expand store network",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/boba-bhai-raises-18-million-in-series-b-funding-to-expand-store-network-126111901214_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/19/thumb/featurecrop/1200X628/1795098417-4249.png",
        "why": "Left Lane Capital joins; the bubble-tea chain has 120 stores and serves over 300,000 orders a month."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "London-based Boltz raises $110M Series A",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/19/london-based-boltz-raises-110m-series-a/",
        "img": "https://cdn.tech.eu/uploads/2026/11/boltz-807.png",
        "why": "The MIT spinout building AI drug-discovery models raised a Bessemer-led round; Nvidia also invested."
      },
      {
        "title": "Style Union raises Rs 485 Cr in Series E round led by Elev8 Venture, Venturi Partners",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/style-union-raises-rs-485-cr-in-series-e-round-led-by-elev8-venture-venturi-partners-12821452",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/18/01-2026-11-18-22-07-40.png",
        "why": "The fashion retailer will expand stores beyond south India into metro markets."
      },
      {
        "title": "InPrime Finserv raises Rs 101 Cr in Series B round led by FMO",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/inprime-finserv-raises-rs-101-cr-in-series-b-round-led-by-fmo-12823682",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/19/inprime-2026-11-18-12-04-09-2026-11-19-17-10-40.webp",
        "why": "The Bengaluru AI-first NBFC will expand lending and enter micro-mortgages."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Wallenberg Investments takes minority stake in Swedish deeptech Algoryx",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/19/wallenberg-investments-takes-minority-stake-in-swedish-deeptech-algoryx/",
        "img": "https://cdn.tech.eu/uploads/2026/11/smart-2-701.jpg",
        "why": "Algoryx simulates robots and heavy machinery to generate synthetic data for training autonomous-machine AI."
      },
      {
        "title": "IvyCap Ventures leads $11 Mn Series B round in robotics company Botsync",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/ivycap-ventures-leads-11-mn-series-b-round-in-robotics-company-botsync-12819998",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/18/botsync-2026-11-18-13-26-11.png",
        "why": "The factory robotics firm, with offices in Singapore and India, is building SyncOS AI and MAG mobile robots."
      },
      {
        "title": "Qluster raises €4.7M to power the next generation of quantum computing",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/17/qluster-raises-eur47m-to-power-the-next-generation-of-quantum-computing",
        "img": "https://cdn.tech.eu/uploads/2026/11/qluster-featured-10.png",
        "why": "A Paris photonic quantum startup, pre-seed led by Quantonation, targeting a fault-tolerant universal quantum computer by 2036."
      }
    ]
  }
];

const CALENDAR = [
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
  "note": "Match point for Marc Marquez: 60 clear of Martin, he is champion if he leaves Portimão 37+ points ahead, and winning Saturday's Sprint (8:30 PM IST) is enough. Lecuona stands in for Bagnaia, Dixon for Mir.",
  "source": {
    "name": "motogp.com: how Marc Marquez can be crowned in Portugal",
    "url": "https://www.motogp.com/en/news/2026/11/17/how-can-marc-marquez-be-crowned-world-champion-in-portugal/1185545"
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
    "title": "Emerald Rush",
    "artist": "Jon Hopkins",
    "id": "5S3F5GL8LASIjPg2PMiU1Q",
    "why": "Slow-building, melodic electronica from Jon Hopkins' 2018 album Singularity, close to the Floating Points and Max Cooper in your recent plays."
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
  "term": "Form follows function: what Sullivan meant",
  "body": "Louis Sullivan's line \"form ever follows function\" comes from his 1896 essay \"The Tall Office Building Artistically Considered\", where it described how a skyscraper's outward form should express its distinct internal uses, and it sat beside lavish ornament in his own buildings. Modernists later hardened it into an anti-ornament rule, and the Ulm school pushed it further toward a systematic, method-led functionalism. The popular reading that function alone determines one correct form is overstated: the same function admits many valid forms, and the designer's choices among them carry meaning, brand and emotion. For a product designer the useful version is that form should make function legible, so use, assembly and priorities read from the object itself. frog design's counter-slogan \"form follows emotion\" is best read as an addition to this, not a rejection of it.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "1896",
        "note": "Sullivan: form expresses a building's uses"
      },
      {
        "label": "Modernism",
        "note": "Hardened into a rule against ornament"
      },
      {
        "label": "Legible",
        "note": "Form makes use and priority readable",
        "hl": true
      },
      {
        "label": "Emotion",
        "note": "frog: meaning is part of function too"
      }
    ],
    "caption": "From a skyscraper essay to a product design principle."
  },
  "source": {
    "name": "Wikipedia: Form follows function",
    "url": "https://en.wikipedia.org/wiki/Form_follows_function"
  },
  "past": [
    "Snap-fit cantilever design",
    "Uniform wall thickness and sink marks",
    "Undercuts, shutoffs and side actions",
    "Le Corbusier's Modulor",
    "Kansei engineering"
  ]
};

const DESIGN = {
  "name": "Juicy Salif citrus squeezer (Alessi)",
  "designer": "Philippe Starck",
  "year": "1990",
  "why": "A cast-aluminium body on three long legs turns a kitchen tool into a sculpture, with the ribbed head dripping juice straight into a glass set beneath it. It is a lasting case study in the tension between object as function and object as symbol, since it is admired as much for what it says as for how well it squeezes.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Philippe_starck_per_alessi_spa.,_spremiagrumi_juicy_salif,_1990.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Philippe_starck_per_alessi_spa.,_spremiagrumi_juicy_salif,_1990.jpg"
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
