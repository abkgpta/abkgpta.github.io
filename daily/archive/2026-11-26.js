// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "26 Nov 2026, 6:53 AM IST";

const QUOTE = {
  "text": "The best way to have a good idea is to have lots of ideas.",
  "author": "Linus Pauling"
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
        "title": "Toyota Innova Hycross facelift launched at Rs 19.59 lakh",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/toyota-innova-hycross-facelift-launched-at-rs-1959-lakh-441417",
        "img": "https://asset.autocarindia.com/static/news/images/20261125_124335_cf08abc7.jpg",
        "why": "E85 compatibility makes it the only strong-hybrid flex-fuel vehicle on sale; the touchscreen grows to 12.3 inches."
      },
      {
        "title": "Suzuki revives Ignis nameplate as an EV",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/suzuki-revives-ignis-nameplate-as-an-ev-441416",
        "img": "https://asset.autocarindia.com/static/news/images/20261125_102934_7cf636c1.png",
        "why": "A 26kWh LFP pack gives 310km WLTP; European sales start summer 2027, with India not yet confirmed."
      },
      {
        "title": "No more factory teams: Stellantis exits motorsport",
        "source": "electrive",
        "url": "https://electrive.com/2026/11/24/no-more-factory-teams-stellantis-exits-motorsport",
        "img": "https://www.electrive.com/media/2026/11/opel-gse-27-fe-formel-e-gen4-2026-2.jpg",
        "why": "Peugeot skips the 2027 WEC, and Opel and Citroën get one final Formula E season."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "HOT HEADLINES: Valencia brings the fireworks for sold-out finale",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/11/24/hot-headlines-valencia-brings-the-fireworks-for-sold-out-finale/1268061",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/25/bdba3787-f0a7-4ba2-b6b3-fa3cd6288980/Valencia-GP16x9.png",
        "why": "Round 22 of 22: Ducati trail Aprilia by 9 points for constructors, and Bezzecchi and Martin are 2 apart for P2."
      },
      {
        "title": "Harley-Davidson unveils huge 2027 range with new ST baggers, CVOs and Cruisers",
        "source": "Visordown",
        "url": "https://visordown.com/news/harley-davidson-unveils-huge-2027-range-new-st-baggers-cvos-and-cruisers",
        "img": "https://www.visordown.com/sites/default/files/2026-11/cvo-02.jpg",
        "why": "Three new ST baggers get a 115hp Milwaukee-Eight 117 High Output, alongside five new CVO models."
      },
      {
        "title": "MV Agusta could have two potential buyers, but there's a €95m problem",
        "source": "Visordown",
        "url": "https://www.visordown.com/news/mv-agusta-could-have-two-potential-buyers-theres-eu95m-problem",
        "img": "https://www.visordown.com/sites/default/files/2025-10/2026-mv-agusta-brutale-800-3.jpg",
        "why": "Debts reportedly rose from about €35m to over €130m; improved offers are due by 21 December."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "FCC approves SpaceX plan to put AI data centers in space",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/25/fcc-approves-spacex-plan-to-put-ai-data-centers-in-space/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/space-tesla-cybertruck.jpg",
        "why": "Conditional approval for up to 1 million satellites at 500 to 1,002 km, with 14 years to deploy them."
      },
      {
        "title": "S&P considers Nvidia credit downgrade over governance and 'key man' risks",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/25/sp-considers-nvidia-credit-downgrade-over-governance-and-key-man-risks/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/01/GettyImages-2256813240.jpg",
        "why": "S&P may cut Nvidia from AA to AA-, with its review due to finish within 90 days."
      },
      {
        "title": "OpenAI says heavy ChatGPT users may hit limits sooner as it merges Chat and Work",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/25/openai-says-heavy-chatgpt-users-may-hit-limits-sooner-as-it-merges-chat-and-work/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/openai-chatgpt.jpg",
        "why": "Chat and Work will share one usage meter, rolling out more broadly in December; Instant stays unlimited."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Flipkart confirms Kalyan Krishnamurthy's exit after 11 years",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/flipkart-group-ceo-kalyan-krishnamurthy-to-step-down-report-12839924",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/25/smiling-south-asian-man-in-navy-polo-2026-11-25-13-06-52.png",
        "why": "The business grew more than fivefold under him; Balaji Thiagarajan leads on an interim basis."
      },
      {
        "title": "Cosine Robots raises Rs 22.36 Cr led by Avaana Capital",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/cosine-robots-raises-rs-2236-cr-led-by-avaana-capital-12836692",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/24/cosine-2026-11-24-13-03-41.png",
        "why": "A Rs 22.36 Cr robotics round with WEH Ventures joining; its control loop runs at 25 kHz."
      },
      {
        "title": "Aeravti Ventures launches Rs 300 Cr Fund II, secures over 50% commitments at first close",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/aeravti-ventures-launches-rs-300-cr-fund-ii-secures-over-50-commitments-at-first-close-12839670",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/24/aeravti-ventures-2026-11-24-16-05-58.png",
        "why": "It plans 9 to 10 early-stage bets with first cheques of Rs 6 to 10 Cr; Fund I closed at Rs 76 Cr."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "PhonePe warms up for IPO as investor appetite for Indian equities returns",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/ipo/phonepe-prepares-to-restart-ipo-process-amid-improving-market-conditions-126112500725_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-01/22/thumb/fitandfill/1200X628/1769103959-6521.jpg",
        "why": "Bankers expect a listing valuation of ₹1.2 to 1.5 trillion, with growth of about 40% a year."
      },
      {
        "title": "Sensex, Nifty surge nearly 2% to post their best session since November 6",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/sensex-nifty-surge-nearly-2-to-post-their-best-session-since-november-6-126112501149_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/12/thumb/fitandfill/1200X628/1712885785-0675.jpg",
        "why": "Nifty closed at 25,819.25 and Sensex at 83,938.28; FPIs bought a net ₹4,479 crore."
      },
      {
        "title": "Sebi to ease KYC norms, centralise client details at registration agencies",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/sebi-to-ease-kyc-norms-centralise-client-details-at-registration-agencies-126112500950_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-09/22/thumb/fitandfill/1200X628/1790048651-6838.jpg",
        "why": "From 24 December, investors won't resubmit supplementary KYC details to each intermediary."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Thu 26 Nov",
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
      "what": "MotoGP: Thailand GP, Buriram"
    },
    {
      "when": "19–21 Mar 2027",
      "what": "WorldSBK: Portuguese Round, Portimão (provisional)"
    }
  ],
  "note": "Season finale this weekend: Marquez is already champion, Bezzecchi and Martin are 2 points apart for P2, and Ducati trail Aprilia by 9 in the constructors' race.",
  "source": {
    "name": "motogp.com: Valencia time schedule",
    "url": "https://www.motogp.com/en/news/2026/11/25/time-schedule-motul-grand-prix-of-valencia/1268060"
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
    "title": "For An Angel - PvD's E-Werk Club Mix",
    "artist": "Paul van Dyk",
    "id": "2g2ObG4CPkpOSKLqffImGn",
    "why": "A Berlin trance classic in its long club mix, in the same euphoric lane as the Robert Miles, Energy 52 and Agnelli & Nelson in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Explorations",
    "url": "https://open.spotify.com/playlist/0bjn5wWlxFPY44ColrnZPc",
    "date": "2026-11-23"
  },
  "lately": [
    "The Prodigy",
    "Nalin & Kane",
    "Robert Miles",
    "Energy 52",
    "Agnelli & Nelson",
    "YORK"
  ]
};

