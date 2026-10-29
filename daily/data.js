// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "29 Oct 2026, 7:06 AM IST";

const QUOTE = {
  "text": "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
  "author": "Antoine de Saint-Exupéry"
};

const NOW = [
  {
    "name": "Celestial",
    "date": "28 Oct",
    "note": "A 3D research tool that maps a question as a solar system of related topics, now with a soundtrack.",
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
        "title": "TVS Motor Q2 results: PAT up 52% as revenue hits Rs 17,103 crore",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/tvs-motor-q2-net-profit-rises-52-percent-to-rs-1377-crore-revenue-jumps-44-percent-135533",
        "img": "https://img.autocarpro.in/autocarpro/e56fbf38-78f3-48cc-be0d-6ab9c382f36c_tvs.avif",
        "why": "Standalone profit hit Rs 1,377 crore, and electric two-wheeler sales jumped 133% to 1,86,186 units."
      },
      {
        "title": "Hero MotoCorp Q2FY27 results: net profit soars 42% to ₹1,861 crore",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/hero-motocorp-q2fy27-results-net-profit-soars-42-to-1-861-crore-126102801888_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2017-12/21/thumb/fitandfill/1200X628/1513859504-4316.jpg",
        "why": "Revenue grew 23% to ₹14,971 crore on 18.68 lakh units; scooter dispatches rose 47%."
      },
      {
        "title": "New KTM Duke 200 launched at Rs 2.07 lakh with quickshifter and traction control",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-ktm-duke-200-launch-price-rs-2-07-l-quickshifter-traction-control-12559692.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/New-KTM-Duke-200-launch-7.jpg",
        "why": "Ride-by-wire, a bi-directional quickshifter and traction control now come standard for just Rs 1,552 more."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Hyundai sees SUVs accounting for 75% of India sales in next 12-18 months",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/hyundai-sees-suvs-accounting-for-75-percent-of-india-sales-in-next-12-18-months-135534",
        "img": "https://img.autocarpro.in/autocarpro/0daa962a-87b5-4eaf-81f0-4cf2eb8b3d4d_hyundai-creta.png",
        "why": "SUVs were 67% of Hyundai's domestic sales last quarter; the new Bayon starts at Rs 9.99 lakh."
      },
      {
        "title": "New Toyota Innova Hycross facelift launch on Nov 26, flex fuel hybrid incoming",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/toyota-innova-hycross-facelift-launch-on-nov-26-flex-fuel-hybrid-12559728.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/09/toyota-innova-hycross-facelift-hybrid-interiors-spied-7.jpg",
        "why": "Toyota has shown a strong-hybrid prototype that runs on petrol-ethanol blends up to E85."
      },
      {
        "title": "2027 Maruti Fronx facelift spied: ADAS, new 1.2L 3-cylinder, rear disc brakes",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/2027-maruti-fronx-facelift-spied-adas-new-1-2l-3-cyl-rear-disc-brake-12559708.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/2027-maruti-fronx-facelift-spied.jpg",
        "why": "The Fronx sold 1,10,135 units in April to September, up 43%, and led India's car exports."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Simplismart bags $14 Mn to expand AI inference platform",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/simplismart-bags-14-mn-to-expand-ai-inference-platform/",
        "img": "https://asset.inc42.com/2026/10/simplismart-funding-social-1-1.png",
        "why": "The Indian infrastructure startup's revenue run rate grew 14X in six months; about 55% comes from the US."
      },
      {
        "title": "Warhound raises $200M to engineer war dogs and arm them with Anduril gear",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/22/ben-lamm-raises-200m-for-warhound-to-engineer-war-dogs-and-arm-them-with-anduril-gear/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/Warhound.png",
        "why": "Genetics meets defence tech: Sequoia and In-Q-Tel back the venture at a $1.2 billion valuation."
      },
      {
        "title": "NVIDIA's tiny robots steal the show with somersaults, stumbles and funny falls",
        "source": "Interesting Engineering",
        "url": "https://interestingengineering.com/ai-robotics/microduck-robots-in-nvidia-demo",
        "img": "https://cms.interestingengineering.com/wp-content/uploads/2026/10/Microduck-4.jpg",
        "why": "The $399 Microduck packs 15 motors into a sub-2 lb body and sold out after its GTC Berlin demo."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Upwind raises $400M after walking away from Datadog acquisition offer",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/28/upwind-raises-400m-after-walking-away-from-datadog-acquisition-offer",
        "img": "https://techcrunch.com/wp-content/uploads/2022/08/GettyImages-1197780051.jpg",
        "why": "The Series C values the cloud security startup at $3.8B, up from $1.5B nine months ago."
      },
      {
        "title": "Baillie Gifford funds slash value of holdings in Dailyhunt parent VerSe by up to 80%",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/baillie-gifford-funds-slash-value-of-holdings-in-dailyhunt-parent-verse-by-up-to-80/",
        "img": "https://asset.inc42.com/2026/10/Dailyjunt-social.jpg",
        "why": "A sharp markdown for a startup that raised $805 Mn at a reported $5 Bn valuation in 2022."
      },
      {
        "title": "Live2.ai raises ₹130 Cr to scale AI marketing SaaS platform",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/live2-ai-raises-%e2%82%b9130-cr-to-scale-ai-marketing-saas-platform/",
        "img": "https://asset.inc42.com/2026/10/live2.ai_soc.png",
        "why": "An Indian SaaS built for export: revenue grew fourfold in a year and only 10% comes from India."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Vedanta Q2 net profit jumps 151% to ₹6,202 crore, revenue rises 57%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/amp/companies/quarterly-results/vedanta-q2-net-profit-jumps-151-to-6-202-crore-revenue-rises-57-126102801242_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-07/10/thumb/fitandfill/1200X628/1752085822-4188.jpg",
        "why": "Record EBITDA of ₹9,938 crore, and net debt fell by ₹4,624 crore in a quarter."
      },
      {
        "title": "Adani Ports Q2 profit rises 18% to ₹3,682 crore, raises FY27 guidance",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/adani-ports-q2-profit-rises-18-to-3-682-crore-raises-fy27-guidance-126102801519_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-11/13/thumb/fitandfill/1200X628/1699843456-3697.jpg",
        "why": "Revenue and EBITDA guidance both rise by ₹1,000 crore, and capex guidance by ₹3,000 crore."
      },
      {
        "title": "HUL Q2 results: net profit rises 4% to ₹2,790 crore, volume growth at 7%",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/hul-q2-fy27-net-profit-sales-volume-growth-home-care-126102800363_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-08/04/thumb/fitandfill/1200X628/1754276995-286.jpg",
        "why": "Underlying sales growth of 15% was HUL's best in 14 quarters, a read on consumer demand."
      }
    ]
  }
];

