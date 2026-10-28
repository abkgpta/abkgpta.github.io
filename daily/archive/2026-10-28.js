// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "28 Oct 2026, 7:00 AM IST";

const QUOTE = {
  "text": "Good design is as little design as possible.",
  "author": "Dieter Rams"
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
        "title": "Bajaj Auto Q2 net profit rises 35% as revenue tops Rs 20,000 crore",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/bajaj-auto-q2-net-profit-rises-35-percent-to-rs-3354-crore-as-revenue-crosses-rs-20000-crore-135494",
        "img": "https://img.autocarpro.in/autocarpro/e9f6c398-7308-4c16-bede-9f302257f93f_bajaj-dealer.avif",
        "why": "Exports rose 40% to 778,528 units while domestic two-wheelers grew only 2%; electric sales neared 200,000."
      },
      {
        "title": "Royal Enfield Himalayan 750 first teaser out, EICMA debut expected",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/royal-enfield-himalayan-750-first-teaser-out-eicma-debut-confirmed-12559610.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/royal-enfield-himalayan-750-teased-launch-eicma-global-2.jpg",
        "why": "Teaser points to Milan before EICMA (3–8 Nov); RE's above-350cc sales fell 26% in September."
      },
      {
        "title": "New Honda CB350C Black Edition launched: first look",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-honda-cb350c-black-edition-launched-first-look-12559632.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/new-honda-cb350c-black-edition-launched-7.jpg",
        "why": "A colour-only variant at about Rs 2.32 lakh on-road, blacking out the cowl, fork lowers and mirrors."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Defender 110 India price cut by up to Rs 34 lakh",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/defender-110-india-price-cut-by-up-to-rs-34-lakh-heres-why-12559623.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/land-rover-defender-110-india-price-cut-2.jpg",
        "why": "Local CKD assembly in Pune brings it to Rs 99 lakh; it was JLR India's bestseller in FY2026."
      },
      {
        "title": "Mid SUV sales H1 FY2027: Creta leads, Maruti gains share, Bayon joins the race",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/mid-suv-sales-h1-fy-2027-creta-leads-maruti-gains-share-bayon-12559594.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/05/new-creta-hyundai-black-colour-sales-1.jpeg",
        "why": "The segment grew 52% to 4.72 lakh units; Hyundai's share fell from 32% to 19% as Maruti hit 27%."
      },
      {
        "title": "Tata Motors, Amazon partner to deploy 3,000 electric trucks",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/tata-motors-amazon-partner-to-deploy-3000-electric-trucks-135493",
        "img": "https://img.autocarpro.in/autocarpro/1bd0e09e-8741-4c22-95a9-920c2352c7fd_Untitled-Design-_2_.png",
        "why": "Light and medium e-trucks like the Ultra E.7 start in Delhi, then the Delhi–Bengaluru–Chennai NH48 corridor."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Q3 robotics startup funding jumps as US and China lead physical AI push",
        "source": "Crunchbase News",
        "url": "https://news.crunchbase.com/venture/q3-2026-us-china-robotics-startup-funding-jumps-physical-ai-push",
        "img": "https://news.crunchbase.com/wp-content/uploads/physical-ai.jpg",
        "why": "Robotics startups raised $9.9B in Q3, over double a year ago; China leads year to date with $13.2B."
      },
      {
        "title": "Nova Spectral AI raises ₹21.2 Cr to build indigenous infrared sensor chips",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/nova-spectral-ai-raises-%e2%82%b921-2-cr-to-build-indigenous-infrared-sensor-chips/",
        "img": "https://asset.inc42.com/2026/10/stakcbox-funding-featured-1-1-1-1.jpg",
        "why": "Quantum-dot SWIR sensors on standard CMOS, an alternative to costly InGaAs, for drones, robots and vehicles."
      },
      {
        "title": "Ex-Pixxel engineer Effy John's Parsec Aerospace in talks to raise $10 Mn",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/ex-pixxel-engineer-effy-johns-parsec-aerospace-in-talks-to-raise-10-mn/",
        "img": "https://asset.inc42.com/2026/10/Parsec-Aerospace-Funding-social.jpg",
        "why": "A stealth Bengaluru startup building next-generation aerospace engines; Nexus is expected to lead, per sources."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Re:Build, which spun out Slate Auto, raises $2.1B",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/27/rebuild-which-spun-out-slate-auto-raises-2-1b/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/06/slate-auto-truck-tesla-charging.jpg",
        "why": "A US manufacturing accelerator, led by General Catalyst and JPMorganChase, expanding hard-tech production and new startups."
      },
      {
        "title": "Protectt.ai to acquire controlling stake in Bosch's AIShield",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/protectt-ai-to-acquire-controlling-stake-in-boschs-aishield/",
        "img": "https://asset.inc42.com/2026/10/Prottect-ai-Soc.jpg",
        "why": "Protectt.ai's first acquisition: an AI-model security platform incubated at Bosch, which keeps a minority stake."
      },
      {
        "title": "Pronto founder Anjali Sardana sets up physical AI venture Provision Labs in US",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/pronto-founder-anjali-sardana-sets-up-physical-ai-venture-provision-labs-in-us-12753088",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/26/pronto-2026-10-26-14-22-59.png",
        "why": "It will collect real-world data to train and test AI that runs robots, backed by Pronto's investors."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "L&T Q2 net profit rises 33% to ₹5,202 crore on strong order inflows",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/l-t-q2-net-profit-rises-33-to-5-202-crore-on-strong-order-inflows-126102701204_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2024-08/21/thumb/fitandfill/1200X628/1724223808-4603.jpg",
        "why": "Up from ₹3,926 crore, helped by infrastructure spending and reconstruction work in West Asia."
      },
      {
        "title": "Tata Capital Q2FY27 net profit surges 51% to ₹1,660 crore",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/tata-capital-q2fy27-results-net-profit-surges-51-to-1-660-crore-126102701217_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-10/29/thumb/fitandfill/1200X628/1761735776-1144.JPG",
        "why": "AUM rose 26% to over ₹3 trillion; the board raised its note programme from $2 billion to $3 billion."
      },
      {
        "title": "Cipla Q2 net profit falls 35% to ₹878 cr as US business weighs on sales",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/amp/companies/quarterly-results/cipla-q2-net-profit-falls-35-to-878-cr-as-us-business-weighs-on-sales-126102701381_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-09/05/thumb/fitandfill/1200X628/1693926768-8959.jpg",
        "why": "North America revenue fell 19% to $172 million, while India sales rose 12% on chronic therapies."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Sun 1 Nov",
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
  "note": "Last Sunday's Australian GP was cancelled for low visibility, so there was no race winner; Marc Marquez heads to Sepang this weekend 10 points ahead of Jorge Martin. WorldSBK's 2026 season has ended.",
  "source": {
    "name": "motogp.com, Qatar GP new date and end-of-season calendar",
    "url": "https://www.motogp.com/en/news/2026/03/15/motogp-confirms-new-date-for-the-qatar-grand-prix/1005668"
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
    "title": "Cassius 1999",
    "artist": "Cassius",
    "id": "2R53yign0dvy3i4TLAr2Ud",
    "why": "Filtered-disco French house from Philippe Zdar and Boombass, the same 1999 Paris sound as your Daft Punk and Modjo plays."
  },
  "playlist": {
    "name": "Weekly Discovery Mix",
    "url": "https://open.spotify.com/playlist/4dGNwkanrYF7nnKUPk52nX",
    "date": "2026-10-26"
  },
  "lately": [
    "DreamKiller",
    "Daft Punk",
    "Modjo",
    "Fred again..",
    "Saint Etienne",
    "X CLUB."
  ]
};

