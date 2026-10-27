// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "27 Oct 2026, 7:00 AM IST";

const QUOTE = {
  "text": "Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.",
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
        "title": "Ather turns profitable in Q2, posts ₹1.3 Cr PAT",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/ather-turns-profitable-in-q2-posts-%E2%82%B91-3-cr-pat/",
        "img": "https://asset.inc42.com/2026/08/ather-NIIF-exit-social-.jpg",
        "why": "A first net profit, against a ₹154 Cr loss a year ago; revenue rose 62.9% to ₹1,464 Cr, helped by other income."
      },
      {
        "title": "Harley-Davidson Sprint 440 cruiser spied undisguised, launch soon",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/harley-davidson-sprint-440-cruiser-spied-undisguised-launch-soon-12559576.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/harley-davidson-sprint-440-cruiser-spied-launch-soon-price-colours-4.jpg",
        "why": "A traditional cruiser on the X440's 440cc engine, built by Hero MotoCorp, now reaching dealerships."
      },
      {
        "title": "New KTM 200 Duke launch price Rs 2.09 L: ETB, TCS, ride modes, quickshifter",
        "source": "Rushlane",
        "url": "https://rushlane.com/new-ktm-200-duke-launch-price-rs-2-09-l-etb-tcs-ride-modes-quickshifter-12559419.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/new-updated-2026-ktm-200-duke-launched.jpg",
        "why": "Ride-by-wire, traction control and a bi-directional quickshifter come to the 200 Duke, per dealer pricing."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Hyundai Bayon launched at Rs 10 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/hyundai-bayon-launched-at-rs-10-lakh-441124",
        "img": "https://asset.autocarindia.com/static/news/images/20261026_080054_ab3e7bc4.png",
        "why": "A Chennai-built midsize SUV below the Creta, Rs 10 to 18 lakh, with Level 2 ADAS and exports planned."
      },
      {
        "title": "Tata Motors CV swings to ₹1,257 crore profit in Q2; revenue rises 36%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/tata-motors-swings-to-q2-profit-of-2-138-crore-on-strong-cv-demand-126102300904_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-08/12/thumb/fitandfill/1200X628/1786556236-3809.jpg",
        "why": "Truck and bus wholesales rose 42% to 135,100 units, with exports up 177%, against a loss a year ago."
      },
      {
        "title": "Tesla turns to Turo to boost adoption of Full Self-Driving (Supervised)",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/26/tesla-turns-to-turo-to-boost-adoption-of-full-self-driving-supervised/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/06/tesla-fsd-GettyImages-2277686230.jpg",
        "why": "Turo will flag FSD-equipped Teslas; Tesla says about 1.7 million customers have paid for FSD."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "This startup's self-driving excavators help dig up $600M in new funding",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/26/this-startups-self-driving-excavators-help-dig-up-600m-in-new-funding/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/bedrock-robotics-excavators.jpg",
        "why": "Bedrock Robotics' retrofit autonomy kit for excavators is valued at $4.1B, citing a skilled-operator shortage."
      },
      {
        "title": "Fusion startups are giving the government shares in exchange for awards. Is it worth it?",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/26/fusion-startups-are-giving-the-government-shares-in-exchange-for-awards-is-it-worth-it",
        "img": "https://techcrunch.com/wp-content/uploads/2026/01/cfs-sparc-digital-twin.jpeg",
        "why": "Helion and CFS took $260M in CHIPS Act money for reactor semiconductors in return for non-voting equity."
      },
      {
        "title": "Former OpenAI science lead launches Warp Science to automate wet labs with robots",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/22/former-openai-science-lead-launches-warp-science-to-automate-wet-labs-with-robots/",
        "img": "https://techcrunch.com/wp-content/uploads/2016/10/4528869007_4484c3d401_b-1.jpg",
        "why": "Robots trained by chemists in sensor gloves make and test drug compounds; it raised $215M, says Kevin Weil."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Social gaming startup Matiks raises $10 Mn in Pre-Series A led by General Catalyst",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/social-gaming-startup-matiks-raises-10-mn-in-pre-series-a-led-by-general-catalyst-12754114",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/26/matiks-2026-10-26-18-56-47.png",
        "why": "Started as a mental maths game; daily users doubled since June to over 300,000, and it will push into the US."
      },
      {
        "title": "Healthcare startup BioStack raises $9.5 Mn in seed funding led by Peak XV",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/healthcare-startup-biostack-raises-95-mn-in-seed-funding-led-by-peak-xv-12753841",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/26/biostack-2026-10-26-16-30-17.png",
        "why": "Builds de-identified clinical datasets for research and healthcare AI across the US, India, Brazil and Argentina."
      },
      {
        "title": "Europe's biggest seed rounds of Q3 2026: Top tech startups to watch",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/10/26/europes-biggest-seed-rounds-of-q3-2026-top-tech-startups-to-watch",
        "img": "https://cdn.tech.eu/uploads/2026/10/q32026-featured-395.png",
        "why": "European tech raised €27.8B in Q3, up 32.4%; seed leaders include industrial-robotics AI and trapped-ion quantum."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Paytm Q2FY27 net profit jumps 10-fold to ₹225 crore, revenue up 28%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/paytm-q2fy27-net-profit-jumps-10-fold-to-225-crore-revenue-up-28-126102601539_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/26/thumb/fitandfill/1200X628/1793038143-492.jpg",
        "why": "A sixth straight profitable quarter and a first double-digit EBITDA margin; monthly users reached 8.5 crore."
      },
      {
        "title": "Tata Consumer Products Q2 net profit rises 16% to ₹469 cr, sales up 14%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/amp/companies/quarterly-results/tata-consumer-products-q2-net-profit-rises-16-to-469-cr-sales-up-14-126102601505_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/08/thumb/fitandfill/1200X628/1720431964-3491.jpg",
        "why": "Growth businesses rose 40% to 38% of India sales; tea volumes were flat on weak demand."
      },
      {
        "title": "ITC Hotels Q2 net profit rises 52% to ₹202.6 crore, revenue up 26%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/itc-hotels-q2-net-profit-rises-52-to-202-6-crore-revenue-up-26-126102600976_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/30/thumb/fitandfill/1200X628/1738177869-8806.jpg",
        "why": "RevPAR rose 21% and the EBITDA margin hit 32%; the board approved a Dubai subsidiary."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Sat 31 Oct",
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
    },
    {
      "when": "27–29 Nov",
      "what": "MotoGP: Valencia GP, season finale"
    }
  ],
  "note": "Sunday's Australian GP was cancelled for low visibility, so there was no race winner; Marc Marquez heads to Sepang 10 points ahead of Jorge Martin. WorldSBK's 2026 season has ended.",
  "source": {
    "name": "motogp.com, Qatar GP new date and end-of-season calendar",
    "url": "https://www.motogp.com/en/news/2026/03/15/motogp-confirms-new-date-for-the-qatar-grand-prix/1005668"
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
    "title": "Both Of Us",
    "artist": "Jayda G",
    "id": "7q584VOAZLMPaIQ9pedKFl",
    "why": "Jayda G's 2019 house single: a long, soulful, disco-tinged groove that sits next to your Modjo and Daft Punk plays."
  },
  "playlist": {
    "name": "Weekly Discovery Mix",
    "url": "https://open.spotify.com/playlist/4dGNwkanrYF7nnKUPk52nX",
    "date": "2026-10-26"
  },
  "lately": [
    "Fred again..",
    "Modjo",
    "DreamKiller",
    "Daft Punk",
    "X CLUB.",
    "Saint Etienne"
  ]
};

