// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "18 Nov 2026, 6:55 AM IST";

const QUOTE = {
  "text": "Design is so simple, that's why it is so complicated.",
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
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Genesis AI raises $500 million to deploy glove-wearing robots",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/17/genesis-ai-raises-500-million-to-deploy-electric-glove-wearing-robots/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/IMG_1826.jpg",
        "why": "A $500M Series A led by Khosla, Premji Invest and Eclipse; US mass manufacturing of its Eno humanoid starts next year."
      },
      {
        "title": "Science Corporation's brain tech is worth $3.5 billion after new funding",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/17/science-corporations-brain-tech-is-worth-3-5-billion-after-new-funding",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/55588371385_eb2e316d52_o.jpg",
        "why": "A $400M Series D for the ex-Neuralink president's startup, whose PRIMA retinal implant chip is approved in Europe."
      },
      {
        "title": "Qluster raises €4.7M to power the next generation of quantum computing",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/17/qluster-raises-eur47m-to-power-the-next-generation-of-quantum-computing",
        "img": "https://cdn.tech.eu/uploads/2026/11/qluster-featured-10.png",
        "why": "A Paris photonic quantum spin-off; Quantonation led the pre-seed and it targets a fault-tolerant machine by 2036."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Lecuona to replace Bagnaia at the Portuguese GP",
        "source": "WorldSBK",
        "url": "https://www.worldsbk.com/en/news/2026/11/16/lecuona-to-replace-bagnaia-at-the-portuguese-gp/1185495",
        "img": "https://resources.wsbk.pulselive.com/wsbk/photo/2026/11/16/5fc1331b-1278-4107-89af-161ad110a495/52990_JDR_R03_2026_Ambience.jpg",
        "why": "Bagnaia is out after foot surgery, so Ducati's WorldSBK rider steps onto the factory Desmosedici at Portimão."
      },
      {
        "title": "Suzuki to make world championship return in 2027",
        "source": "Visordown",
        "url": "https://www.visordown.com/news/suzuki-make-world-championship-return-2027-gsx-r750",
        "img": "https://www.visordown.com/sites/default/files/2026-05/suzuki-gsxr1000-jm-r3jm3720.jpg",
        "why": "Suzuki returns full-time to World Supersport for the first time in over a decade, with a GSX-R750."
      },
      {
        "title": "Bajaj Pulsar 180 discontinued in India for a second time in five years",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/bajaj-pulsar-180-discontinued-in-india-for-a-second-time-in-five-years-441342",
        "img": "https://asset.autocarindia.com/static/news/images/20261116_121442_b65b5625.jpg",
        "why": "Revived only in April 2026 to take on the Apache RTR 180, the Rs 1.22 lakh Pulsar has left Bajaj's website."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Mahindra XEV 9S scores 5 stars in BNCAP crash tests",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/mahindra-xev-9s-scores-5-stars-in-bncap-crash-tests-441349",
        "img": "https://asset.autocarindia.com/static/news/images/20261117_064832_b054478c.jpg",
        "why": "The electric SUV scored 31.15/32 for adult and 45/49 for child occupant protection, across all trims."
      },
      {
        "title": "New Mini Cooper Electric bookings open; launch on November 27",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/new-mini-cooper-electric-bookings-open-ahead-of-november-27-launch-441350",
        "img": "https://asset.autocarindia.com/static/news/images/20261117_072612_a9d6ac6d.jpg",
        "why": "The second-gen Cooper SE gets a 54.2kWh battery, 218hp and 402km WLTP range, up from 270km."
      },
      {
        "title": "Vinfast VF5 facelift revealed",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/vinfast-vf5-facelift-revealed-441345",
        "img": "https://asset.autocarindia.com/static/news/images/20261117_053820_c413f96b.jpg",
        "why": "The updated electric SUV grows 20mm longer and 49mm wider, and could launch in India in the coming months."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Isomorphic Labs raises $5B as it looks to take drug candidates to clinical trials",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/17/isomorphic-labs-raises-5b-as-it-looks-to-take-drug-candidates-to-clinical-trials/",
        "img": "https://techcrunch.com/wp-content/uploads/2024/12/GettyImages-2151467531.jpg",
        "why": "The DeepMind spinout's Series C, co-led by Greenoaks and Sequoia, comes months after a $2.1B Series B in May."
      },
      {
        "title": "Shree Anandhaas raises Rs 110 Cr, valuation jumps to Rs 1,900 Cr",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-shree-anandhaas-raises-rs-110-cr-valuation-jumps-to-rs-1900-cr-12817177",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/17/shree-anandhaas-2026-11-17-16-11-35.png",
        "why": "Ayra Ventures led the round for the Coimbatore sweets chain, at roughly 3.3X its Series A valuation."
      },
      {
        "title": "Xpressbees raises Rs 100 Cr debt from BlackSoil",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-xpressbees-raises-rs-100-cr-debt-from-blacksoil-12813197",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/16/xpress-2026-11-16-12-27-30.png",
        "why": "Working-capital debt via NCDs; FY25 revenue was flat at Rs 2,874 Cr while its loss widened to Rs 370 Cr."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Tata Steel eyes 50 MT capacity, to direct 75% capex to India: TV Narendran",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/tata-steel-eyes-50-mt-capacity-to-direct-75-capex-to-india-tv-narendran-126111700284_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-08/06/thumb/fitandfill/1200X628/1691307636-7178.jpg",
        "why": "India capacity would rise from about 27 MT to 50 MT, with Rs 18,000–20,000 crore capex this year."
      },
      {
        "title": "Sebi may limit margin-funded stock purchases as retail leverage hits record",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/sebi-may-limit-margin-funded-stock-purchases-as-retail-leverage-hits-record-126111700421_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/07/thumb/fitandfill/1200X628/1791365134-9817.jpg",
        "why": "Margin-funded bets hit ₹1.53 trillion, up 29% a year; Sebi weighs curbs above 5–10% of a stock's free float."
      },
      {
        "title": "Signature Global enters Mumbai market with 475-acre land buy in Raigad",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/signature-global-enters-mumbai-market-with-475-acre-land-buy-in-raigad-126111800036_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-07/03/thumb/fitandfill/1200X628/1783094278-3418.jpg",
        "why": "The Delhi-NCR developer won an auction for 474.66 acres near Navi Mumbai airport with a ₹194.19 crore bid."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Wed 18 Nov",
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
  }
];

