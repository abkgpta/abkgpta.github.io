// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "12 Nov 2026, 7:10 AM IST";

const QUOTE = {
  "text": "Everyone designs who devises courses of action aimed at changing existing situations into preferred ones.",
  "author": "Herbert A. Simon"
};

const NOW = [
  {
    "name": "Celestial",
    "date": "9 Nov",
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
        "title": "10 things to know about the Royal Enfield Himalayan 750",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/auto-features/10-things-to-know-about-the-royal-enfield-himalayan-750-441282",
        "img": "https://asset.autocarindia.com/static/features/images/20261107_084151_219b162b.jpg",
        "why": "Royal Enfield's biggest Himalayan gets a 743cc air/oil-cooled twin making 55hp; India reveal expected at Motoverse, 27–29 Nov."
      },
      {
        "title": "TVS leads electric two-wheeler sales in October 2026 as sales nearly double",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/bike-news/tvs-leads-e2w-sales-in-october-2026-as-sales-nearly-double-441292",
        "img": "https://asset.autocarindia.com/static/news/images/20261109_104807_c715a2ee.jpeg",
        "why": "TVS led with 60,490 e2Ws, up 94.7%, as total retail hit 2,24,064 units; Ola fell 26.4%."
      },
      {
        "title": "12 wins at 12 circuits: Bezzecchi breaks Spencer's record",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/11/10/12-wins-at-12-circuits-bezzecchi-breaks-spencers-record/1184932",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/08/a54c7174-9f9b-4209-aa66-acc38691634b/LG9_5012.jpg",
        "why": "His Qatar win makes Bezzecchi the first rider whose first 12 GP wins came at 12 different circuits."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Electric car retail sales surge 76 percent in October 2026",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/car-news/ev-retail-sales-surge-76-percent-in-october-2026-441290",
        "img": "https://asset.autocarindia.com/static/news/images/20261109_090204_acc97cb3.jpg",
        "why": "India EV retail jumped 76.47% to 37,049 units while overall car sales fell 14%; Tata led with 14,669."
      },
      {
        "title": "India-made Renault Kiger improves safety rating to 4-star GNCAP",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/india-made-renault-kiger-improves-safety-rating-4-star-gncap-12560883.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-renault-kiger-facelift-global-ncap-crash-test-5.jpg",
        "why": "The facelifted Chennai-built Kiger goes from 2 to 4 stars for adults with six airbags and ESC."
      },
      {
        "title": "Scion is back, and it's bringing a tiny kei truck to America",
        "source": "Motor1",
        "url": "https://www.motor1.com/news/815063/scion-returns-kei-truck-america/",
        "img": "https://cdn.motor1.com/images/mgl/1ZPg63/s1/scion-by-toyota-kei-01.jpg",
        "why": "Toyota revives Scion with the US-built KEI-01, a 660cc kei pickup for fleets due in late 2027."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Lightspeed and Alphabet's CapitalG back Fractile in £500M-plus funding round",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/11/lightspeed-and-googles-capital-g-back-fractile-in-ps500m-plus-funding-round/",
        "img": "https://cdn.tech.eu/uploads/2025/05/fractile-43.jpg",
        "why": "UK AI inference chip startup raises a £500M-plus Series C at above £5bn; chips due in data centres next year."
      },
      {
        "title": "Tendrils Compute raises $30M to \"redo the CPU\"",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/11/tendrils-compute-raises-30m-to-redo-the-cpu/",
        "img": "https://cdn.tech.eu/uploads/2026/11/tendrils-878.png",
        "why": "Benchmark leads the round for a Cambridge startup building thousands-of-cores parallel CPUs and the open-source language Vine."
      },
      {
        "title": "From Reliance to Sarvam, Nvidia sits at the heart of India's AI plans",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/start-ups/from-reliance-to-sarvam-nvidia-sits-at-the-heart-of-india-s-ai-plans-126111101483_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-10/31/thumb/fitandfill/1200X628/1761907591-4362.jpg",
        "why": "Nvidia chips power Reliance's 1GW Jamnagar data centre, Yotta's 20,000-GPU cluster and L&T's AI factory."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "After a decade-long stint, Gaurav Munjal to step down as Unacademy CEO",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/after-a-decade-long-stint-gaurav-munjal-to-step-down-as-unacademy-ceo/",
        "img": "https://asset.inc42.com/2026/11/gaurav-munjal-quits-social-.png",
        "why": "Munjal becomes executive chairman two months after upGrad bought Unacademy for just over $200 Mn."
      },
      {
        "title": "Sarvam ropes in Google Cloud India MD Sashikumar Sreedharan as President & CBO",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/sarvam-ropes-in-google-cloud-india-md-sashikumar-sreedharan-as-president-cbo/",
        "img": "https://asset.inc42.com/2026/10/Sarvam-AI-Exclusive-social.jpg",
        "why": "He will run Sarvam's enterprise and government business; the AI startup is reportedly raising about $300 Mn."
      },
      {
        "title": "Berlin freight unicorn sennder raises €228M in debt and equity",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/11/berlin-freight-unicorn-sennder-raises-228m-in-debt-and-equity/",
        "img": "https://cdn.tech.eu/uploads/2026/11/smart-1-276.jpg",
        "why": "Now profitable, sennder raises €73M equity and €155M debt to grow its freight network and roll out AI agents."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Bulls in action! Sensex zooms 1,400 pts intraday; oil, FII buying aid rally",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/bulls-in-action-sensex-zooms-1-300-pts-intraday-oil-fii-buying-aid-rally-126111100243_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-07/06/thumb/fitandfill/1200X628/1751820375-8099.jpg",
        "why": "Sensex closed 772.75 points higher at 81,879.40 after touching 82,520 intraday."
      },
      {
        "title": "FPIs turn net buyers in November, pump ₹53,739 crore into Indian equities",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/fpis-turn-net-buyers-in-november-pump-53-739-crore-into-indian-equities-126111000477_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-06/11/thumb/fitandfill/1200X628/1781167756-8568.jpeg",
        "why": "Foreign investors put in ₹53,739 crore from 2 to 9 Nov after ₹34,843 crore of outflows in October."
      },
      {
        "title": "Indian garment makers rethink reliance on US after tariffs disrupt trade",
        "source": "Reuters via Business Standard",
        "url": "https://www.business-standard.com/industry/news/indian-garment-makers-rethink-reliance-on-us-after-tariffs-disrupt-trade-126111100074_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/11/thumb/featurecrop/1200X628/1794364973-6123.jpg",
        "why": "Apparel exports to the US fell 9.8% in April–August while other markets rose 3.7%; exporters look to Europe."
      }
    ]
  },
  {
    "topic": "Design & 3D tools",
    "stories": [
      {
        "title": "Blender 5.3 is out now: here's what's new",
        "source": "80 Level",
        "url": "https://80.lv/articles/blender-5-3-has-finally-arrived",
        "img": "https://cdn.80.lv/api/upload/meta/50974/images/6af4373eb589c/contain_1200x630.jpg",
        "why": "Adds native Gaussian Splat import and rendering, dispersion in Principled BSDF and a DLSS 4.5 denoiser."
      },
      {
        "title": "Adobe brings AI agents and new creative tools to Photoshop, Premiere and Firefly",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/10/adobe-adds-more-ai-to-its-products-and-launches-an-mcp/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/FF-AIA-PlanMode-No-Logo-4.jpg",
        "why": "Adobe launches a local MCP server for Creative Cloud apps and Firefly Builder, a prototyping tool that rivals Figma."
      },
      {
        "title": "An industrial designer's brilliant invention for dim restaurants",
        "source": "Core77",
        "url": "https://www.core77.com/posts/145866/An-Industrial-Designers-Brilliant-Invention-for-Dim-Restaurants",
        "img": "https://s3files.core77.com/blog/images/lead_n_spotlight/1856533_lead_400_145866_.jpg",
        "why": "Andrew Ferrier's Loupe Light stacks magnetic light rings; lift one off and it becomes a lit menu magnifier."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Thu 12 Nov",
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
    "day": "Fri 13 Nov",
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
    "day": "Sat 14 Nov",
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
  "note": "Marc Marquez leads Jorge Martin by 60 points with two MotoGP rounds left; WorldSBK's 2026 season has ended.",
  "source": {
    "name": "motogp.com and worldsbk.com calendars",
    "url": "https://www.worldsbk.com/en/news/2026/10/01/provisional-2027-worldsbk-calendar-revealed-china-to-debut-and-valencia-returns/1144887"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 1,
  "km": "2.1",
  "latest": {
    "date": "25 Oct",
    "km": "2.1",
    "pace": "8:41"
  }
};

const MUSIC = {
  "song": {
    "title": "Flaming June",
    "artist": "BT",
    "id": "5Vh9T9b7t7764fDEWMd9Fs",
    "why": "BT's 1997 trance anthem from ESCM, a melodic match for the Chicane and Faithless records in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "Faithless",
    "Chicane",
    "Simian Mobile Disco",
    "Nathan Fake",
    "Josh Wink",
    "Laurent Garnier"
  ]
};

const LEARN = {
  "term": "Product semantics",
  "body": "Product semantics studies how a product's form communicates what it is, how it works and how to use it; Klaus Krippendorff and Reinhart Butter brought the term into industrial design in a 1984 special issue of IDSA's journal Innovation. It reads form at several levels: identity (what kind of thing this is), operation (where to grip, press or twist) and expression (precise, playful, rugged). Designers build those cues from orientation, part hierarchy, texture, colour and visible joints, so a raised, contrasting button reads as pressable before any label is seen. Krippendorff's later book The Semantic Turn (2006) argues that meaning is made by users in context rather than fixed by the designer, which is why one form can read differently across cultures. The expressive, metaphor-heavy Cranbrook work of the 1980s is often treated as the whole movement, but the theory's core is about legibility and use, not styling.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Identity",
        "note": "What kind of thing is this?"
      },
      {
        "label": "Operation",
        "note": "Where to grip, press or turn",
        "hl": true
      },
      {
        "label": "Expression",
        "note": "Precise, playful or rugged"
      },
      {
        "label": "Context",
        "note": "Users make meaning in their setting"
      }
    ],
    "caption": "Form is read in layers, from what it is to how it feels."
  },
  "past": [
    "Product semantics",
    "Visual weight and balance",
    "Crown and tension in surfaces",
    "Anthropometrics and the percentile myth",
    "Design for manufacture and assembly (DFMA)"
  ]
};