const LEARN = {
  "term": "Affordances and signifiers",
  "body": "James J. Gibson coined 'affordance' in ecological psychology (1977, 1979) for the action possibilities an environment offers an animal, whether or not they are noticed: a flat, knee-high, rigid surface affords sitting. Don Norman brought the word into design in The Psychology of Everyday Things (1988), but designers began using it for any on-screen cue, so in the 2013 edition of The Design of Everyday Things he added 'signifier' for the perceivable mark that tells people where and how to act. The distinction matters in product form: a flat push plate on a door affords pushing and signals it, while a pull handle on a push door is a signifier that lies, the classic 'Norman door'. Good industrial design makes the affordance real, makes the signifier honest, and closes the loop with feedback such as a detent, click or light. A common overstatement is that good form needs no labels; cultural conventions and learned behaviour shape what people read as a signifier, so test with real users.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Affordance",
        "note": "What the object physically allows."
      },
      {
        "label": "Signifier",
        "note": "The visible cue for where and how to act.",
        "hl": true
      },
      {
        "label": "Mapping",
        "note": "Control layout matches the effect."
      },
      {
        "label": "Feedback",
        "note": "Click, detent or light confirms the act."
      }
    ],
    "caption": "Make the action possible, then make it visible."
  },
  "source": {
    "name": "Wikipedia: Affordance",
    "url": "https://en.wikipedia.org/wiki/Affordance"
  },
  "past": [
    "Gestalt principles in product form",
    "The golden ratio: use and myth",
    "Draft angles and the parting line",
    "Surface continuity: G0 to G3"
  ]
};

const DESIGN = {
  "name": "Anglepoise 1227 lamp",
  "designer": "George Carwardine",
  "year": "1935",
  "why": "Carwardine, an automotive engineer working on suspension, used constant-tension springs so the arm balances and holds any position without clamps or locks. The 1227 brought that mechanism into a three-spring domestic lamp, where the stepped base, jointed arm and bell shade all read directly as the way it works.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Anglepoise1227.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Anglepoise1227.jpg"
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
