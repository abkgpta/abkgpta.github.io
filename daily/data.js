// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "5 Nov 2026, 6:53 AM IST";

const QUOTE = {
  "text": "Simplicity is prerequisite for reliability.",
  "author": "Edsger W. Dijkstra"
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
        "title": "Hero-built Harley-Davidson X350 T revealed",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/hero-built-harley-davidson-x350-t-revealed-441230",
        "img": "https://asset.autocarindia.com/static/news/images/20261103_140030_5a362a96.jpg",
        "why": "A 350cc air/oil-cooled model slotting below the X440 S and X440 T; Autocar links the downsizing to 40% GST."
      },
      {
        "title": "TVS RTR 125 LC revealed",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/tvs-rtr-125-lc-revealed-441222",
        "img": "https://asset.autocarindia.com/static/news/images/20261103_104504_8f361147.jpg",
        "why": "TVS's first liquid-cooled 125cc single makes 14.7hp at 9,000rpm and 12Nm."
      },
      {
        "title": "Yamaha RW350, RW700, Xenter E and NMax E unveiled at EICMA 2026",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/yamaha-rw350-rw700-xenter-e-nmax-e-unveiled-at-eicma-2026-441214",
        "img": "https://asset.autocarindia.com/static/news/images/20261103_095228_83e68199.jpeg",
        "why": "Two new adventure bikes plus electric scooters with 3.5kWh batteries and about 104–108km claimed range."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "BMW Group trims 2026 outlook amid structural realignment",
        "source": "Just Auto",
        "url": "https://www.just-auto.com/news/bmw-group-trims-2026-outlook/",
        "img": "https://www.just-auto.com/wp-content/uploads/sites/30/2026/11/shutterstock_2451613647.jpg",
        "why": "Auto EBIT margin guidance cut to -0.5% to +0.5% from 1–3%; Q3 deliveries fell 6.3%."
      },
      {
        "title": "Nio to hold Nio IN 2026 tech day on November 25 in Guangzhou with focus on AI",
        "source": "CnEVPost",
        "url": "https://cnevpost.com/2026/11/04/nio-to-hold-nio-in-2026-tech-day-nov-25-guangzhou",
        "img": "https://cnevpost.com/wp-content/uploads/2026/11/2026110409233649.jpg",
        "why": "Comes as Nio's October deliveries fell 15.2% year on year, ending 31 months of growth."
      },
      {
        "title": "TechCrunch Mobility: A new, bigger AV boom is here",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/01/techcrunch-mobility-a-new-bigger-av-boom-is-here/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/robotaxi-illustration.jpg",
        "why": "Trucks VC has seen 81 new AV startups pitch this year, two-thirds more than in 2025."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Soket Labs & ZenteiQ launch indigenous AI models",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/soket-labs-zenteiq-launch-indigenous-ai-models/",
        "img": "https://asset.inc42.com/2026/11/soket-ai-social-.png",
        "why": "Soket's EKA-1 has 26.3B parameters and covers all 22 scheduled Indian languages plus English."
      },
      {
        "title": "Quint Computing raises €9.1M to scale quantum computing technology",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/03/quint-computing-raises-eur91m-to-scale-quantum-computing-technology",
        "img": "https://cdn.tech.eu/uploads/2026/11/quintcomputing-featured-771.png",
        "why": "A year-old FAU Erlangen spinout building superconducting chips that cut errors at the hardware level."
      },
      {
        "title": "Exclusive: Manastu Space raises ₹22 Cr in ongoing funding round",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/exclusive-manastu-space-raises-%E2%82%B922-cr-in-ongoing-funding-round/",
        "img": "https://asset.inc42.com/2026/10/Manastu-Space-social.jpg",
        "why": "Builds green satellite propulsion and in-orbit refuelling; TDB has also committed ₹116 Cr in debentures."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Cleantech startup altM raises $10.3 Mn to scale manufacturing",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/cleantech-startup-altm-raises-10-3-mn-to-scale-manufacturing",
        "img": "https://asset.inc42.com/2026/11/social-altM.png",
        "why": "Makes specialty chemicals and biomaterials from crop residue; Rainmatter and Mela Ventures led the Series A."
      },
      {
        "title": "PowerUp Money raises $10 Mn to expand wealth management services",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/powerup-money-raises-10-mn-to-expand-wealth-management-services",
        "img": "https://asset.inc42.com/2025/06/PowerUp-Money-Founder-SM.png",
        "why": "Flourish Ventures led, with Peak XV and Accel, as it moves to full-stack financial planning."
      },
      {
        "title": "Blue Ashva exits iD Fresh Food via a ₹50 Cr secondary transaction",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/blue-ashva-exits-id-fresh-food-via-a-%e2%82%b950-cr-secondary-transaction/",
        "img": "https://asset.inc42.com/2026/11/iD-Fresh-Food-Financials-social.png",
        "why": "The early backer sold its roughly 1% stake; iD Fresh's FY26 revenue reportedly crossed ₹870 Cr."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "SEDEMAC Q2 profit rises 30% YoY to ₹39 Cr, revenue jumps 40%",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/sedemac-q2-profit-rises-30-yoy-to-%e2%82%b939-cr-revenue-jumps-40/",
        "img": "https://asset.inc42.com/2026/11/SEDEMAC-social.jpg",
        "why": "The engine-control electronics maker's revenue rose to ₹400.6 Cr from ₹286.5 Cr."
      },
      {
        "title": "Ola Electric allots rights equity shares for ₹1,000 Cr fundraise",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/ola-electrics-%e2%82%b91000-cr-rights-issue-to-open-on-october-22-issue-price-set-at-%e2%82%b927/",
        "img": "https://asset.inc42.com/2026/10/ola-electric-ebike-social-1-1.jpg",
        "why": "37.03 Cr partly paid shares at ₹27; ₹599.8 Cr came in on application."
      },
      {
        "title": "Awfis' Q2 profit almost doubles YoY to ₹31 Cr, revenue up 20%",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/awfis-q2-profit-almost-doubles-yoy-to-%e2%82%b931-cr-revenue-up-20/",
        "why": "The coworking operator's operating revenue rose 19.6% to ₹438.7 Cr."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Thu 5 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: framework + copy"
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
    "day": "Fri 6 Nov",
    "items": [
      {
        "time": "All day",
        "title": "cortX: CAD + renders"
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
        "title": "cortX: system visualisation"
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
        "title": "cortX: compilation"
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
        "title": "cortX: compilation"
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
  "note": "Marc Marquez won the Malaysian GP on 1 Nov and leads Jorge Martin by 44 points; he could seal the title at Qatar this weekend. WorldSBK's 2026 season has ended.",
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
    "title": "Arla Fearn",
    "artist": "Overmono",
    "id": "7vQ9CJvFJwFMGkeEjruaOW",
    "why": "From the Welsh duo's debut album Good Lies: breakbeat-driven UK electronica close to the Bicep and 808 State in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "DreamKiller",
    "Daft Punk",
    "Kleinefrigo",
    "Maeksll",
    "808 State",
    "BICEP"
  ]
};

const LEARN = {
  "term": "Design for manufacture and assembly (DFMA)",
  "body": "DFMA, formalised by Geoffrey Boothroyd and Peter Dewhurst in the late 1970s and 1980s, treats part count and assembly motion as design decisions rather than factory problems. Its core test asks of every part: does it move relative to its neighbours, must it be a different material, and must it be separate to allow assembly or service? A part that fails all three is a candidate to merge into another, which is why snap fits, living hinges and multi-function mouldings replace screws, brackets and clips. Boothroyd's design efficiency index compares the theoretical minimum part count, at an ideal 3 seconds each, with the estimated real assembly time, so a design can be scored before tooling exists. The common overstatement is that fewer parts is always better: merging parts can push up tool cost, complicate moulding and make repair impossible, so DFMA should be weighed against serviceability and the cost of the tool, not applied as a blind count.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Moves?",
        "note": "Does it move relative to its neighbours?"
      },
      {
        "label": "Material?",
        "note": "Must it be a different material?"
      },
      {
        "label": "Separate?",
        "note": "Needed apart for assembly or service?"
      },
      {
        "label": "Merge",
        "note": "Fails all three: combine it with another.",
        "hl": true
      }
    ],
    "caption": "Every part must earn its place."
  },
  "past": [
    "Simultaneous contrast in CMF",
    "Shut lines, gap and flush",
    "Class-A surfacing and highlight lines",
    "Affordances and signifiers",
    "Gestalt principles in product form"
  ]
};

const DESIGN = {
  "name": "Braun TP 1 radio-phonograph",
  "designer": "Dieter Rams",
  "year": "1959",
  "why": "Rams split the music system into a slim pocket radio and a clip-on record player that stack into one block, an early case of portable, modular electronics. The grid of perforations, flat aluminium faces and minimal controls show the Braun language of order and restraint at pocket scale.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/DieterRamsTP1Perspective.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:DieterRamsTP1Perspective.jpg"
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