const CALENDAR = [
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
  },
  {
    "day": "Mon 2 Nov",
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
  "note": "No race since last week's cancelled Australian GP; Marc Marquez leads Jorge Martin by 10 points heading into Sepang this weekend. WorldSBK's 2026 season has ended.",
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
    "title": "Talk to Me You'll Understand",
    "artist": "Ross from Friends",
    "id": "4Z4i631BesV0P6LTvfLAdL",
    "why": "Hazy, warm lo-fi house from a UK producer, a close cousin to the Four Tet and Fred again.. tracks in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery Mix",
    "url": "https://open.spotify.com/playlist/4dGNwkanrYF7nnKUPk52nX",
    "date": "2026-10-26"
  },
  "lately": [
    "Fred again..",
    "Four Tet",
    "Skrillex",
    "Bicep",
    "Overmono",
    "Daft Punk"
  ]
};

const LEARN = {
  "term": "Class-A surfacing and highlight lines",
  "body": "Class-A surfaces are the visible, customer-facing surfaces of a car or product, built so reflections flow without breaks: at least G2 (curvature) continuity across patch boundaries, using few, low-degree Bézier or NURBS patches with tidy control nets. Surfacers judge them less by shape than by how light travels across them, using zebra stripes, reflection lines and curvature combs to expose flaws a shaded view hides. A highlight that kinks marks a G1 joint, one that suddenly changes speed marks a curvature jump, and one that wavers means too many control points. Car studios often ask for G3 on large panels such as bonnets and roofs, but past G2 the gain mostly shows on glossy paint, so matte or textured products rarely need it. The label is often overstated: Class A describes surface quality and data discipline, not good design, and a dull form can be perfectly Class A.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Patches",
        "note": "Few low-degree patches, clean control nets."
      },
      {
        "label": "G2 joins",
        "note": "Curvature matches across every boundary.",
        "hl": true
      },
      {
        "label": "Zebra",
        "note": "Stripes expose kinks, wobbles and flats."
      },
      {
        "label": "Highlights",
        "note": "Reflections flow unbroken over the form."
      }
    ],
    "caption": "Judge a surface by how light moves across it."
  },
  "source": {
    "name": "Wikipedia: Class A surface",
    "url": "https://en.wikipedia.org/wiki/Class_A_surface"
  },
  "past": [
    "Affordances and signifiers",
    "Gestalt principles in product form",
    "The golden ratio: use and myth",
    "Draft angles and the parting line",
    "Surface continuity: G0 to G3"
  ]
};

const DESIGN = {
  "name": "Porsche 911 (original 901)",
  "designer": "Ferdinand Alexander Porsche",
  "year": "1963",
  "why": "F. A. Porsche drew a fastback whose single roofline runs unbroken from windscreen to tail, with upright round headlamps set into long front wings. The form was so resolved that Porsche has evolved it rather than replaced it for six decades, and the low nose and sloping tail read directly as a rear-engined car.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/1964_Porsche_911_-_yellow_-_fvl.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:1964_Porsche_911_-_yellow_-_fvl.jpg"
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
      "model": "Toyota Innova Hycross facelift",
      "when": "26 Nov 2026",
      "price": "₹20–33 lakh (est.)"
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
    "name": "Autocar India upcoming bikes and cars; Rushlane",
    "url": "https://www.autocarindia.com/upcoming-bikes"
  }
};