const RACING = {
  "items": [
    {
      "when": "20–22 Nov",
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
  "note": "Marc Marquez leads Martin by 60 points and Bezzecchi by 74 with 74 left: a Sprint win at Portimão, or leaving 37+ clear of Martin, seals the title. Lecuona replaces the injured Bagnaia.",
  "source": {
    "name": "motogp.com: how Marquez can be crowned in Portugal",
    "url": "https://www.motogp.com/en/news/2026/11/17/how-can-marc-marquez-be-crowned-world-champion-in-portugal/1185545"
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
    "title": "Looped",
    "artist": "Kiasmos",
    "id": "2bB6iDVgm25WkYv0yBz1BD",
    "why": "From the 2014 debut album by Kiasmos, Ólafur Arnalds and Janus Rasmussen: slow-building melodic minimal techno near the Floating Points and Four Tet you've been playing."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Vibes",
    "url": "https://open.spotify.com/playlist/6DBd39F9ldE7pnHr21inpL",
    "date": "2026-11-16"
  },
  "lately": [
    "Floating Points",
    "Four Tet",
    "Aphex Twin",
    "Fred again..",
    "Overmono",
    "Ejeca"
  ]
};

const LEARN = {
  "term": "Uniform wall thickness and sink marks",
  "body": "An injection-moulded part freezes from the outside in, so a thick section's core keeps shrinking after its skin has set, pulling the surface into a sink mark or, if the skin is too stiff to follow, leaving an internal void. Designers therefore hold a nominal wall that is as even as possible and blend any change in thickness gradually, commonly over a length about three times the step, instead of stepping it abruptly. Stiffness comes from ribs rather than mass, but a rib behind a cosmetic face is usually kept to roughly 50 to 60 percent of the wall it joins so the junction does not become a hot spot that sinks on the A-side; bosses are cored out and tied in with gussets for the same reason. The rule never vary the wall is overstated: gas-assist moulding, foaming grades, texture and packing pressure can hide some variation, but on a high-gloss Class-A surface even a shallow sink shows up as a distorted reflection.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Thick",
        "note": "Core cools last and keeps shrinking"
      },
      {
        "label": "Sink",
        "note": "Surface pulled in over the hot spot",
        "hl": true
      },
      {
        "label": "Uniform",
        "note": "Even nominal wall, gradual ~3:1 blends"
      },
      {
        "label": "Rib",
        "note": "Base about 50–60% of wall on A-side"
      }
    ],
    "caption": "Thin, even walls; stiffness from ribs, not mass."
  },
  "source": {
    "name": "Wikipedia: Injection moulding",
    "url": "https://en.wikipedia.org/wiki/Injection_moulding"
  },
  "past": [
    "Undercuts, shutoffs and side actions",
    "Le Corbusier's Modulor",
    "Kansei engineering",
    "The Ulm School (HfG Ulm)",
    "Product semantics"
  ]
};

const DESIGN = {
  "name": "Braun T3 pocket radio",
  "designer": "Dieter Rams",
  "year": "1958",
  "why": "A plain rectangular body with a perforated speaker grid and a single round tuning dial turns a transistor radio into a calm, almost diagrammatic object you hold in one hand. Its strict hierarchy of grid, dial and edge became a reference for later personal electronics and shows how much character restraint and proportion can carry."
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
      "model": "JSW Motors Combat",
      "when": "Dec 2026",
      "price": "₹38 lakh"
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
