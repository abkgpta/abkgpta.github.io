// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "2 Nov 2026, 6:54 AM IST";

const QUOTE = {
  "text": "Any sufficiently advanced technology is indistinguishable from magic.",
  "author": "Arthur C. Clarke"
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
        "title": "Indian e-two-wheeler sales cross a record 2.23 lakh units in October",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/industry/indian-e-two-wheeler-sales-crosses-a-record-223-lakh-units-in-october-441190",
        "img": "https://asset.autocarindia.com/static/news/images/20261101_130459_ded3bbfb.jpg",
        "why": "Up 48% year on year; TVS led with 60,429 units while Ola Electric fell 26%."
      },
      {
        "title": "Marquez wins Malaysian Grand Prix to close in on retaining championship",
        "source": "Al Jazeera",
        "url": "https://www.aljazeera.com/sports/2026/11/1/marquez-wins-malaysian-grand-prix-to-close-in-on-retaining-championship",
        "img": "https://www.aljazeera.com/wp-content/uploads/2026/11/AFP__20261101__D6323RM__v1__HighRes__MotoPrixMasMotogpPodium-1793523846.jpg",
        "why": "He now leads injured Jorge Martin by 44 points and could clinch the title in Qatar next weekend."
      },
      {
        "title": "TVS 450, Xpulse 421, Harley Cruiser 350 / 440, RE 750 and more expected at EICMA 2026",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/tvs-450-xpulse-421-harley-cruiser-440-re-750-and-more-expected-at-eicma-2026-12559821.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/10/tvs-apache-rr-450-based-on-tangent-rr-concept.jpg",
        "why": "Indian makers bring big-bore bikes to Milan, from an Apache RR 450 to Royal Enfield's 750 twins."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "Festive boom! Maruti, Mahindra, Tata Motors, Hyundai post record domestic sales in October",
        "source": "Business Today",
        "url": "https://www.businesstoday.in/auto/story/festive-boom-maruti-mahindra-tata-motors-hyundai-post-record-domestic-sales-in-october-565002-2026-11-01",
        "img": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202611/6ae75676e782f-october-turns-blockbuster-for-carmakers-as-maruti--mahindra--hyundai--kia-set-sales-records-011045741-16x9.png",
        "why": "Maruti sold a record 2,16,789 cars at home, up 20%; Tata's EV sales rose 75% to 16,244."
      },
      {
        "title": "Xiaomi EV deliveries top 50,000 in October as new SUV boosts sales",
        "source": "Investing.com",
        "url": "https://investing.com/news/company-news/xiaomi-ev-deliveries-top-50000-in-october-as-new-suv-boosts-sales-4989493",
        "img": "https://content-media.investing.com/news/LYNXMPEA7A0FH_L.jpg",
        "why": "Its best month of 2026, driven by the new Sky Nomad SUV; it is 61% of the way to 550,000."
      },
      {
        "title": "TechCrunch Mobility: A new, bigger AV boom is here",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/01/techcrunch-mobility-a-new-bigger-av-boom-is-here/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/robotaxi-illustration.jpg",
        "why": "One VC has seen 81 new autonomous-vehicle startups pitch this year, about two-thirds more than last year."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "This startup's self-driving excavators help dig up $600M in new funding",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/26/this-startups-self-driving-excavators-help-dig-up-600m-in-new-funding/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/bedrock-robotics-excavators.jpg",
        "why": "Bedrock's retrofit autonomy kit is now doing paid work on real sites, at a $4.1B valuation."
      },
      {
        "title": "Skyroot Aerospace eyes commercial rocket launches from early 2027",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/start-ups/skyroot-aerospace-eyes-commercial-rocket-launches-from-early-2027-126103001590_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-07/02/thumb/fitandfill/1200X628/1782994119-3451.jpg",
        "why": "After its first orbital launch, Skyroot targets one launch a month by end-2027."
      },
      {
        "title": "Nova Spectral AI raises ₹21.2 Cr to build indigenous infrared sensor chips",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/nova-spectral-ai-raises-%E2%82%B921-2-cr-to-build-indigenous-infrared-sensor-chips/",
        "why": "Short-wave infrared sensors from colloidal quantum dots on standard silicon CMOS; prototype due in 18 months."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "From Cent to Matiks: Indian startups raised over $132 Mn this week",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/from-to-cent-to-matiks-indian-startups-raised-over-132-mn-this-week/",
        "img": "https://asset.inc42.com/2026/10/Funding-Galore_Oct-Soc-100.jpg",
        "why": "Funding fell 29% week on week, but 32 startups raised money, up from 17."
      },
      {
        "title": "OpenAI reportedly lowers funding target for new round",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/31/openai-reportedly-lowers-funding-target-for-new-round",
        "img": "https://techcrunch.com/wp-content/uploads/2026/07/OpenAI-logo-green.jpg",
        "why": "The target reportedly dropped from $30B to $20B, with $11B secured so far."
      },
      {
        "title": "Re:Build, which spun out Slate Auto, raises $2.1B",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/27/rebuild-which-spun-out-slate-auto-raises-2-1b",
        "img": "https://techcrunch.com/wp-content/uploads/2026/06/slate-auto-truck-tesla-charging.jpg",
        "why": "A manufacturing accelerator with 2.4 million sq ft of US factory space, led by General Catalyst."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Gross GST collections hit ₹2.31 lakh crore in October, a 22.9% YoY rise",
        "source": "Business Today",
        "url": "https://www.businesstoday.in/india/story/gross-gst-collections-hit-rs2-31-lakh-crore-in-october-marks-22-9-yoy-rise-on-robust-domestic-growth-564976-2026-11-01",
        "img": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202611/6ae6e5bfd237d-total-refunds-disbursed-during-october-2026-increased-by-65-year-on-year-to-27-934-crore--up-from-010950497-16x9.jpg",
        "why": "Domestic revenue rose 15.8% and import revenue 42.2%; net GST was up 25.6%."
      },
      {
        "title": "FPIs withdraw ₹34,843 crore from Indian equities in October, turn net buyers in final week",
        "source": "Free Press Journal",
        "url": "https://www.freepressjournal.in/business/fpis-withdraw-34843-crore-from-indian-equities-in-october-turn-net-buyers-in-final-week",
        "img": "https://media.assettype.com/freepressjournal/2026-11-01/3grdtfu6/fpis-outflow.jpg",
        "why": "A second straight month of heavy selling, but about ₹6,300 crore came back in the last week."
      },
      {
        "title": "Gold pulls forex reserves down for seventh straight week to $719.8 billion",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/gold-pulls-forex-reserves-down-for-seventh-straight-week-to-719-8-billion-126103001414_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2020-02/07/thumb/fitandfill/1200X628/1581091561-2435.png",
        "why": "Reserves are $66 billion below September's record of $785.7 billion; the rupee is near 95 per dollar."
      }
    ]
  }
];

