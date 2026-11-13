// Daily data for abkgpta.github.io/daily. Rewritten every morning.
const UPDATED = "13 Nov 2026, 6:56 AM IST";

const QUOTE = {
  "text": "Recognizing the need is the primary condition for design.",
  "author": "Charles Eames"
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
    "topic": "Automotive",
    "stories": [
      {
        "title": "Kia plans $2 billion Andhra expansion, capacity to hit 630,000 units",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/industry/agriculture/kia-india-andhra-pradesh-expansion-2-billion-capacity-630000-units-126111200365_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-11/12/thumb/fitandfill/1200X628/1794471694-3869.jpeg",
        "why": "Kia India's roughly $2 billion expansion lifts capacity from 430,000 to 630,000 units, with 12,000 jobs expected."
      },
      {
        "title": "Annual electric car and SUV sales cross 300,000 units for the first time in India",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/analysis-sales/annual-electric-car-and-suv-sales-cross-300000-units-for-the-first-time-in-india-135863",
        "img": "https://img.autocarpro.in/autocarpro/cd691491-35b2-4f40-8cd4-c19c42c4e46a_Lead-pic-for-CY2026-YTD-ePV-sales-AD.jpg",
        "why": "Electric PV retail reached 304,701 units by 9 November, up 66%; Tata leads with about 40% share."
      },
      {
        "title": "JLR suffers legal setback in BYD dispute as Dutch court orders files destroyed",
        "source": "Motor1",
        "url": "https://www.motor1.com/news/815239/byd-ti7-court-ruling-files/",
        "img": "https://cdn.motor1.com/images/mgl/ZnlN7Z/s1/byd-ti-7.jpg",
        "why": "A Hague court told JLR to return or destroy files seized from BYD; the Ti7 design dispute remains open."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Two rounds to go: the story behind the 2026 title fight",
        "source": "motogp.com",
        "url": "https://www.motogp.com/en/news/2026/11/11/two-rounds-to-go-the-story-behind-the-2026-title-fight/1184983",
        "img": "https://resources.motogp.pulselive.com/photo-resources/2026/11/10/f4088472-8143-40a4-9c57-202d191ac542/MM-JM-MB-COVER.jpg",
        "why": "Marc Marquez could seal the title in Portugal; Martin trails by 60 points and Bezzecchi by 74."
      },
      {
        "title": "Ola Electric Q2 loss widens to Rs 362 crore as revenue falls 39%",
        "source": "Autocar Professional",
        "url": "https://www.autocarpro.in/news/ola-electric-q2-loss-widens-to-rs-362-crore-as-revenue-falls-39-percent-135880",
        "img": "https://img.autocarpro.in/autocarpro/bc4f2e89-2a56-4776-9a22-e3bfd0b00464_image.png",
        "why": "September-quarter revenue fell 39% to Rs 421 crore; the auditor qualified its review over a Rs 57 crore PLI provision."
      },
      {
        "title": "New Yamaha Xenter E scooter debuts – 16\" wheels, 108 km range",
        "source": "Rushlane",
        "url": "https://www.rushlane.com/new-yamaha-xenter-e-scooter-debuts-16-wheels-108-km-range-12560930.html",
        "img": "https://www.rushlane.com/wp-content/uploads/2026/11/yamaha-xenter-e-scooter-debuts-at-eicma-8.jpg",
        "why": "Yamaha's big-wheel electric scooter gets a 3.5 kWh battery and 108 km claimed range; Europe gets it in spring 2027."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "SoftBank leads $500M funding round in Agile Robots",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/12/softbank-leads-500m-funding-round-in-agile-robots/",
        "img": "https://cdn.tech.eu/uploads/2026/11/agile-robots-kapak-905-12.png",
        "why": "Munich robotics maker's $500M Series F values it at $8.5bn; funds go to US expansion and production."
      },
      {
        "title": "Dhruva Space to raise $15.5 Mn in pre-Series B; revenue surges 8X",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-dhruva-space-to-raise-155-mn-in-pre-series-b-revenue-surges-8x-12803436",
        "img": "https://img-cdn.publive.online/entrackr/media/media_files/fit-in/1200x675/2026/11/12/dhruva-space-2026-11-12-13-16-30.png",
        "why": "Hyderabad spacetech's round is led by IndusBridge Ventures; FY26 operating revenue rose to Rs 79 Cr from Rs 10 Cr."
      },
      {
        "title": "Spacetech: Europe's 10 most-funded companies in H1 2026",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/11/12/spacetech-europes-10-most-funded-companies-in-h1-2026/",
        "img": "https://cdn.tech.eu/uploads/2026/11/spacetech-featured-961.png",
        "why": "European spacetech raised about €2.8bn in H1 2026, led by Eutelsat's €975M debt financing."
      }
    ]
  },
  {
    "topic": "Startups & Indian startups",
    "stories": [
      {
        "title": "Greenjoules raises Rs 150 Cr in Series B led by Amazon funds, secures Rs 100 Cr loan from TDB",
        "source": "Entrackr",
        "url": "https://entrackr.com/news/greenjoules-raises-rs-150-cr-in-series-b-led-by-amazon-funds-secures-rs-100-cr-loan-from-tdb-12801123",
        "img": "https://img-cdn.publive.online/entrackr/media/media_files/fit-in/1200x675/2026/11/11/greenjoules-2026-11-11-16-27-43.png",
        "why": "Pune farm-waste-to-fuel firm also gets a Rs 100 Cr government loan to build a plant in Khed City."
      },
      {
        "title": "Rigi kicks off fresh investment from Google",
        "source": "Entrackr",
        "url": "https://entrackr.com/exclusive/exclusive-rigi-kicks-off-fresh-investment-from-google-12802768",
        "img": "https://img-cdn.publive.online/entrackr/media/media_files/fit-in/1200x675/2026/11/12/rigi-tv-2026-11-12-10-48-55.png",
        "why": "Google International put Rs 10 Cr into the creator-economy startup for 1.43%, valuing it at about Rs 670 Cr."
      },
      {
        "title": "Wakefit posts Rs 452 Cr revenue and Rs 27 Cr PBT in Q2 FY27",
        "source": "Entrackr",
        "url": "https://entrackr.com/fintrackr/wakefit-posts-rs-452-cr-revenue-and-rs-27-cr-pbt-in-q2-fy27-12804662",
        "img": "https://img-cdn.publive.online/entrackr/media/media_files/fit-in/1200x675/2026/11/12/wakefit-2-2026-11-12-21-26-02.png",
        "why": "Q2 revenue rose 19.9% year on year to Rs 452 Cr; profit before tax climbed 66.3% to Rs 26.54 Cr."
      }
    ]
  },
  {
    "topic": "Indian business",
    "stories": [
      {
        "title": "Retail inflation at 6.09% in October, breaches RBI's upper band after 2 yrs",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/economy/news/retail-inflation-at-6-09-in-october-breaches-rbi-s-upper-band-after-2-yrs-126111201088_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-03/06/thumb/fitandfill/1200X628/1772817722-2989.jpg",
        "why": "CPI rose to 6.09% from 5.54% in September, with food inflation at 8.94% and onion prices up 116%."
      },
      {
        "title": "Godrej Capital raises ₹2,500 crore from Temasek at ₹28,000 crore valuation",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/news/godrej-capital-raises-2-500-crore-from-temasek-at-28-000-crore-valuation-126111200763_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/17/thumb/fitandfill/1200X628/1681730095-6653.jpg",
        "why": "The group keeps about 80% and targets ₹1 trillion AUM by 2031."
      },
      {
        "title": "Vodafone Idea's Q2 loss widens to ₹5,975 cr; co raises additional ₹4K cr",
        "source": "Business Standard",
        "url": "https://www.business-standard.com/companies/quarterly-results/vodafone-idea-q2-loss-widens-to-5-975-crore-despite-higher-arpu-revenue-126111201639_1.html",
        "img": "https://bsmedia.business-standard.com/_media/bs/img/article/2026-08/13/thumb/fitandfill/1200X628/1786644475-642.gif",
        "why": "Loss beat estimates for the worse even as revenue rose 6% to ₹11,884 crore and ARPU rose 9.7% to ₹198."
      }
    ]
  },
  {
    "topic": "Design & 3D tools",
    "stories": [
      {
        "title": "Sony brings back 1979 wired Walkman headphones design",
        "source": "Core77",
        "url": "https://www.core77.com/posts/145875/Sony-Brings-Back-1979-Wired-Walkman-Headphones-Design",
        "img": "https://s3files.core77.com/blog/images/lead_n_spotlight/1856616_lead_400_145875_.jpeg",
        "why": "Sony's $60 MDR-3R revives the original Walkman headphones with a USB-C cable, inline controls and more bass."
      },
      {
        "title": "Edit your Blender animations just like editing mesh with this free tool",
        "source": "80 Level",
        "url": "https://80.lv/articles/edit-your-blender-animations-just-like-editing-mesh-with-this-free-tool",
        "img": "https://cdn.80.lv/api/upload/meta/50982/images/6af49b53044b2/contain_1200x630.jpg",
        "why": "The free Editable Motion Paths add-on turns animation into editable curves and works with existing rigs."
      },
      {
        "title": "The Symbiotic 3026: an indoor beehive",
        "source": "Core77",
        "url": "https://www.core77.com/posts/145879/The-Symbiotic-3026-An-Indoor-Beehive",
        "img": "https://s3files.core77.com/blog/images/lead_n_spotlight/1856679_lead_400_145879_.jpg",
        "why": "Futuristic Beehive's $600 sealed indoor hive uses a 20mm wall-entry tube and a honey-collection funnel."
      }
    ]
  }
];

