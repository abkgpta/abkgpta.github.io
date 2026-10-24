// Daily data for abkgpta.github.io/daily. Rewritten every morning.
// CALENDAR, STRAVA, MUSIC and MUSIC_HISTORY are encrypted in PRIVATE (see tools/seal.mjs).
const UPDATED = "25 Oct 2026, 1:15 AM IST";

const QUOTE = {
  "text": "The best way to predict the future is to invent it.",
  "author": "Alan Kay"
};

const NOW = [
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
    "name": "Celestial",
    "date": "13 Oct",
    "note": "A 3D research tool that maps a question as a solar system of related topics.",
    "url": "https://abkgpta.github.io/celestial/"
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
        "title": "From Even Health To The Pant Project — Indian Startups Raised Over $184 Mn This Week",
        "source": "Inc42",
        "url": "https://inc42.com/buzz/from-even-health-to-the-pant-project-indian-startups-raised-over-184-mn-this-week/",
        "img": "https://asset.inc42.com/2026/10/FG_Oct-23-Soc-100.jpg",
        "why": "Over $184M across 17 deals in the week of 19–23 Oct, about a fifth less than the week before."
      },
      {
        "title": "Funding and acquisitions in Indian startups this week [Oct 19 – Oct 24]",
        "source": "Entrackr",
        "url": "https://entrackr.com/report/weekly-funding-report/funding-and-acquisitions-in-indian-startups-this-week-oct-19-oct-24-12744844",
        "img": "https://img-cdn.publive.online/fit-in/1200x675/entrackr/media/media_files/2026/10/23/feature-image-2026-10-23-21-08-45.png",
        "why": "$133.9M across 15 startups by Entrackr's count, down 56% from the week before."
      },
      {
        "title": "OpenAI working on new $30B raise at $1.25T valuation ahead of IPO",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/22/openai-working-on-new-30b-raise-at-1-25t-valuation-ahead-of-ipo",
        "img": "https://techcrunch.com/wp-content/uploads/2023/11/Sam-Altman-OpenAI.jpg?resize=1200,680",
        "why": "Reportedly seeking up to $30B at a $1.25 trillion valuation."
      }
    ]
  },
  {
    "topic": "Deep tech",
    "stories": [
      {
        "title": "DeepSeek reportedly raises $15B days after US restrictions",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/22/deepseek-reportedly-raises-15b-days-after-us-restrictions/",
        "img": "https://techcrunch.com/wp-content/uploads/2025/01/deepseek-2.jpg?resize=1200,800",
        "why": "A reported raise of about $15B (roughly 100 billion yuan); no valuation was given."
      },
      {
        "title": "Eka is worth $1.45B thanks to a physical AI model that has experts raving",
        "source": "TechCrunch",
        "url": "https://techcrunch.com/2026/10/20/eka-is-worth-1-45-billion-thanks-to-a-physical-ai-model-that-has-experts-raving/",
        "img": "https://techcrunch.com/wp-content/uploads/2026/10/Screenshot-2026-10-19-at-1.21.23-PM.png?resize=1200,974",
        "why": "Robotics startup Eka raised a $150M Series A led by a16z and F-Prime."
      },
      {
        "title": "Anglo-Finnish Oxford University quantum spinout QuantrolOx raises €12M",
        "source": "Tech.eu",
        "url": "https://tech.eu/2026/10/22/anglo-finnish-oxford-university-quantum-spinout-raises-eur12m",
        "img": "https://cdn.tech.eu/uploads/2026/10/smart-2-516.jpg",
        "why": "Series A to grow its software for calibrating and running quantum hardware."
      }
    ]
  },
  {
    "topic": "Motorcycles",
    "stories": [
      {
        "title": "Bajaj Pulsar N250SS launched at Rs 1.59 lakh",
        "source": "Autocar India",
        "url": "https://autocarindia.com/bike-news/bajaj-pulsar-n250ss-launched-at-rs-159-lakh-441093",
        "img": "https://asset.autocarindia.com/static/news/images/20261021_074233_4d021b76.jpg",
        "why": "The range-topping N250 gets a four-valve engine, six-speed gearbox and a standard quickshifter, for about ₹14,000 more."
      },
      {
        "title": "Aprilia RS 660 Phillip Island Tribute celebrates “unbreakable bond” as MotoGP leaves circuit",
        "source": "Visordown",
        "url": "https://www.visordown.com/news/aprilia-rs-660-phillip-island-tribute-celebrates-unbreakable-bond-motogp-leaves-circuit",
        "img": "https://www.visordown.com/sites/default/files/2026-10/07-aprilia-rs660-phillip-island-tribute.jpg?width=1600&aspect_ratio=16:9",
        "why": "A limited edition marking MotoGP's move from Phillip Island to Adelaide in 2027."
      },
      {
        "title": "September 2026 two-wheeler sales: Hero reclaims top spot",
        "source": "Autocar India",
        "url": "https://www.autocarindia.com/industry/september-2026-two-wheeler-sales-hero-reclaims-top-spot-440944",
        "img": "https://asset.autocarindia.com/static/news/images/20261007_074919_63c46e84.jpeg",
        "why": "Hero sold 7,66,348 units, up 12% year on year, ahead of Honda's 7,06,266."
      }
    ]
  }
];