const CALENDAR = [
  {
    "day": "Mon 2 Nov",
    "items": [
      {
        "time": "All day",
        "title": "overgrwth: renders"
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
    "title": "Café del Mar",
    "artist": "Energy 52",
    "id": "57Og0l7MDIqHI2n1UTw6YK",
    "why": "A classic Balearic trance anthem with the same slow-building melodic lift as the Three Drives and Matt Darey records in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "Matt Darey",
    "Three Drives",
    "Lost Tribe",
    "Rank 1",
    "Tillmann Uhrmacher",
    "CRW"
  ]
};

const LEARN = {
  "term": "Shut lines, gap and flush",
  "body": "A shut line is the visible joint between two parts, such as a door and a body side, and it is specified by two numbers: gap (the width across the joint) and flush (the step in height between the two surfaces). Customers rarely notice a gap's absolute width; they notice variation, so a gap that tapers along its length or differs from its mirror on the other side reads as poor quality even when it is within tolerance. That is why studios specify parallelism and side-to-side symmetry alongside the nominal gap, and why flush errors, which break reflections across the joint, often look worse than a slightly wide gap. Designers manage shut lines by placing them where they will be least seen or most deliberate: along feature lines, in shadowed undercuts, or as clean graphic lines that the form is composed around. The popular belief that the narrowest gap is always best is overstated: a tight gap that cannot be held consistently in production looks worse than a slightly wider one built to be even.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Gap",
        "note": "Width across the joint, held even."
      },
      {
        "label": "Flush",
        "note": "Surface step; breaks reflections if off.",
        "hl": true
      },
      {
        "label": "Parallel",
        "note": "No taper along the line, matched L to R."
      },
      {
        "label": "Placement",
        "note": "Hide in shadow or make it a feature line."
      }
    ],
    "caption": "The eye reads variation, not width."
  },
  "past": [
    "Class-A surfacing and highlight lines",
    "Affordances and signifiers",
    "Gestalt principles in product form",
    "The golden ratio: use and myth",
    "Draft angles and the parting line"
  ]
};

const DESIGN = {
  "name": "Citroën DS",
  "designer": "Flaminio Bertoni (body), with André Lefèbvre (engineering)",
  "year": "1955",
  "why": "Bertoni gave the DS a low, tapering body with a single-spoke wheel and a fibreglass roof, so the car looked like nothing else at the 1955 Paris Salon. Its form and its hydropneumatic suspension were conceived together, which is why the shape still reads as a coherent idea rather than styling over a chassis.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/1955_Citro%C3%ABn_DS_19_Museo_Nazionale_dell'automobile_Torino.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:1955_Citro%C3%ABn_DS_19_Museo_Nazionale_dell'automobile_Torino.jpg"
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
      "model": "Mini Cooper SE (2nd gen)",
      "when": "27 Nov 2026",
      "price": "TBA"
    }
  ],
  "source": {
    "name": "Autocar India: upcoming car launches in November 2026; upcoming bikes",
    "url": "https://www.autocarindia.com/car-news/upcoming-car-launches-in-november-2026-441173"
  }
};

