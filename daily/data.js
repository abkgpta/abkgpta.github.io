// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "16 Nov 2026, 6:53 AM IST";

const QUOTE = {
  "text": "Real artists ship.",
  "author": "Steve Jobs"
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
        "title": "Razorpay gets SEBI nod for ₹6,000 Cr IPO",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/razorpay-gets-sebi-nod-for-%e2%82%b96000-cr-ipo/",
        "img": "https://asset.inc42.com/2026/11/Razorpay-IPO-social-1.jpg",
        "why": "The payments major's ₹5,000–6,000 Cr IPO could list Jan–Mar 2027 at about $5 Bn, below its 2021 $7.5 Bn valuation."
      },
      {
        "title": "Sachin Tendulkar backs waste management startup Recykal",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/sachin-tendulkar-backs-waste-management-startup-recykal/",
        "img": "https://asset.inc42.com/2026/11/tendulkar-recykal-social-.png",
        "why": "Recykal, which has raised over $60 Mn, grew FY26 gross revenue 53.2% to ₹1,498 Cr."
      },
      {
        "title": "Ajinkya Rahane picks up stake in D2C cookware brand Ember",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/ajinkya-rahane-picks-up-stake-in-d2c-cookware-brand-ember/",
        "img": "https://asset.inc42.com/2026/11/Ember-Founders-SM.png",
        "why": "A consumer product brand drawing celebrity money; Ember raised a $3.2 Mn seed round last September."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "BYD Denza Z9 GT India launch price Rs 1.57 Cr – 670 km range, 270 km/h top speed",
        "source": "RushLane",
        "url": "https://www.rushlane.com/byd-denza-z9-gt-india-launch-price-rs-1-57-cr-670-km-range-270-km-h-topspeed-12561013.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/byd-denza-z9-gt-india-launch-cover.jpg",
        "why": "A three-motor electric GT with a 122.49 kWh pack and 2.7 s 0–100 km/h; reservations cost Rs 10 lakh."
      },
      {
        "title": "New Toyota Innova Hycross facelift first official teaser out",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-toyota-innova-hycross-facelift-first-official-teaser-out-12560359.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-toyota-innova-hycross-teaser-first-official-launch-1.jpg",
        "why": "Toyota's second bestseller in India gets its first major update since 2022, launching 25 November."
      },
      {
        "title": "New Toyota Fortuner spied in Argentina – India launch 2027",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-toyota-fortuner-spied-in-argentina-india-launch-2027-12561130.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-toyota-fortuner-spied-testing-abroad.jpg",
        "why": "The next Fortuner debuts globally on 1 December in South Africa; India should keep the 2.8-litre diesel."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "New VinFast electric scooter, motorcycle patented – launch at Bharat Auto Expo?",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-vinfast-electric-scooter-motorcycle-patented-launch-at-bharat-auto-expo-12561245.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-vinfast-electric-scooter-motrocycle-for-india.jpg",
        "why": "The patented scooter uses a side-mounted motor instead of VinFast's usual hub motor; specs are unconfirmed."
      },
      {
        "title": "New Hero street fighter bike spied testing – electric Vida UBX?",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-hero-street-fighter-bike-spied-testing-electric-vida-ubx-12561118.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/hero-vida-ubx-spied-testing-new-cover.jpg",
        "why": "The EICMA concept looks close to production, with USD forks, mono-shock and the battery where the engine sits."
      },
      {
        "title": "New Bajaj Pulsar N250SS, Pulsar NS200 review – more torque or sharper handling?",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-bajaj-pulsar-n250ss-pulsar-ns200-review-12560414.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/pulsar-n250-ss-pulsar-ns200-ug-review-cover.jpg",
        "why": "Two 25 PS Pulsars about Rs 1,000 apart: the 249cc N250 SS at Rs 1.59 lakh vs the NS200 UG at Rs 1.6 lakh."
      }
    ]
  },
  {
    "topic": "Deep tech & clean mobility",
    "stories": [
      {
        "title": "DroneAcharya profits tank 65% YoY to ₹67 lakh in H1",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/droneacharya-profits-tank-65-yoy-to-%e2%82%b967-lakh-in-h1/",
        "img": "https://asset.inc42.com/2026/11/DroneAcharya-social.png",
        "why": "The listed drone maker's operating revenue fell 18.3% to ₹7.8 Cr, even as EBITDA margin rose to 54.7%."
      },
      {
        "title": "New Yamaha Xenter E scooter debuts – 16\" wheels, 108 km range",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-yamaha-xenter-e-scooter-debuts-16-wheels-108-km-range-12560930.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/yamaha-xenter-e-scooter-debuts-at-eicma-8.jpg",
        "why": "A fixed 3.5 kWh pack, 10 bhp and big-wheel stability; Yamaha plans a European launch in spring 2027."
      },
      {
        "title": "New Maruti SUV spied testing – next-gen Brezza 2028?",
        "source": "RushLane",
        "url": "https://www.rushlane.com/new-maruti-suv-spied-testing-next-gen-brezza-2028-12561219.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-maruti-brezza-spied-testing-cover.jpg",
        "why": "Suzuki has shown a 1.2L Z12E hybrid and a 174 bhp plug-in hybrid; their link to this mule is speculation."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "FirstCry Q2 net loss narrows 75% YoY to ₹12.6 Cr, revenue up 14%",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/firstcry-q2-net-loss-narrows-75-yoy-to-%e2%82%b912-6-cr-revenue-up-14/",
        "img": "https://asset.inc42.com/2026/10/soc-firstcry.jpg",
        "why": "Parent Brainbees cut its loss from ₹50.5 Cr as operating revenue rose 14.1% to ₹2,395.8 Cr."
      },
      {
        "title": "New-age tech stocks continue rally; E2E Network, Turtlemint lead gains",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/new-age-tech-stocks-continue-rally-e2e-network-turtlemint-lead-gains/",
        "img": "https://asset.inc42.com/2026/11/Tech-Stocks_Nov-14-social.jpg",
        "why": "55 of 69 tracked stocks gained this week, lifting combined market cap 4.5% to $177 Bn."
      },
      {
        "title": "Anup Gupta to exit Nexus Venture Partners after 16 years",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/anup-gupta-to-exit-nexus-venture-partners-after-16-years/",
        "img": "https://asset.inc42.com/2026/11/Anup-Gupta-Nexus-VP-SM.png",
        "why": "A senior exit at a firm managing $3.2 Bn across eight funds; he steps down in June 2027."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Mon 16 Nov",
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
    "day": "Tue 17 Nov",
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
  "note": "Marc Marquez could seal the MotoGP title in Portugal: he leads Martin by 60 points and Bezzecchi by 74; WorldSBK's 2026 season has ended.",
  "source": {
    "name": "motogp.com and worldsbk.com calendars",
    "url": "https://www.worldsbk.com/en/news/2026/10/01/provisional-2027-worldsbk-calendar-revealed-china-to-debut-and-valencia-returns/1144887"
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
    "title": "Kiara",
    "artist": "Bonobo",
    "id": "7sqii6BhIDpJChYpU3WjwS",
    "why": "Bonobo's 2010 album Black Sands sits between the Four Tet and Floating Points you've had on repeat: warm, melodic UK electronica."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Vibes",
    "url": "https://open.spotify.com/playlist/6DBd39F9ldE7pnHr21inpL",
    "date": "2026-11-16"
  },
  "lately": [
    "The Smiths",
    "Floating Points",
    "Four Tet",
    "Leon Vynehall",
    "Fred again..",
    "Ejeca"
  ]
};

const LEARN = {
  "term": "Le Corbusier's Modulor",
  "body": "The Modulor is a proportion system Le Corbusier published in 1948 (Le Modulor) and used on the Unité d'Habitation in Marseille. It anchors the golden ratio to a human body: a 1.83 m man, with his navel at 113 cm and his raised hand at 226 cm. From these it builds two Fibonacci-like series, a red one (…43, 70, 113, 183…) and a blue one at double the values (…86, 140, 226…), in which each step is roughly 1.618 times the last and each term is the sum of the two before. For a designer its real value is a fixed palette of related dimensions that keeps heights, grids and openings in family with each other and with the body. Its limits are often skipped: the 'standard' man was raised from 1.75 m to 1.83 m partly to suit British and American feet and inches, it describes one tall male body rather than a population range, and the claim that golden-ratio sizes are inherently more beautiful is not supported by evidence.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "183",
        "note": "Height of the standard man, in cm"
      },
      {
        "label": "113",
        "note": "Navel height: the split by 1.618",
        "hl": true
      },
      {
        "label": "226",
        "note": "Raised hand: double the navel, blue series"
      },
      {
        "label": "Series",
        "note": "Red 43·70·113·183, blue 86·140·226"
      }
    ],
    "caption": "A golden-ratio scale tied to one human body."
  },
  "source": {
    "name": "Wikipedia: Modulor",
    "url": "https://en.wikipedia.org/wiki/Modulor"
  },
  "past": [
    "Kansei engineering",
    "The Ulm School (HfG Ulm)",
    "Product semantics",
    "Visual weight and balance",
    "Crown and tension in surfaces"
  ]
};

const DESIGN = {
  "name": "Braun ET 66 calculator",
  "designer": "Dietrich Lubs with Dieter Rams",
  "year": "1987",
  "why": "Every key is a slightly domed circle that reads as a target for the fingertip, and colour is used only as code: an accent-coloured equals key and a few other cues, everything else neutral. It shows how far a strict grid, one form vocabulary and restrained CMF can carry an everyday object, which is why its key layout still echoes in interfaces today.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/1987_Braun_calculator_ET66_by_Dieter_Rams_(13964223413).jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:1987_Braun_calculator_ET66_by_Dieter_Rams_(13964223413).jpg"
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
      "model": "Hyundai compact EV",
      "when": "Late 2026",
      "price": "₹9.8–13 lakh"
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