const DESIGN = {
  "name": "Sony Walkman TPS-L2",
  "designer": "Kozo Ohsone and Akio Morita, Sony",
  "year": "1979",
  "why": "Sony built it from the Pressman cassette recorder by removing the recording circuit and speaker and pairing it with lightweight headphones, turning a tape machine into a personal object. Its blue-and-silver metal body, twin headphone jacks and orange 'hotline' talk-over button show how a few deliberate decisions can define a whole product category.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Walkman_TPS-L2.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Walkman_TPS-L2.jpg"
  },
  "source": {
    "name": "Cooper Hewitt collection",
    "url": "https://collection.cooperhewitt.org/objects/1141960831"
  }
};

const FUNDING = {
  "summary": "$258.1M across 28 Indian startups, 2–7 Nov, more than double the previous week's roughly $115M.",
  "rounds": [
    {
      "company": "GIVA",
      "amount": "$100 million",
      "stage": "",
      "sector": "Jewellery"
    },
    {
      "company": "EloElo Group",
      "amount": "$80 million",
      "stage": "Series C",
      "sector": "Consumer AI & entertainment"
    },
    {
      "company": "Clinics On Cloud",
      "amount": "$12.5 million",
      "stage": "Series A",
      "sector": "Healthtech"
    },
    {
      "company": "Peppermint Robotics",
      "amount": "Rs 100 crore",
      "stage": "Pre-Series B",
      "sector": "Robotics"
    },
    {
      "company": "altM",
      "amount": "$10.3 million",
      "stage": "Series A",
      "sector": "Specialty chemicals"
    },
    {
      "company": "Two Point O Capital (TW.O)",
      "amount": "$10 million",
      "stage": "",
      "sector": "AI-powered clean energy"
    }
  ],
  "source": {
    "name": "Entrackr weekly funding report",
    "url": "https://entrackr.com/report/weekly-funding-report-weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-nov-02-nov-07-12791269"
  }
};

const LAUNCHES = {
  "items": [
    {
      "model": "Denza Z9 GT",
      "when": "13 Nov 2026",
      "price": "₹1.2–1.5 Cr"
    },
    {
      "model": "Ducati DesertX V2",
      "when": "Nov 2026",
      "price": "₹19–22 lakh"
    },
    {
      "model": "Honda Rebel 300",
      "when": "Nov 2026",
      "price": "₹2.1–2.2 lakh"
    },
    {
      "model": "Toyota Innova Hycross facelift",
      "when": "25 Nov 2026",
      "price": "₹20–35 lakh"
    },
    {
      "model": "Mini Cooper SE",
      "when": "27 Nov 2026",
      "price": "TBA"
    },
    {
      "model": "Royal Enfield Himalayan 750",
      "when": "Late Nov 2026",
      "price": "TBA"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming launches",
    "url": "https://www.autocarindia.com/car-news/upcoming-car-launches-in-november-2026-441173"
  }
};
