// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "24 Nov 2026, 6:53 AM IST";

const QUOTE = {
  "text": "Design is thinking made visual.",
  "author": "Saul Bass"
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
    "topic": "Deep tech",
    "stories": [
      {
        "title": "Elon Musk and others rejoice as Jensen Huang is reinstated at Nvidia amid scandal",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/23/elon-musk-and-others-rejoice-as-jensen-huang-is-reinstated-at-nvidia-amid-scandal/",
        "img": "https://techcrunch.com/wp-content/uploads/2025/08/GettyImages-2227140868.jpg",
        "why": "Huang is back as Nvidia CEO and president after a 200,000-signature open letter; he testifies to the Senate on 3 Dec."
      },
      {
        "title": "Amazon snaps up Decart's AI optimization tech for $7.5B as it prepares to sell Trainium chips",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/23/amazon-snaps-up-decarts-ai-optimization-tech-for-7-5b-as-it-prepares-to-sell-trainium-chips/",
        "img": "https://techcrunch.com/wp-content/uploads/2024/12/Decart-Founders-Dean-Leitersdorf-CEO-and-Moshe-Shalev-CPO.jpg",
        "why": "Amazon is paying $7.5 billion, per Bloomberg, for Decart's optimization stack and team as it readies Trainium chip sales."
      },
      {
        "title": "Megaspeed, the company at the center of the Jensen Huang scandal, appears headed for a U.S. blacklist",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/11/23/megaspeed-the-company-at-the-center-of-the-jensen-huang-scandal-appears-headed-for-a-u-s-blacklist/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/11/GettyImages-2303986898.jpg",
        "why": "Per Semafor, Megaspeed will join the Commerce Entity List after a criminal probe; the company denies wrongdoing."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Talking Points: \"This is the best Marc\"",
        "source": "MotoGP",
        "url": "https://www.motogp.com/en/news/2026/11/23/talking-points-this-is-the-best-marc/1267832",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/23/8abc6f53-acdc-4d5d-a66e-b860073094b7/_DS_5086-1-.jpg",
        "why": "Marquez overturned a 102-point deficit for his eighth crown; Valencia closes the season this weekend."
      },
      {
        "title": "New Honda Rebel 500 Launch Price Rs 4.5 Lakh, E-Clutch Rs 40k More",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-honda-rebel-500-launch-price-rs-4-5-lakh-e-clutch-rs-40k-more-12561599.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/new-honda-rebel-500-launch-india-3.jpg",
        "why": "Down from Rs 5.12 lakh as an import; the 471cc twin makes 46 bhp, with an E-Clutch option at Rs 4.9 lakh."
      },
      {
        "title": "Hero Dispatched 15k Units of Flex Fuel E85 Bikes – Splendor+, HF Deluxe",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/hero-dispatched-15k-units-of-flex-fuel-e85-bikes-splendor-hf-deluxe-12561591.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/06/hero-splendor-flex-fuel-discount-offer-1.jpeg",
        "why": "About 15k E85 flex-fuel commuters shipped since June, per Hero's Q2 FY27 call; Splendor+ Flex starts at Rs 82,710."
      }
    ]
  },
  {
    "topic": "Automotive",
    "stories": [
      {
        "title": "4.5m to 5m SUV Sales Oct 2026 – Scorpio, XUV7XO, XEV 9S, Fortuner, Harrier, Safari, Sorento, VF7, Tomahawk",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/4-5m-to-5m-suv-sales-oct-2026-scorpio-xuv7xo-xev-9s-fortuner-12561763.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/09/mahindra-xuv-7xo-sales-new-month.jpg",
        "why": "The segment hit 53,618 units in October, up 24.96%; Scorpio led with 19,353."
      },
      {
        "title": "New Hyundai 7 Seater Hybrid SUV Spied – To Rival Mahindra XUV7XO",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-hyundai-7-seater-hybrid-suv-spied-to-rival-mahindra-xuv7xo-12561746.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/New-Hyundai-7-Seater-Hybrid-SUV-Spied-2.jpg",
        "why": "Codenamed Ni1i, the hybrid three-row SUV is reported for late 2027 or 2028; Hyundai hasn't confirmed timing."
      },
      {
        "title": "BYD Ti 9 SUV Launched With Folding Steering Wheel – 1,630 Km Claimed Range",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/byd-ti-9-suv-launched-with-folding-steering-wheel-12561661.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/byd-suv-foldable-steering-launch-price.jpg",
        "why": "A 400 kW plug-in hybrid with a folding wheel and 1,630 km claimed range, from 279,900 yuan in China."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Google expands support for Indian startups with AI-focused Momentum push",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/technology/tech-reviews/google-expands-support-for-indian-startups-with-ai-focused-momentum-push-126112301052_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-10/30/thumb/fitandfill/1200X628/1793331345-4633.jpg",
        "why": "Momentum bundles AI models, cloud and engineering help; SpotDraft cut latency 70% and costs 80% with Gemini."
      },
      {
        "title": "[Update] WazirX, ZebPay Among Platforms Impacted By MoEngage Data Breach",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/now-moengage-suffers-cybersecurity-attack-due-to-compromised-third-party-vendor/",
        "img": "https://asset.inc42.com/2026/11/Cyberattack-social.png",
        "why": "A compromised vendor hit MoEngage; it says under 1% of accounts were affected, some locked out for nearly a week."
      },
      {
        "title": "Scaler Cofounder Anshuman Singh Unveils AI Training Data Venture Arcfront",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/scaler-cofounder-anshuman-singh-unveils-ai-training-data-venture-arcfront",
        "img": "https://asset.inc42.com/2026/11/Untitled-Design-3.png",
        "why": "Singh says four of the five frontier AI labs became customers in under a year."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Tata Steel divests tubes biz: Will it unlock value? What analysts say",
        "source": "Business Standard",
        "url": "https://business-standard.com/markets/news/tata-steel-share-price-tata-steel-divests-tubes-biz-will-it-unlock-value-what-analysts-say-126112300236_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-04/11/thumb/featurecrop/1200X628/1744395575-361.jpg",
        "why": "The tubes and Tata Steel Colors sale is worth up to ₹28,000 crore; the stock fell 6.04% to ₹167."
      },
      {
        "title": "Stop publishing grey mkt premiums for IPOs: Sebi to market players",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/markets/news/sebi-asks-market-players-to-stop-publishing-grey-market-premiums-for-ipos-126112301145_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-09/22/thumb/fitandfill/1200X628/1790048651-6838.jpg",
        "why": "Sebi told all registered intermediaries to stop publishing grey market premium figures for upcoming IPOs."
      },
      {
        "title": "Nasscom seeks AI scheme, easier Esop tax rules in Union Budget 2027-28",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/nasscom-seeks-ai-transformation-scheme-esop-tax-relief-in-budget-2027-126112301138_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/06/thumb/fitandfill/1200X628/1736146426-3647.jpg",
        "why": "Nasscom wants the salary cap for job-linked tax incentives raised from ₹25,000 to ₹1 lakh a month."
      }
    ]
  }
];