const RACING = {
  "items": [
    {
      "when": "23–25 Oct",
      "what": "MotoGP: Australian GP, Phillip Island"
    },
    {
      "when": "30 Oct–1 Nov",
      "what": "MotoGP: Malaysian GP, Sepang"
    },
    {
      "when": "6–8 Nov",
      "what": "MotoGP: Qatar GP, Lusail (rescheduled)"
    }
  ],
  "note": "Qatar's new date was still awaiting final confirmation in late September.",
  "source": {
    "name": "RTR Sports, MotoGP 2026 calendar",
    "url": "https://rtrsports.com/en/blog/calendar-motogp-2026/"
  }
};

const LEARN = {
  "term": "Surface continuity: G0 to G3",
  "body": "Continuity describes how smoothly two surfaces meet at a shared edge. G0 means the edges simply touch, so there can be a sharp crease. G1 matches the tangent direction, so there is no crease, but reflections still show a visible kink where the curvature suddenly changes. G2 matches curvature as well, so highlights flow across the join unbroken; this is the usual baseline for Class-A automotive and product surfaces. G3 also matches how fast curvature is changing, giving even softer, more liquid reflections at the cost of heavier geometry.",
  "diagram": {
    "type": "flow",
    "steps": [
      {
        "label": "G0",
        "note": "Position. Edges touch; a crease is allowed."
      },
      {
        "label": "G1",
        "note": "Tangent. No crease, but highlights kink."
      },
      {
        "label": "G2",
        "note": "Curvature. Highlights flow across.",
        "hl": true
      },
      {
        "label": "G3",
        "note": "Curvature rate. Softest reflections."
      }
    ],
    "caption": "Each level adds one more match. Pink = Class-A baseline."
  },
  "past": []
};

const DESIGN = {
  "name": "Ducati Monster (M900)",
  "designer": "Miguel Galluzzi",
  "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_Monster_900_del_1993.jpg?width=1200",
  "imgCredit": {
    "name": "Wikimedia Commons",
    "url": "https://commons.wikimedia.org/wiki/File:Ducati_Monster_900_del_1993.jpg"
  },
  "year": "1993",
  "why": "It stripped a sportbike down to an exposed trellis frame, a big tank and a round headlight, and turned the 'naked' bike into a category of its own. A lesson in getting character from structure you would normally hide."
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
      "model": "Royal Enfield Himalayan 750",
      "when": "Dec 2026",
      "price": "₹4.50–5.00 lakh"
    }
  ],
  "source": {
    "name": "Autocar India, upcoming bikes",
    "url": "https://www.autocarindia.com/upcoming-bikes"
  }
};

