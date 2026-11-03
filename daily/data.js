// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "3 Nov 2026, 6:55 AM IST";

const QUOTE = {
  "text": "What I cannot create, I do not understand.",
  "author": "Richard Feynman"
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
        "title": "Royal Enfield Himalayan 750 revealed with cruise control and TPMS",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/royal-enfield-himalayan-750-revealed-with-cruise-control-and-tpms-441188",
        "img": "https://asset.autocarindia.com/static/news/images/20261101_103351_25588611.jpg",
        "why": "RE's largest-displacement bike yet adds traction control and adjustable suspension; full specs come at EICMA, India launch at Motoverse."
      },
      {
        "title": "Hero sells over 7 lakh units to top October 2026 bike and scooter sales",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/industry/hero-sells-over-7-lakh-units-to-top-october-2026-bike-and-scooter-sales-441196",
        "img": "https://asset.autocarindia.com/static/news/images/20261102_100823_aa58938e.jpeg",
        "why": "Hero sold 7,05,084 units, up 17.46% year on year; TVS grew fastest at 22.1%."
      },
      {
        "title": "Hero Xpulse 421 teased ahead of EICMA 2026 debut",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/hero-xpulse-421-teased-ahead-of-eicma-2026-debut-441199",
        "img": "https://asset.autocarindia.com/static/news/images/20261102_104124_71423c37.jpeg",
        "why": "A new liquid-cooled ~420cc single on a trellis frame, aimed at the Himalayan 450 and KTM 390 Adventure."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "China EV sales in October: BYD 483,125, Geely 214,996, Leapmotor 106,127, Xpeng 50,237",
        "source": "CarNewsChina",
        "url": "https://carnewschina.com/2026/11/02/china-ev-sales-in-october-byd-483125-geely-214996-leapmotor-106127-xpeng-50237",
        "img": "https://carnewschina.com/wp-content/uploads/2026/11/screenshot-2026-11-02-at-10-43-05-daily-updated-database-of-chinese-evs-and-sales-data-data-carnewschina-com.png",
        "why": "Leapmotor grew 51% year on year while Huawei's HIMA fell 50.8% and Li Auto slipped 8.6%."
      },
      {
        "title": "As EV race heats up, Germany finds itself falling behind pack leaders",
        "source": "The Christian Science Monitor",
        "url": "https://csmonitor.com/World/Europe/2026/1102/germany-cars-automakers-volkswagen-ev-china-strikes",
        "img": "https://images.csmonitor.com/csm/2026/11/1102_OGERMANCARS_VW_lede.jpg",
        "why": "German brands' share in China fell from 25% to 12% since 2020; analysts say they were slow to adopt gigacasting."
      },
      {
        "title": "Toyota and Waymo join forces to launch driverless bZ4X fleet in 2027",
        "source": "Motor1",
        "url": "https://www.motor1.com/news/813829/toyota-bz4x-waymo-next-robotaxi/",
        "img": "https://cdn.motor1.com/images/mgl/JO6r1J/s1/toyota-bz4x-with-integrated-waymo-av-hardware.jpg",
        "why": "Waymo's sensors will be fitted on Toyota's own bZ4X line at Takaoka, with Japan tests from 2027."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "India's deeptech dilemma, weekly funding rundown and more",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/indias-deeptech-dilemma-weekly-funding-rundown-more/",
        "img": "https://asset.inc42.com/2026/11/Social-Daily-Brief-37.png",
        "why": "Deeptech funding rose 176% in Q3, but deal count barely moved as capital pooled in a few players."
      },
      {
        "title": "India's OSAT expansion puts semiconductor test capacity and flexibility under pressure",
        "source": "EE Times India",
        "url": "https://www.eetindia.co.in/indias-osat-expansion-puts-semiconductor-test-capacity-and-flexibility-under-pressure/",
        "img": "https://www.eetindia.co.in/wp-content/uploads/sites/4/2026/04/178548371_Semiconductor-Wafer-Generic-14-123RF-1.jpg",
        "why": "Five Indian chip plants are producing; tester qualification takes six months to a year, and skills may lag."
      },
      {
        "title": "Trajectory raises $45M to make AI model training accessible to nontechnical experts",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/02/trajectory-raises-45m-to-make-ai-model-training-accessible-to-nontechnical-experts/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/Trajectory_3.jpg",
        "why": "Sequoia led the Series A at a $300M valuation for a continual-learning platform that retrains open models."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "CapGrid secures ₹50 Cr funding to deepen its manufacturing play",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/capgrid-secures-%e2%82%b950-cr-funding-to-deepen-its-manufacturing-play/",
        "img": "https://asset.inc42.com/2026/10/soc-91.jpg",
        "why": "A factory-less platform routing parts for auto OEMs; Hero Enterprise led the round, R&D goes to precision components."
      },
      {
        "title": "Two Point O bags $10 Mn to bridge the financing gap in clean energy",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/two-point-o-bags-10-mn-to-bridge-the-financing-gap-in-clean-energy/",
        "img": "https://asset.inc42.com/2026/11/two-point-o-funding-social-.png",
        "why": "Finances rooftop solar and battery storage for industrial firms; Transition VC led the Series A."
      },
      {
        "title": "IPO-bound StockGro's FY26 profit jumps 3.3X YoY to ₹113 Cr, revenue doubles",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/ipo-bound-stockgros-fy26-profit-jumps-3-3x-yoy-to-%e2%82%b9113-cr-revenue-doubles/",
        "img": "https://asset.inc42.com/2026/10/Untitled-Design-13-760x570-1.png",
        "why": "Operating revenue hit ₹226.1 Cr; it reportedly targets a ₹2,000–2,500 Cr IPO."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Reliance Industries shares surge 12%, biggest single-day gain since April 2020",
        "source": "Business Today",
        "url": "https://www.businesstoday.in/markets/stocks/story/reliance-industries-shares-surge-12-biggest-single-day-gain-since-april-2020-565200-2026-11-02",
        "img": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202611/6ae87677c145a-the-sharp-rise-boosted-the-market-capitalisation-m-cap-of-indias-most-valuable-company-by-around-023934353-16x9.jpg",
        "why": "Q2 net profit rose 40.6% to ₹25,548 crore, adding about ₹1.83 lakh crore in market value."
      },
      {
        "title": "India's manufacturing PMI eases to 54.7 in October, export orders hit six-month high",
        "source": "ANI",
        "url": "https://aninews.in/news/business/indias-manufacturing-pmi-eases-to-547-in-october-export-orders-hit-six-month-high20261102111017/",
        "img": "https://d3lzcn6mbbadaf.cloudfront.net/media/details/__sized__/ANI-20261102052615-thumbnail-320x180-70.jpg",
        "why": "Still expanding, with input cost inflation at its lowest since February, but business confidence slipped."
      },
      {
        "title": "Walmart probes Flipkart employees over alleged ₹150 Cr kickbacks: report",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/walmart-probes-flipkart-employees-over-alleged-%e2%82%b9150-cr-kickbacks-report/",
        "img": "https://asset.inc42.com/2026/08/alcatel-flipkart-social-2.png",
        "why": "Walmart's third misconduct probe at Flipkart in under three years, as its IPO timeline stays unclear."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Tue 3 Nov",
    "items": [
      {
        "time": "All day",
        "title": "overgrwth: compilation"
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
    "day": "Wed 4 Nov",
    "items": [
      {
        "time": "All day",
        "title": "overgrwth: complete on site"
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
  "note": "Marc Marquez won the Malaysian GP at Sepang on 1 Nov, ahead of Pedro Acosta and Alex Marquez. He leads Jorge Martin by 44 points and could seal the title in Qatar. WorldSBK's 2026 season has ended.",
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
    "title": "Seven Cities (Original Atlantis Mix)",
    "artist": "Solarstone",
    "id": "5VIVZAQVSfJRD8f4XFbgBL",
    "why": "A late-90s UK trance classic with the same long melodic build as the Three Drives and Paul van Dyk tracks in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "Jonathan Colling",
    "Three Drives",
    "Foals",
    "DJ CARPET",
    "Paul van Dyk",
    "Sash!"
  ]
};

const LEARN = {
  "term": "Simultaneous contrast in CMF",
  "body": "Simultaneous contrast is the effect, first set out systematically by the chemist Michel-Eugène Chevreul in 1839, where a colour's perceived hue, lightness and saturation shift depending on the colours around it. A mid-grey reads lighter on black and darker on white, and a neutral grey beside a saturated red takes on a faint green cast, its complement. In CMF work this means a colour chip approved in isolation can look wrong once it sits next to the real adjacent materials, so finishes should be judged as assemblies under the intended lighting, not as single swatches. Josef Albers' Interaction of Color (1963) made the point for designers: the same colour can be made to look like two, and two different colours like one. A common overstatement is that this is purely an optical illusion to be corrected; it is a stable property of vision, so good CMF strategies use it deliberately, for example a dark trim ring to make a housing read lighter and cleaner.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Swatch",
        "note": "Colour approved alone, on neutral."
      },
      {
        "label": "Neighbours",
        "note": "Adjacent parts shift hue and value.",
        "hl": true
      },
      {
        "label": "Light",
        "note": "Judge under the real light source."
      },
      {
        "label": "Use it",
        "note": "Pick trims that push the read you want."
      }
    ],
    "caption": "No colour is seen alone; specify the assembly."
  },
  "source": {
    "name": "Josef Albers, Interaction of Color (Yale)",
    "url": "https://yalebooks.yale.edu/book/9780300179354/interaction-of-color/"
  },
  "past": [
    "Shut lines, gap and flush",
    "Class-A surfacing and highlight lines",
    "Affordances and signifiers",
    "Gestalt principles in product form",
    "The golden ratio: use and myth"
  ]
};

const DESIGN = {
  "name": "Ducati 916",
  "designer": "Massimo Tamburini",
  "year": "1994",
  "why": "Tamburini packed the 916 around its engine so tightly that the parts became the styling: a single-sided swingarm that bares the rear wheel, under-seat exhausts and a narrow nose with twin slit headlights. Every line pulls the eye forward along one continuous wedge, which is why it still sets the template for sportbike proportion three decades on.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_916.JPG?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Ducati_916.JPG"
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
      "model": "Mercedes-Benz GLC Electric",
      "when": "4 Nov 2026",
      "price": "₹80–90 lakh (est.)"
    },
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