const CALENDAR = [
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
  }
];

const RACING = {
  "items": [
    {
      "when": "27–29 Nov",
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
  "note": "Sunday in Portugal: Bezzecchi won ahead of Martin and Raul Fernandez for an Aprilia podium sweep. Marc Marquez finished eighth to clinch the 2026 title, his eighth in the premier class, tying Agostini's record.",
  "source": {
    "name": "motogp.com: Portuguese GP highlights",
    "url": "https://www.motogp.com/en/videos/2026/11/22/motogp-highlights-the-key-moments-from-the-2026-portuguese-grand-prix/1267534"
  }
};

const STRAVA = {
  "period": "last 30 days",
  "runs": 5,
  "km": "20.0",
  "latest": {
    "date": "22 Nov",
    "km": "11.0",
    "pace": "8:27"
  }
};

const MUSIC = {
  "song": {
    "title": "After The Rain",
    "artist": "Overmono",
    "id": "0rclr5nd7iwF4rJTYRLlJq",
    "why": "From Overmono's Pure Devotion: UK breakbeat-house that sits between the Bicep and Vegyn in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery: Electronic Explorations",
    "url": "https://open.spotify.com/playlist/0bjn5wWlxFPY44ColrnZPc",
    "date": "2026-11-23"
  },
  "lately": [
    "Vegyn",
    "Kaikobad",
    "Tom VR",
    "Placid Angles",
    "Max Cooper",
    "Yagya"
  ]
};

const LEARN = {
  "term": "Poka-yoke: designing out mistakes",
  "body": "Poka-yoke, Japanese for 'mistake-proofing', was formalised by Shigeo Shingo within the Toyota Production System in the 1960s; he renamed it from baka-yoke ('fool-proofing') because the point is that errors come from the design of the task, not from foolish people. Shingo split devices into control types, which physically stop a wrong action, and warning types, which only signal it, and into contact, fixed-value and motion-step methods depending on what they sense. For a product designer this becomes geometry: keyed or asymmetric connectors, locating pins and datum features that allow only one assembly orientation, a chamfered corner on a SIM tray, a fuel nozzle that will not fit the wrong filler. The strongest move is to remove the decision altogether, as a reversible plug like USB-C does, rather than to key it, and a warning beep or label is the weakest form. The idea is often overstated as making products 'idiot-proof': it targets predictable slips during assembly and use, not misuse or deliberate workarounds, and every added key or interlock has a cost in tooling, parts and user friction.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "Eliminate",
        "note": "Remove the choice: a reversible plug",
        "hl": true
      },
      {
        "label": "Control",
        "note": "Keyed shapes block wrong assembly"
      },
      {
        "label": "Warn",
        "note": "Click, light or beep flags the slip"
      }
    ],
    "caption": "Design out the mistake before you warn about it."
  },
  "source": {
    "name": "Wikipedia: Poka-yoke",
    "url": "https://en.wikipedia.org/wiki/Poka-yoke"
  },
  "past": [
    "The Bauhaus: what it actually taught",
    "Wabi-sabi and designing for patina",
    "Dieter Rams' ten principles",
    "Form follows function: what Sullivan meant",
    "Snap-fit cantilever design"
  ]
};

const DESIGN = {
  "name": "Vitsœ 606 Universal Shelving System",
  "designer": "Dieter Rams",
  "year": "1960",
  "why": "Rams designed it as a system rather than a piece of furniture: slim aluminium E-tracks fixed to the wall carry shelves, cabinets and tables that can be added, moved or taken away as needs change. It is still made by Vitsœ with parts compatible with the originals, a rare case of a product designed to be kept for decades.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/606-Universal-Shelving-System.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:606-Universal-Shelving-System.jpg"
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

