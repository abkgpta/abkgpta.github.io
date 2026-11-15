// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "15 Nov 2026, 6:55 AM IST";

const QUOTE = {
  "text": "If I have seen further it is by standing on the shoulders of Giants.",
  "author": "Isaac Newton"
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
        "title": "BYD Denza D9 launch price Rs 90 lakh – luxury MPV rivals Vellfire, M9",
        "source": "RushLane",
        "url": "https://www.rushlane.com/byd-denza-d9-launch-price-rs-90-lakh-luxury-mpv-rivals-vellfire-m9-12561012.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/byd-denza-d9-india-launch-cover.jpg",
        "why": "BYD brings its Denza luxury brand to India with a seven-seat electric MPV: 115 kWh battery, 730 km NEDC range."
      },
      {
        "title": "Mahindra aiming 10k sales per month for first SUV based on NU_IQ – Vision S?",
        "source": "RushLane",
        "url": "https://www.rushlane.com/mahindra-aiming-10k-sales-per-month-for-first-suv-based-on-nu_iq-vision-s-12561040.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2025/08/Mahindra-Vision-S-Interiors-17.jpeg",
        "why": "Mahindra has set aside capacity for 10,000 NU_IQ vehicles a month; the first SUV is expected by July 2027."
      },
      {
        "title": "Tata car sales breakup Oct 2026 – Nexon, Punch, Tiago, Sierra, Harrier, Curvv, Safari",
        "source": "RushLane",
        "url": "https://www.rushlane.com/tata-car-sales-breakup-oct-2026-nexon-punch-tiago-sierra-aeris-12561137.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/07/tata-sierra-ev-review-images-2.jpg",
        "why": "Tata sold 73,894 cars in October, up 20.87%; Nexon and Punch made up 57.5% of the total."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Two-wheeler retail sales fall year on year in October",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/two-wheeler-retail-sales-fall-in-october-441310",
        "img": "https://asset.autocarindia.com/static/news/images/20261111_121709_d5ced39e.jpeg",
        "why": "FADA data: 23.21 lakh units vs 32.40 lakh a year ago; Honda (27.47%) overtook Hero (25.78%) and EVs hit 9.65%."
      },
      {
        "title": "TVS Norton Atlas GT, Manx R patented in India – launch 2027?",
        "source": "RushLane",
        "url": "https://www.rushlane.com/tvs-norton-atlas-gt-manx-r-patented-in-india-launch-2027-12561225.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/tvs-norton-atlas-gt-manx-r-patented-in-india-cover.jpg",
        "why": "Norton's 206 bhp 1200cc V4 Manx R and 585cc twin Atlas GT are now patented in India."
      },
      {
        "title": "Royal Enfield 650 INT will not get 750cc engine – report",
        "source": "RushLane",
        "url": "https://www.rushlane.com/royal-enfield-650-int-will-not-get-750cc-engine-report-12561213.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/royal-enfield-interceptor-650.jpg",
        "why": "The Interceptor keeps its 47 bhp 648cc twin; the new 743cc engine (55 bhp) stays with the Continental GT 750."
      }
    ]
  },
  {
    "topic": "Deep tech & clean mobility",
    "stories": [
      {
        "title": "MeitY examines data collection by home services platforms for physical AI training",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/meity-examines-data-collection-by-home-services-platforms-for-physical-ai-training-12806000",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/13/home-service-2-2026-11-13-13-03-43.png",
        "why": "The ministry is questioning first-person video and sensor data gathered from gig workers to train robots."
      },
      {
        "title": "Zelio E-Mobility's net profit zooms 2.6X YoY to ₹31 Cr in H1",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/zelio-e-mobilitys-net-profit-zooms-2-6x-yoy-to-%e2%82%b931-cr-in-h1/",
        "img": "https://asset.inc42.com/2026/11/Zelio-social.jpg",
        "why": "The EV scooter maker's H1 FY27 profit rose 164% to ₹31.4 Cr as operating revenue grew 120% to ₹296.7 Cr."
      },
      {
        "title": "Raptee.HV opens experience centre in Chennai",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/rapteehv-opens-experience-centre-in-chennai-441314",
        "img": "https://asset.autocarindia.com/static/news/images/20261112_081222_36666ee5.jpeg",
        "why": "The high-voltage EV bike maker's T30 uses a 5.4 kWh pack and 29.5 hp motor; it got Rs 25 crore from TIDCO."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Zetwerk's Q2 loss jumps 43% YoY to ₹88 Cr, revenue up 18%",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/zetwerks-q2-loss-jumps-43-yoy-to-%e2%82%b988-cr-revenue-up-18/",
        "img": "https://asset.inc42.com/2026/11/Zetwerk-social.jpg",
        "why": "The manufacturing marketplace grew operating revenue 18.3% to ₹4,599.4 Cr while its loss widened to ₹88.1 Cr."
      },
      {
        "title": "Baaz Bikes to kick off Series B round led by BIG Capital",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-baaz-bikes-to-kick-off-series-b-round-led-by-big-capital-12805522",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/13/baaz-2026-11-13-10-27-39.png",
        "why": "The EV two-wheeler startup is raising Rs 46.22 crore, led by BIG Capital with Kalaari Capital."
      },
      {
        "title": "Bodhi Tree to acquire majority stake in restaurant chain A2B for $180 Mn",
        "source": "Entrackr",
        "url": "https://entrackr.com/snippets/bodhi-tree-to-acquire-majority-stake-in-restaurant-chain-a2b-for-180-mn-12804797",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/11/12/bodhi-tree-2026-11-12-23-07-04.png",
        "why": "A2B (Adyar Ananda Bhavan) runs about 160 outlets in India and 30+ abroad with over 15,000 staff."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Ashok Leyland Q2 consolidated revenue jumps 35% to ₹17,030 crore; profit up 8.8%",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/ashok-leyland-q2-consolidated-revenue-jumps-35-percent-to-rs-17030-crore-profit-up-88-percent-135924",
        "img": "https://img.autocarpro.in/autocarpro/be98c0b4-8194-4ba0-98a6-934972e51007_image.png",
        "why": "CV sales rose 32% to 64,677 units, but auditors flagged loan-balance issues at Hinduja Leyland Finance."
      },
      {
        "title": "Warburg Pincus to acquire 38.51% stake in Pricol's demerged electronics business",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/warburg-pincus-to-acquire-3851-percent-stake-in-pricols-demerged-electronics-business-135916",
        "img": "https://img.autocarpro.in/autocarpro/07a96c66-7f47-4bf0-aaee-38e5c84cb2ab_image.png",
        "why": "Warburg buys the promoters' full stake in the instrument-cluster unit, about 60% of Pricol's revenue."
      },
      {
        "title": "SoftBank sells 1.65% stake in Meesho for Rs 1,885 Cr through block deal",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/softbank-sells-165-stake-in-meesho-for-rs-1885-cr-through-block-deal-12807590",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/28/meesho-2026-10-28-17-38-38.png",
        "why": "SoftBank sold 7.64 crore shares at Rs 246.75; Fidelity and Societe Generale were the biggest buyers."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Sun 15 Nov",
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
    "title": "Goodbye",
    "artist": "Apparat, Soap&Skin",
    "id": "4VxaUj96W2jw9UOtKHu51p",
    "why": "Apparat is one half of Moderat, from your recent plays; this slow-building track from The Devil's Walk became the Dark theme."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "The Smiths",
    "Louf",
    "Duran Duran",
    "Moderat",
    "Daphni",
    "Anish Kumar"
  ]
};

const LEARN = {
  "term": "Kansei engineering",
  "body": "Kansei engineering, developed by Mitsuo Nagamachi at Hiroshima University from the 1970s, is a method for translating the feelings people have about a product into concrete design parameters. It starts by collecting the words users use for a product domain (\"sporty\", \"solid\", \"friendly\") and turning them into semantic differential scales, then has people rate a set of real or sketched variants on those scales. The variants are broken down into measurable properties, such as radius size, height-to-length ratio, shut-line count or surface finish, and statistics (regression, quantification theory, factor analysis) link each property to each feeling. The result is a rule set like \"larger front radii raise 'friendly' scores\", which designers can use as a brief or a check. Its limits are often understated: the mapping only ranks the properties you chose to test, it is tied to the culture and moment of the survey, and it cannot invent a form; it tunes form, it does not generate it.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Words",
        "note": "Collect users' feeling words for the domain"
      },
      {
        "label": "SD scales",
        "note": "Rate product variants on word pairs"
      },
      {
        "label": "Mapping",
        "note": "Statistics link properties to feelings",
        "hl": true
      },
      {
        "label": "Rules",
        "note": "Design rules: which parameter moves which"
      }
    ],
    "caption": "Feelings in, measurable form parameters out."
  },
  "source": {
    "name": "Wikipedia: Kansei engineering",
    "url": "https://en.wikipedia.org/wiki/Kansei_engineering"
  },
  "past": [
    "The Ulm School (HfG Ulm)",
    "Product semantics",
    "Visual weight and balance",
    "Crown and tension in surfaces",
    "Anthropometrics and the percentile myth"
  ]
};

const DESIGN = {
  "name": "Artemide Tizio desk lamp",
  "designer": "Richard Sapper",
  "year": "1972",
  "why": "Sapper balanced the two arms with counterweights so the head stays wherever it is put, and ran the low-voltage current through the arms themselves, so there are no wires along the frame. The result is a lamp whose structure, electrics and adjustment are one system, and it has stayed in production for decades with barely a change.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lampe_Tizio_von_Richard_Sapper.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Lampe_Tizio_von_Richard_Sapper.jpg"
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

