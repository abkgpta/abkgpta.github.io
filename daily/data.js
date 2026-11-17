// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "17 Nov 2026, 7:02 AM IST";

const QUOTE = {
  "text": "Design is the conscious and intuitive effort to impose meaningful order.",
  "author": "Victor Papanek"
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
        "title": "Hot headlines: match point Marquez as MotoGP straps in for the rollercoaster",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/11/16/hot-headlines-match-point-marquez-as-motogp-straps-in-for-the-rollercoaster/1185225",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/16/d7a4635b-6d61-40c7-8e82-1051d16848e1/IMG_8551.png",
        "why": "Marquez leads Martin by 60 points; leaving Portimão 37+ points clear seals the 2026 title."
      },
      {
        "title": "Stark Future becomes Europe's first electric motorcycle unicorn with €1.2bn valuation",
        "source": "Visordown",
        "url": "https://www.visordown.com/news/stark-future-becomes-europes-first-electric-motorcycle-unicorn-eu12bn-valuation",
        "img": "https://www.visordown.com/sites/default/files/2026-11/240625_facility_10.jpg",
        "why": "A round of over €150m, led by Highland Europe, is the largest ever for a European e-motorcycle company."
      },
      {
        "title": "Royal Enfield CEO says electric motorcycle adoption will take more time",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/industry/royal-enfield-ceo-says-electric-motorcycle-adoption-will-take-more-time-441336",
        "img": "https://asset.autocarindia.com/static/news/images/20261116_104604_4bee2c82.jpeg",
        "why": "Only about 200 Flying Flea C6 units delivered since April; RE will grow its EV brand gradually."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Tesla Cybercab orders open at $29,990. Subscription is mandatory",
        "source": "Motor1",
        "url": "https://www.motor1.com/news/815563/tesla-cybercab-robotaxi-limits/",
        "img": "https://cdn.motor1.com/images/mgl/1ZPjO3/s1/tesla-cybercab-order-form.jpg",
        "why": "Private buyers can order the two-seat robotaxi but need a $299/month subscription; deliveries start December in Austin."
      },
      {
        "title": "Defender EV to debut in 2027",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/defender-ev-to-debut-in-2027-441338",
        "img": "https://asset.autocarindia.com/static/news/images/20261116_104717_8d6a93db.jpg",
        "why": "JLR's CEO confirmed electric Defender Sport production at Halewood in 2027 on the EMA platform."
      },
      {
        "title": "JSW Motors website goes live ahead of brand debut next month",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/jsw-motors-website-goes-live-ahead-of-brand-debut-next-month-441341",
        "img": "https://asset.autocarindia.com/static/news/images/20261116_113937_bb9d94a2.jpg",
        "why": "The new Indian carmaker debuts on 3 December; its first model, the Combat, is a Jetour T2-based plug-in hybrid SUV."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "After dodging death, battery startup Our Next Energy is now going public",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/16/after-dodging-death-battery-startup-our-next-energy-is-now-going-public/",
        "img": "https://techcrunch.com/wp-content/uploads/2022/09/ONE-Anode-Free-Cell-Technology-prismatic.jpg",
        "why": "Battery maker ONE merges with Wen Acquisition Corp. at a $1B pro forma value and will list on Nasdaq as ONEE."
      },
      {
        "title": "Bharat Semi raises $24 Mn to build smart sensors for physical AI",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/bharat-semi-raises-24-mn-to-build-smart-sensors-for-physical-ai/",
        "img": "https://asset.inc42.com/2026/09/Semiconductor-social-1.jpg",
        "why": "A seed round led by Info Edge, South Park Commons and Indus Bridge for on-chip AI sensors for robots, cameras and drones."
      },
      {
        "title": "AI inference startup Daisytuner raises €6M seed",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/16/ai-inference-startup-daisyturner-raises-eur6m-seed/",
        "img": "https://cdn.tech.eu/uploads/2026/11/daisytuner-58.png",
        "why": "Elaia and LEA Ventures co-led the round for an AI compiler that adapts models to many chip types."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "AI CRM startup Dreamteam raises $53 Mn from Accel, Premji Invest, others",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/ai-crm-startup-dreamteam-raises-53-mn-from-accel-premji-invest-others-12814853",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/16/dreamteam-2026-11-16-19-20-35.png",
        "why": "Former Freshworks leaders founded this AI-agent CRM in 2025; Accel, Together Fund and Premji Invest backed it."
      },
      {
        "title": "Urban Company opens Rs 2,500 Cr QIP, sets floor price at Rs 161.03 per share",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/urban-company-opens-rs-2500-cr-qip-sets-floor-price-at-rs-16103-per-share-12814907",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/16/urban-company-01-2026-10-16-17-26-12.png",
        "why": "Rs 600 Cr goes to InstaHelp, whose spending widened Urban Company's Q2 loss to Rs 182 Cr."
      },
      {
        "title": "FRND posts Rs 367 Cr revenue in FY26; profit jumps 10X",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/frnd-posts-rs-367-cr-revenue-in-fy26-profit-jumps-10x-12814582",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/16/frnd-2026-11-16-17-37-00.png",
        "why": "The voice social app for small-town India grew revenue 88%, with profit near Rs 19 Cr in its third profitable year."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "IBM invests $3 bn yearly in India, plans $10 bn global quantum push: CEO",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/ibm-invests-3-bn-yearly-in-india-plans-10-bn-global-quantum-push-ceo-126111601056_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-06/26/thumb/fitandfill/1200X628/1782465223-4703.JPG",
        "why": "Arvind Krishna also warned AI could displace 10–20% of jobs, with BPO hit hardest."
      },
      {
        "title": "Mahanadi Coalfields IPO price band set at ₹129–136 per share",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/coal-india-to-use-mcl-ipo-proceeds-for-1-trillion-diversification-plan-126111601650_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-11/23/thumb/fitandfill/1200X628/1763917171-5102.jpg",
        "why": "Coal India's ₹8,981 Cr offer for sale opens 19 Nov and helps fund a ₹1 trillion diversification plan."
      },
      {
        "title": "NSE stock market-cap crosses ₹5 trillion; scrip up 16% from IPO price",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/nse-stock-market-cap-crosses-5-trillion-scrip-up-16-from-ipo-price-126111600849_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-09/08/thumb/fitandfill/1200X628/1788887342-8272.jpg",
        "why": "The newly listed exchange overtook LIC to become the 10th most valuable BSE-listed company."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Tue 17 Nov",
    "items": [
      {
        "time": "10:00 AM",
        "title": "Abhik / Prachi"
      },
      {
        "time": "7:30 PM",
        "title": "Meeting with Alistair: employment in China"
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
      "when": "5–7 Mar 2027",
      "what": "MotoGP: Thai GP, Buriram (2027 opener, provisional)"
    }
  ],
  "note": "Marc Marquez can seal the MotoGP title at Portimão: he leads Martin by 60 points and needs to leave 37+ clear. Bagnaia is out injured; Lecuona stands in. WorldSBK's 2026 season has ended.",
  "source": {
    "name": "motogp.com and worldsbk.com calendars",
    "url": "https://www.motogp.com/en/news/2026/11/16/hot-headlines-match-point-marquez-as-motogp-straps-in-for-the-rollercoaster/1185225"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 2,
  "km": "5.2",
  "latest": {
    "date": "12 Nov",
    "km": "3.1",
    "pace": "8:22"
  }
};

const MUSIC = {
  "song": {
    "title": "Two Thousand and Seventeen",
    "artist": "Four Tet",
    "id": "2ZIaH69kaz55RM4Pjx6KXl",
    "why": "From Four Tet's 2017 album New Energy: gentle, melodic UK electronica in the same space as the Floating Points and Leon Vynehall you've been playing."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Vibes",
    "url": "https://open.spotify.com/playlist/6DBd39F9ldE7pnHr21inpL",
    "date": "2026-11-16"
  },
  "lately": [
    "Floating Points",
    "Leon Vynehall",
    "Fred again..",
    "Boards of Canada",
    "Ejeca",
    "Sade"
  ]
};

const LEARN = {
  "term": "Undercuts, shutoffs and side actions",
  "body": "An undercut is any feature that stops a moulded part from ejecting straight along the tool's line of draw: a snap hook, a side hole, a lateral rib or a groove in a side wall. Because an injection mould's two halves separate along one axis, an undercut must either be designed out or released by extra mechanism: side actions (slides driven by angled cam pins), lifters (angled cores that move sideways as the ejector plate rises) or collapsing cores for internal threads. Each mechanism adds tooling cost, maintenance and a witness line on the part, and slides need room in the tool, which constrains how closely features can be packed. Designers often avoid them with a shutoff, opening a window in the wall beneath a snap so a core from the opposite half can form the hook, or with a bump-off, where a flexible resin such as polypropylene strips over a shallow undercut. The idea that every undercut needs a slide is overstated, but shutoffs and bump-offs carry their own costs: a visible opening, tight shutoff angles and material limits.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Draw",
        "note": "Mould halves part along one axis"
      },
      {
        "label": "Undercut",
        "note": "Feature that blocks straight ejection",
        "hl": true
      },
      {
        "label": "Shutoff",
        "note": "Core through a window forms the hook"
      },
      {
        "label": "Slide",
        "note": "Cam-driven side action: cost, witness line"
      }
    ],
    "caption": "Design the undercut out first; add mechanism last."
  },
  "source": {
    "name": "Wikipedia: Injection moulding",
    "url": "https://en.wikipedia.org/wiki/Injection_moulding"
  },
  "past": [
    "Le Corbusier's Modulor",
    "Kansei engineering",
    "The Ulm School (HfG Ulm)",
    "Product semantics",
    "Visual weight and balance"
  ]
};

const DESIGN = {
  "name": "Brionvega TS 502 radio",
  "designer": "Marco Zanuso and Richard Sapper",
  "year": "1964",
  "why": "Closed, it is a plain hinged box; opened, the two halves split into a speaker side and a dial-and-controls side, so the act of opening is the switch from object to instrument. It shows how a single hinge line and a strict cube can hold all the complexity of a product while keeping its form calm.",
  "source": {
    "name": "Cooper Hewitt: TS 502 Portable Radio",
    "url": "https://collection.cooperhewitt.org/objects/18648915"
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
      "price": "₹20–35 lakh"
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
      "model": "Hyundai compact EV",
      "when": "Late 2026",
      "price": "₹9.8–13 lakh"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming cars and bikes",
    "url": "https://www.autocarindia.com/upcoming-bikes"
  }
};