const LEARN = {
  "term": "Gestalt principles in product form",
  "body": "Gestalt psychology (Wertheimer, Köhler and Koffka, 1910s–20s) describes how the visual system organises parts into wholes before we consciously inspect them: proximity, similarity, closure, continuity, common region and figure-ground. Koffka's line is usually misquoted as 'the whole is greater than the sum of its parts'; he said the whole is other than the sum, meaning perception creates a new structure rather than adding things up. On a product, proximity and common region decide which buttons read as one group, so spacing and a shared bezel do more than labels; similarity of colour, finish or radius tells users which elements behave alike. Continuity is why a highlight or shut line that runs unbroken across two parts makes them read as one volume, and a misaligned split breaks the form. The principles describe tendencies, not laws: they compete with each other and with learned conventions, so test layouts with real users rather than treating a Gestalt checklist as proof.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Proximity",
        "note": "Close parts read as one group.",
        "hl": true
      },
      {
        "label": "Similarity",
        "note": "Same colour, finish or radius = same role."
      },
      {
        "label": "Continuity",
        "note": "Unbroken lines join parts into one volume."
      },
      {
        "label": "Figure",
        "note": "Contrast sets what pops from the ground."
      }
    ],
    "caption": "Spacing and alignment group controls before labels do."
  },
  "source": {
    "name": "Wikipedia: Gestalt psychology",
    "url": "https://en.wikipedia.org/wiki/Gestalt_psychology"
  },
  "past": [
    "The golden ratio: use and myth",
    "Draft angles and the parting line",
    "Surface continuity: G0 to G3"
  ]
};

const DESIGN = {
  "name": "Olivetti Valentine typewriter",
  "designer": "Ettore Sottsass with Perry King",
  "year": "1969",
  "why": "Sottsass turned an office machine into a bright red ABS portable whose case doubles as its carrying bucket, pitching the typewriter as a personal, everyday object rather than workplace equipment. Its single-colour moulded shell, round orange spool caps and handle built into the case show how material, colour and form can carry a product's whole attitude.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Olivetti_Valentine.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Olivetti_Valentine.jpg"
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
