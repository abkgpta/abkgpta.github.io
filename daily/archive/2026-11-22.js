// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "22 Nov 2026, 6:56 AM IST";

const QUOTE = {
  "text": "Good design is good business.",
  "author": "Thomas J. Watson Jr."
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
        "title": "Bezzecchi victorious as Marc Marquez crashes in dramatic Portugal Sprint",
        "source": "MotoGP",
        "url": "https://www.motogp.com/en/news/2026/11/21/bezzecchi-victorious-as-marc-marquez-crashes-in-dramatic-portugal-sprint/1186072",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/21/e3b98991-0a85-4a6b-9c06-6d71edc777f9/Report-MGP-SPR-PT-TOP.jpg",
        "why": "Marquez crashed from third in the wet; Bezzecchi beat Raul Fernandez and Alex Marquez, pushing the title to Sunday."
      },
      {
        "title": "TVS expects scooters to account for half of total 2W sales within two years",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/industry/tvs-expects-scooters-to-account-for-half-of-total-2w-sales-within-two-years-441374",
        "img": "https://asset.autocarindia.com/static/news/images/20261119_101512_a05898ae.jpeg",
        "why": "Scooters hold 41% of India's two-wheeler market; TVS sees 45% next year and up to 50% in two years."
      },
      {
        "title": "Royal Enfield 10 Year Warranty For UK At No Extra Cost – Will India Get It?",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/royal-enfield-10-year-warranty-for-uk-at-no-extra-cost-will-india-get-it-12561758.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/09/new-royal-enfield-classic-350-white-colour-launch-price-6.jpg",
        "why": "Each annual dealer service extends UK cover up to 10 years or 70,000 miles; India stays at 3 years."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Mahindra Scorpio outsells Hyundai Creta between Apr-Oct 2026",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/industry/mahindra-scorpio-outsells-hyundai-creta-between-apr-oct-2026-441367",
        "img": "https://asset.autocarindia.com/static/news/images/20261118_112558_7abb3533.jpg",
        "why": "Scorpio sold 1,12,841 units, up 10%, against the Creta's 1,07,682, down 9%."
      },
      {
        "title": "Volkswagen ID. Polo GTI Clubsport Concept unveiled",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/volkswagen-id-polo-gti-clubsport-concept-unveiled-441391",
        "img": "https://asset.autocarindia.com/static/news/images/20261120_132043_53c90b82.jpg",
        "why": "A two-door electric hot hatch concept with 367hp and 0-100kph in 4.7s; production not confirmed."
      },
      {
        "title": "SCOOP: MG Windsor facelift to get larger 61kWh battery pack",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/scoop-mg-windsor-facelift-to-get-larger-61kwh-battery-pack-441375",
        "img": "https://asset.autocarindia.com/static/news/images/20261119_112234_9c32ab68.jpg",
        "why": "MG's best-seller, past 80,000 sales in 2026, is expected to get a 61kWh pack in 2027."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Bending Spoons buys Mailchimp for $3.68B",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/20/bending-spoons-buys-mailchimp-for-3-68-billion/",
        "img": "https://techcrunch.com/wp-content/uploads/2024/11/GettyImages-2150300479.jpg",
        "why": "Intuit sells Mailchimp for well under the roughly $12B it paid in 2021, to the buyer of Airtable and Miro."
      },
      {
        "title": "Urban Company Raises ₹2,500 Cr Via QIP, Draws Bids Worth Over ₹15,000 Cr",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/urban-company-raises-%e2%82%b92500-cr-via-qip-draws-bids-worth-over-%e2%82%b915000-cr/",
        "img": "https://asset.inc42.com/2026/07/Urban-company-social-1.jpg",
        "why": "Bids topped six times the issue at ₹156 a share; ₹600 Cr is earmarked for InstaHelp."
      },
      {
        "title": "From Dreamteam To Boba Bhai — Indian Startups Raised Over $291 Mn This Week",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/from-dreamteam-to-boba-bhai-indian-startups-raised-over-291-mn-this-week/",
        "img": "https://asset.inc42.com/2026/11/IMG_7682.jpg",
        "why": "$291.3 Mn across 22 deals, up sharply week on week; AI led with $114 Mn."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "California AG subpoenas Nvidia over worries about Huang's ties with China",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/20/california-ag-subpoenas-nvidia-over-worries-about-huangs-ties-with-china/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/05/nemoclaw.jpg",
        "why": "The probe asks whether Nvidia GPUs or confidential information reached China and whether investors were misled."
      },
      {
        "title": "Elon Musk says SpaceX has a plan to eliminate cell phone dead zones",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/19/elon-musk-says-spacex-has-a-plan-to-eliminate-cell-phone-dead-zones/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/starlink.jpg",
        "why": "SpaceX has designed a rooftop micro cell tower for 2027; Direct-to-Cell V2 satellites launch next year."
      },
      {
        "title": "Indian chip startup Bharat Semi lands $24M seed round as it eyes global AI sensor market",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/15/indian-chip-startup-bharat-semi-lands-24m-seed-round-as-it-eyes-global-ai-sensor-market/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/bharat-semi-co-founders-vinayak-dalmia-vrinda-kapoor.jpg",
        "why": "Single-chip AI image sensors that could cut system costs by at least 70%."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Noel Tata's salvo sets stage for stormy Tata Sons board meet next week",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/noel-tata-tata-sons-board-recording-chandrasekaran-reappointment-listing-126112100507_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-09/18/thumb/fitandfill/1200X628/1789710821-7124.jpg",
        "why": "Noel Tata seeks board recordings and a pause on listing, and disputes Chandrasekaran's reappointment, before the 26 Nov meet."
      },
      {
        "title": "Markets gain 2.6% on FPI inflows, rupee rally and cooling crude oil prices",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/markets-gain-2-6-on-fpi-inflows-rupee-rally-and-cooling-crude-oil-prices-126112000973_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/20/thumb/fitandfill/1200X628/1795195027-2904.jpg",
        "why": "Nifty rose 2.61% for the week to 25,800.60 as FIIs net bought Rs 32,647 crore."
      },
      {
        "title": "CEA cautions against excessive financialisation in India's growth journey",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/cea-cautions-against-excessive-financialisation-in-india-s-growth-journey-126112001093_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-02/12/thumb/fitandfill/1200X628/1770920423-6203.jpg",
        "why": "Nageswaran says markets should fund productive investment; equity market cap is about 130% of GDP."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Wed 25 Nov",
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
  }
];