const PRIVATE = {"v":1,"iter":250000,"salt":"7pbiQ14hsWwV1P/FAKwXJQ==","iv":"O8f8MFDyzwUryxZX","data":"lrgMLJ6PC4gGv1wmmweYylZAnzrFtGwXaeOuG8butOYn31jwu81lOeFIgniZISkolVhCiwwEYdTMpOBTVzNI4fxSFUwatlfvb1IzaEI/AKRtB+KQedRfMx7vrgFXhVqBmcmiUN8QwXFtmzmdzYd9COF7W7KupAi9EA5UICLhSemNg6eEmhFyfuJ82mar5KF4CuiopaBzjz3uxtm9ThsZIOceyf3JVewnHHmq9nBkc2WKY5HvqEq4XJUmsFr56kQBymVH2FndtAXDuKx9w9I/jS/uuqIQFXqr0bZ3QXvkbnY9GAyo0lnTGM+1LHatJjx74mGCfG3ViK6xEuXziC2UOp7pPKPdCZSdqkStLwkfMClD/rnMzdvyZUYj5lXp0vOM2bNMHLoWc/TLUMb+Jw+p2E5q9J11R/tBADNkoKY8Vp+2OcbVTe0XVTy3YPcPnw6ujJPKe7fC0aQ18J9ESxk8rcibmA14z4mSZUT6w8fCRIAMg3tx1qM2jGigu5ObFg8GqhihJdfvxOqrS+XATb0YW6uvWoIiltVXuqEARJ1Ae2JfzL1QvP08Khi68lHTt6/tTXXr5hMbpmpuu5dRguIsRlI4okhMDkSKcLwiDlbBwgpqrnz+Scn0pK17oAOf0/UL4sw2+sdWhKXxJ/sSJf7DGYP88KM3Rs9iWUBi4W4fHTUUANy+aEwGeHxNmACkgNRKm14udBK6ODZna1YUqDyOUwQgrB5j/xCBQoIEysmbmFcISy04M3R21GbdQmp7t97FXuVNgs8ASLuVSQPab2BKdufelCiLjiW1qb2X4O7V9Aowrn9vaGwhfdT/KGmG6e/kKvarhvlfpQOJOOm53Hu3ooVdPiFYB31jySFqr7ivEcAawzBRYNuLlXgWsabXcwZjA32EYr2rT9QNbfpeog7WSFJPZc/mkaTz0qFDmTZpknCt93pfnYZqDF5/bYKVCM0qJN+efYEXZGaVMJqBy81Kdbg6mprA+cM9ie5mzxaqzgdjhx3fIHOLzYmHHjB1uxwdCjOdP2supMtcoFlw8ugkyjIYizy/gSD8Ib7ctsY1/eBJN57h2EBzEClCBAdB4sb/2OS/8yjX8qgE2omahhSDbNNtGEsYN4VNi/n5DJ4M7hBE9s1z7NI3a3HWnX6xCYntmM91F2ZknQjPzYnsrNcC2g60iXAx2eJNAPiCpxfsm4cZvFQK2mNelNNWHdL8ROr1GcFvevOZ3xay5xJwRRm47C3WMmu86ejE3EC3unHzuUmeGfAjLhI79iHzf2bX8Xwz9xQTzE0NgzKqnK8Y+Ry7Z6/dYAvvW3eyxVoUghWL7tc+NySRBt4GyTv6tE6TPuOa2kO7uSK3iyWN6CRW+4dL2Ihv1qsiprcScH+sA6CPZmTHyuwMdnDtOIum90zVp6dkFSSwtB97dR1Wq1uP37ZlnDTeRDmcwXSPs7bmKLY8dtDH5ezDEyIihR0BZk1G8X3BPU3Sf7RlEa9hBEvXCBPfiMDZ4P6BfG9ynQ+Gn6ydJCRQesavVqauiIMwRBsoQwh2Yj57sRPdQwipTuGcM1Ea8h0mMgsMN3KHVho8zxKRXFXhTE+m4VgbjqeONibGivuoDThEIr4CRreZqQovMIkqDb0AFSBopexZVl8/JvsIlRpCh6AbOm4i3j8VDRFb9E2VVy+UIBh2ovpSbE0b7xP3eKaF4oduWysAD9G7UOkSgGtkyUINJG9t6vhvICiFqCXhed88ZS19N5RjX0td"};