const LEARN = {
  "term": "Form hierarchy: primary, secondary, tertiary",
  "body": "Industrial designers read a product at three levels: the primary form is the overall volume, silhouette and stance; secondary forms are the major features cut into or added to it, such as handles, screens, intakes or lamp graphics; tertiary elements are the small details like buttons, vents, textures, fillets and logos. The working rule is to resolve them in that order and keep each level subordinate to the one above, so the mass still reads clearly when the details are stripped away. Car designers test this by squinting at a side view or viewing a model from across the studio: if the gesture survives at that distance, the hierarchy is working. A common failure is detail-led design, where tertiary features pile up to compensate for a weak primary form and make the product look busy rather than rich. The three-tier split is a studio teaching heuristic, not a formal standard, and strong designs sometimes let one secondary feature, such as a grille or a single control, deliberately dominate.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Primary",
        "note": "Overall volume, silhouette and stance",
        "hl": true
      },
      {
        "label": "Secondary",
        "note": "Major features: handles, screens, intakes"
      },
      {
        "label": "Tertiary",
        "note": "Buttons, vents, texture, fillets, logos"
      }
    ],
    "caption": "Resolve big to small; details never outshout the mass."
  },
  "past": [
    "Natural mapping: controls that explain themselves",
    "Poka-yoke: designing out mistakes",
    "The Bauhaus: what it actually taught",
    "Wabi-sabi and designing for patina",
    "Dieter Rams' ten principles"
  ]
};

const DESIGN = {
  "name": "Braun KM 3 kitchen machine",
  "designer": "Gerd Alfred Müller",
  "year": "1957",
  "why": "Müller housed the motor and drive in one calm, white upright body, so the mixing bowl, blender and slicer attachments read as parts of a single coherent object rather than a pile of gadgets. It was so resolved that Braun kept producing it with little change for decades, an early proof of the systematic, Ulm-influenced approach that came to define Braun.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Braun_KM_3_K%C3%BCchenmaschine_mit_R%C3%BChrsch%C3%BCssel_-5435.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Braun_KM_3_K%C3%BCchenmaschine_mit_R%C3%BChrsch%C3%BCssel_-5435.jpg"
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
      "model": "Mini Cooper SE (2nd gen)",
      "when": "27 Nov 2026",
      "price": "₹50 lakh"
    },
    {
      "model": "Royal Enfield Himalayan 750",
      "when": "Late Nov 2026",
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
      "model": "Hyundai Ioniq P (compact EV)",
      "when": "Jan 2027",
      "price": "₹9.8–13 lakh"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming cars and bikes",
    "url": "https://www.autocarindia.com/upcoming-cars"
  }
};