const CALENDAR = [
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
    "title": "Music Is Math",
    "artist": "Boards of Canada",
    "id": "3MF9cjIlg3R9osw3SgRmEb",
    "why": "From Geogaddi (Warp, 2002): hazy, analogue electronica that sits between the Aphex Twin and C418 in your recent plays."
  },
  "playlist": {
    "name": "Weekly Discovery Trance Gems",
    "url": "https://open.spotify.com/playlist/3WkkjjVLA0nN4sc3HpU95t",
    "date": "2026-11-02"
  },
  "lately": [
    "C418",
    "Animal Collective",
    "Deftones",
    "Medasin",
    "Aphex Twin",
    "LCD Soundsystem"
  ]
};

const LEARN = {
  "term": "The Ulm School (HfG Ulm)",
  "body": "The Hochschule für Gestaltung Ulm (1953–1968), founded by Inge Aicher-Scholl, Otl Aicher and Max Bill, is often called the 'new Bauhaus', but that label only fits its first years under Bill. From the late 1950s Tomás Maldonado pushed it away from art-based form-giving towards design as a rational, scientific discipline, drawing on ergonomics, semiotics, operations research and systems thinking. Its signature output was the modular system rather than the single object: Hans Gugelot's work with Braun, including the SK 4 with Dieter Rams, and Otl Aicher's 1962 Lufthansa identity show design as a set of rules applied across many products. The 'Ulm method' made design something that could be argued, specified and handed to engineers, which is why its influence on corporate product programmes outlasted the school itself. Its critics, and later some of its own staff, argued that the pure method left too little room for meaning and play, a tension that resurfaced in the product semantics movement of the 1980s.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "1953",
        "note": "Bill: Bauhaus-style art and form"
      },
      {
        "label": "Method",
        "note": "Maldonado: science, semiotics, ergonomics",
        "hl": true
      },
      {
        "label": "Systems",
        "note": "Braun SK 4, Lufthansa: rules over objects"
      },
      {
        "label": "1968",
        "note": "School closes; the method spreads"
      }
    ],
    "caption": "Ulm turned form-giving into a rational, teachable method."
  },
  "source": {
    "name": "Encyclopaedia Britannica: Ulm School of Design",
    "url": "https://www.britannica.com/topic/Ulm-School-of-Design"
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
  "name": "Bialetti Moka Express",
  "designer": "Alfonso Bialetti",
  "year": "1933",
  "why": "Its octagonal cast-aluminium body turns a three-part pressure brewer into one object that is cheap to make, easy to grip and instantly recognisable. Nearly a century on the form is almost unchanged, proof that a design solving a real everyday need can outlive every styling trend around it.",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Moka_Express_Bialetti.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Moka_Express_Bialetti.jpg"
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
      "price": "₹5.25–6 lakh"
    },
    {
      "model": "Honda Rebel 500",
      "when": "Nov 2026",
      "price": "₹4.4–4.6 lakh"
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
    }
  ],
  "source": {
    "name": "Autocar India: upcoming cars and bikes",
    "url": "https://www.autocarindia.com/upcoming-cars"
  }
};