const RACING = {
  "items": [
    {
      "when": "20–22 Nov, race today",
      "what": "MotoGP: Portuguese GP, Portimão"
    },
    {
      "when": "27–29 Nov",
      "what": "MotoGP: Valencian GP, season finale"
    },
    {
      "when": "19–21 Feb 2027",
      "what": "WorldSBK: Australian Round, Phillip Island (provisional)"
    },
    {
      "when": "5–7 Mar 2027",
      "what": "MotoGP: Thailand GP, Buriram"
    }
  ],
  "note": "Saturday: Bezzecchi took pole with a lap record and won the Sprint; Marc Marquez crashed from third. He leads Martin by 55 and Bezzecchi by 62, so the title can still be settled in today's race.",
  "source": {
    "name": "motogp.com: Portugal Sprint report",
    "url": "https://www.motogp.com/en/news/2026/11/21/bezzecchi-victorious-as-marc-marquez-crashes-in-dramatic-portugal-sprint/1186072"
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
    "title": "Made To Stray",
    "artist": "Mount Kimbie",
    "id": "0BVdNCqYq6offkjRGKVRDB",
    "why": "The London duo's driving 2013 single from Cold Spring Fault Less Youth, a step from the Joy Orbison and Overmono in your plays."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Vibes",
    "url": "https://open.spotify.com/playlist/6DBd39F9ldE7pnHr21inpL",
    "date": "2026-11-16"
  },
  "lately": [
    "Aphex Twin",
    "Floating Points",
    "Joy Orbison",
    "Bladee",
    "Ecco2k",
    "Overmono"
  ]
};

const LEARN = {
  "term": "Wabi-sabi and designing for patina",
  "body": "Wabi-sabi joins two older Japanese aesthetic ideas: wabi, the quiet beauty of rustic simplicity, and sabi, the beauty that comes with age, wear and patina, both shaped by the tea ceremony tradition associated with Sen no Rikyū. Leonard Koren's 1994 book Wabi-Sabi for Artists, Designers, Poets and Philosophers introduced it to Western designers as a counterpoint to the glossy perfection of modernism. For a product designer its useful lesson is about time: choose materials and finishes that age gracefully, such as brass, leather, oiled wood or bead-blasted metal, rather than high-gloss plastics that look ruined by the first scratch. The popular version is overstated: wabi-sabi is not a rustic style, and factory-applied fake distress contradicts it, because the patina should come honestly from use. It also sits close to repair culture and long product life, which links it to Rams' idea that good design is long-lasting.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Wabi",
        "note": "Quiet, rustic simplicity"
      },
      {
        "label": "Sabi",
        "note": "Beauty that comes with age and wear"
      },
      {
        "label": "Material",
        "note": "Pick finishes that age gracefully",
        "hl": true
      },
      {
        "label": "Use",
        "note": "Patina earned by use, never faked"
      }
    ],
    "caption": "Design for how it looks in ten years, not on day one."
  },
  "source": {
    "name": "Stanford Encyclopedia of Philosophy: Japanese Aesthetics",
    "url": "https://plato.stanford.edu/entries/japanese-aesthetics/"
  },
  "past": [
    "Dieter Rams' ten principles",
    "Form follows function: what Sullivan meant",
    "Snap-fit cantilever design",
    "Uniform wall thickness and sink marks",
    "Undercuts, shutoffs and side actions"
  ]
};

const DESIGN = {
  "name": "Thonet No. 14 chair",
  "designer": "Michael Thonet",
  "year": "1859",
  "why": "Steam-bent solid beech reduced the chair to a handful of parts held by screws, so it could be shipped flat and assembled where it was sold. It is an early lesson in designing form, manufacturing process and logistics as one system, and it is still in production.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Thonet_Chair_No._14.JPG?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Thonet_Chair_No._14.JPG"
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
      "when": "Late Nov 2026",
      "price": "₹4.5–6 lakh"
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

