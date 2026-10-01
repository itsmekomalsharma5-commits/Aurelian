export const INITIAL_DATA = {
  categories: [
    {
      id: "rings",
      slug: "rings",
      title: "Rings",
      description: "Exceptional solitaires, eternity bands, and imperial cocktail rings set with rare gemstones.",
      isLarge: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUpT2adNkTYXtT_WR9NrJtaPuhhUg4ZieHZMWtYL0-_LHEVnbceowFePPAkekVpTI0i7UIQFLV6CDkrWqGe9u0-EA5mrJG-oEn8xM4PyaKg58QBLq5SyMHq56zAlAAm_yVBOqCFueSUougEY1RJPkC7i-FU4fT4HGXxBRCCcouT-D1vBpDPxtEpS_ZQ-InS-n2vZ4csQMTSLCbsVfz_M1DGfwsVsguhwm-_31yvoVgwUwyZYW0hU2S",
      alt: "An exquisite display of various luxury diamond rings set against a plush plum-colored velvet background.",
      itemCount: 8
    },
    {
      id: "necklaces",
      slug: "necklaces",
      title: "Necklaces",
      description: "Delicate collared chains, diamond chokers, and bespoke gemstone pendants.",
      isLarge: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw4ljVWaQN_lNlxsG0cJtYNiOeuOGwe67b-8uqbSEZJlJiDLzIuBz7vlYY6jBcBIBcFxSQUe6U3Rl8E6y-5i0QXccC3Sm0Aio9taXDZaP4vL1AABqAG3wc39uFEa2OyGfAJPbVZxewZPZU53G4RSDCR9ZVltDae_YCfW3c-Hmze_5IzC4GSnjAlqSPHcBArC_OK7ADfP-5sWil4MAuGc8-LxniWmbJ1mPs_kTIcHaEmZ7csMJMNFur",
      alt: "A graceful arrangement of delicate gold necklaces with lavender gemstone pendants.",
      itemCount: 6
    },
    {
      id: "earrings",
      slug: "earrings",
      title: "Earrings",
      description: "From architectural chandeliers to luminescent diamond and sapphire studs.",
      isLarge: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlGnfN-GI_poZzLiz4BT6M6Km2nuqd2ot9LDPpFMXLdA7Kd4yyIJHPeHGCAqSjSHuqtm5eaXiilOEvvLnPc17yN2d0zfKgU8PvFfVA_-0vPhQQfD2DSsN4mg0aFaVjI2e6BNAI6VIHrlJZxX7OO2588J4QDG4MKNJVnPLpxZH4QwHC-AHtg9Jw6sPMhUcU63y7HmFHO0ut5yFPLd6i79Fd86jvWSyFQnupUVwKQJHhpmx2UPtetTVP",
      alt: "High-end diamond and gold earrings displayed on a professional jewellery stand.",
      itemCount: 9
    },
    {
      id: "timepieces",
      slug: "timepieces",
      title: "Timepieces",
      description: "Swiss horological mastery paired with Parisian jewel-encrusted bezels.",
      isLarge: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIR773N8XytYKYPT66mPpM5bxypmvHxwIWjTZilN0YyIWMP-n_k_przKlmBKNq5EofWCWDlZgX5jEHvVDr0kEDRvOoWbmo_yWXHsbqphoX77fJ5OTdoKvidUhpaGAUSKw-8zf-vy3JDtSR4hxeAmwBHSKZ5fUN5iveUgcDG6PriM7PWiNiaxcLk1gIFR1skLEyeySj5OZ5tckLwG3IYD-fZhIyKyzxiUg93d8Y0m3HtKrNo_6zRERC",
      alt: "A high-end luxury watch with a plum-colored leather strap and diamond-encrusted bezel.",
      itemCount: 4
    },
    {
      id: "bracelets",
      slug: "bracelets",
      title: "Bracelets & Cuffs",
      description: "Sculpted 18k gold bangles and high-jewelry diamond tennis bracelets.",
      isLarge: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXwTIdyOQUnvoR4dB86w_yZmnJnPOsXzVy2joNf_glxxI29C0oy6z-HaNHL7h3audY9HFQbBjqCH6Y4P8bYI7FX7jBZk9AIjiYpe_QX1eb2tM4wX1uF5WOvtT198LRKCPIquyzpQux1wdYZwOrVfsceNH1XB6_8lprnNmadGEi4HYYsIvB_On19cg5HygJtV7UkvSvlu1wSeBhNcvEyrgPzl5x1emPKx6fkYr1zT1Onpbjg9OmxcJW",
      alt: "A luxury gold bracelet with pave-set amethysts.",
      itemCount: 5
    }
  ],
  products: [
    {
      id: "amethyst-empress-bracelet",
      sku: "AUR-BRC-001",
      name: "Amethyst Empress Bracelet",
      category: "BRACELETS",
      categorySlug: "bracelets",
      price: 2450,
      rating: 4.9,
      reviewsCount: 18,
      badge: "NEW IN",
      isNewArrival: true,
      isBestSeller: false,
      featured: true,
      inStock: true,
      stockCount: 7,
      metal: "18k Recycled Yellow Gold",
      gemstone: "Natural Royal Amethyst (5.80 ct)",
      secondaryStone: "Round Brilliant Diamonds (0.65 ct, F-G, VS1)",
      certification: "Aurelian Maison Certificate of Authenticity",
      origin: "Handcrafted in Place Vendôme Atelier, Paris",
      description: "A breathtaking tribute to regal heritage. Features custom step-cut deep royal amethysts accented with a pavé halo of sustainably sourced conflict-free diamonds.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXwTIdyOQUnvoR4dB86w_yZmnJnPOsXzVy2joNf_glxxI29C0oy6z-HaNHL7h3audY9HFQbBjqCH6Y4P8bYI7FX7jBZk9AIjiYpe_QX1eb2tM4wX1uF5WOvtT198LRKCPIquyzpQux1wdYZwOrVfsceNH1XB6_8lprnNmadGEi4HYYsIvB_On19cg5HygJtV7UkvSvlu1wSeBhNcvEyrgPzl5x1emPKx6fkYr1zT1Onpbjg9OmxcJW",
      alt: "A luxury gold bracelet with pave-set amethysts, photographed from a high angle on a dark reflective surface."
    },
    {
      id: "violet-sapphire-chandelier",
      sku: "AUR-EAR-002",
      name: "Violet Sapphire Chandelier",
      category: "EARRINGS",
      categorySlug: "earrings",
      price: 3100,
      rating: 5.0,
      reviewsCount: 24,
      badge: "LIMITED EDITION",
      isNewArrival: true,
      isBestSeller: false,
      featured: true,
      inStock: true,
      stockCount: 3,
      metal: "18k Fairmined White & Yellow Gold",
      gemstone: "Madagascar Violet Sapphires (4.20 ct)",
      secondaryStone: "Pear-Cut DEF Diamonds (1.40 ct, VVS)",
      certification: "GIA Report & Maison Dossier",
      origin: "Geneva High Jewelry Workshop",
      description: "Cascading elegance inspired by French royal opera architecture. Pear-shaped diamonds descend gracefully into ethereal violet-hued sapphire teardrops.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBabrhJydKXi0aqQX5jMEUhvzsfCFzWsyV3b5uepTtmpxWcYcKxD22-Ug4V1pj1r-1CWKlIzsaU_9BBHhYU-HVd8xdeqmftNGU6Q2q886BXhY3Bozl0hymU6vTeGCE8V9kSpSfxMa_C0upt4SqHRkxSze9K47IwazlunazfP12oquvy6uft1XLA2-eC6mTBdVoxHP5V6J2pIZ8B5gV0IvhF_ho7T9d9OekH5Ez9GzcrjTB5SjEBCwrz",
      alt: "A pair of chandelier earrings featuring pear-cut diamonds and deep violet sapphires."
    },
    {
      id: "baguette-amethyst-band",
      sku: "AUR-RNG-003",
      name: "Baguette Amethyst Band",
      category: "RINGS",
      categorySlug: "rings",
      price: 1200,
      rating: 4.8,
      reviewsCount: 36,
      badge: null,
      isNewArrival: false,
      isBestSeller: true,
      featured: false,
      inStock: true,
      stockCount: 14,
      metal: "18k Satin Brushed Yellow Gold",
      gemstone: "Baguette-Cut Brazilian Amethyst (1.75 ct)",
      secondaryStone: "Micro-pavé diamonds on inner gallery",
      certification: "Aurelian Hallmark of Excellence",
      origin: "Milan Fine Jewelry Workshop",
      description: "Modern architectural minimalism. A sharp, geometric baguette amethyst bezel-mounted in satin-finished yellow gold with an ergonomic court-profile band.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7jFyOOGDqNekvX_IrZtN7zPg8Y3twMsuyc4WPq7Fs7qDmyw2EV9pWhhppOp1ilKHubNEeylGG6uBlCRoX1SGDi7KChT-_ij5_5iNLzo6IWUpCY9kv-8PZEyvBaLpj-dlj-DVzDlJ9x60XbkYKnkti_zeUuzfQQcqwjKETrPnLJSqzzQvpNX9wohuYb3eKDUoYnTKRU0_sUltlsE6FB11lmGH1okSnWlcD7qA2JB6c802oOpGodZwa",
      alt: "A minimalist 18k yellow gold band ring with a single baguette-cut amethyst."
    },
    {
      id: "lavender-halo-studs",
      sku: "AUR-EAR-004",
      name: "Lavender Halo Studs",
      category: "EARRINGS",
      categorySlug: "earrings",
      price: 1850,
      rating: 4.9,
      reviewsCount: 42,
      badge: "SIGNATURE",
      isNewArrival: false,
      isBestSeller: true,
      featured: false,
      inStock: true,
      stockCount: 10,
      metal: "18k Rose & Platinum Setting",
      gemstone: "Cushion-Cut Lavender Sapphires (2.60 ct pair)",
      secondaryStone: "Brilliant Pavé Halo Diamonds (0.45 ct)",
      certification: "Aurelian Maison Certificate",
      origin: "Place Vendôme Atelier, Paris",
      description: "Subtle everyday opulence. Rare cushion-cut unheated Sri Lankan lavender sapphires crowned by an intricate brilliant-cut diamond halo.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtE6RGyqbaG1Z52sA3CRitm71XSa0EBotL03DIT6BqE8V2kA63cwJ9955dB0dDrOvBAUJQo8Tp3C2DYpxpR1dfAPVExBQ7YZwZdu0idcSNggExHZLLHUDTq-lYiX4mojy6CiM-m8o3UIr9E3HwdDnbEHymkFgamaDwtaJ5cslJjqnJUXdb5w8VvEnFXQYVVrUaK9NNVLPJSg1xn9uOABQ3w4U8v-WcSN91ztF4nMao7HJoxXovY4so",
      alt: "Elegant diamond stud earrings with lavender sapphire halos."
    },
    {
      id: "heritage-plum-watch",
      sku: "AUR-WCH-005",
      name: "Heritage Plum Watch",
      category: "TIMEPIECES",
      categorySlug: "timepieces",
      price: 5400,
      rating: 5.0,
      reviewsCount: 15,
      badge: "HOROLOGY",
      isNewArrival: false,
      isBestSeller: true,
      featured: true,
      inStock: true,
      stockCount: 4,
      metal: "18k Polished Yellow Gold Case (36mm)",
      gemstone: "Diamond Bezel (1.10 ct) & Sapphire Crystal",
      movement: "Swiss Automatic Calibre AUR-88 with 48h Power Reserve",
      strap: "Hand-stitched Plum Louisiana Alligator Leather",
      certification: "COSC Chronometer Certified & Swiss Made",
      origin: "Le Locle, Switzerland",
      description: "An extraordinary intersection of haute horlogerie and fine jewelry. Sunray plum dial with gold hour markers encased in a scintillating diamond bezel.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIR773N8XytYKYPT66mPpM5bxypmvHxwIWjTZilN0YyIWMP-n_k_przKlmBKNq5EofWCWDlZgX5jEHvVDr0kEDRvOoWbmo_yWXHsbqphoX77fJ5OTdoKvidUhpaGAUSKw-8zf-vy3JDtSR4hxeAmwBHSKZ5fUN5iveUgcDG6PriM7PWiNiaxcLk1gIFR1skLEyeySj5OZ5tckLwG3IYD-fZhIyKyzxiUg93d8Y0m3HtKrNo_6zRERC",
      alt: "A high-end luxury watch with a plum-colored leather strap and a gold case adorned with tiny diamonds."
    },
    {
      id: "stellar-rose-gold-anklet",
      sku: "AUR-ACC-006",
      name: "Stellar Rose Gold Anklet",
      category: "ACCESSORIES",
      categorySlug: "accessories",
      price: 950,
      rating: 4.7,
      reviewsCount: 19,
      badge: null,
      isNewArrival: false,
      isBestSeller: true,
      featured: false,
      inStock: true,
      stockCount: 16,
      metal: "18k Rose Gold with Lobster Clasp",
      gemstone: "Stellar Diamond Charms (0.35 ct total)",
      secondaryStone: "Subtle Violet Garnet Accent Bead",
      certification: "Aurelian Authenticity Seal",
      origin: "Florence Goldsmith Guild",
      description: "Delicate and sensual. An ultra-fine 18k rose gold cable chain studded with star-faceted diamond drops that catch every movement with shimmering grace.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTvxyAzCNbYX6yG7NHJFjKqPh8DWpmgisufm3P6sAYSTh2f3IZPJyWoF6QbTS8F1X-YGRuOThEG0G56DY6y7oG3EpIZST71D6Jj3MIDVuMmhicSvPvb9zSQo53t9qIkp3xtphAJNuIETEDeLcK5npHZRBVphtDHO5FcJ8pn5M90zd7UQ4EFlTQO73Ctspa8cN86WLLkx6RFGulmAH72zLMaFlfA1Ukjmp-511gzEdycyBimCdMl63A",
      alt: "A delicate rose gold anklet featuring small diamond charms."
    },
    {
      id: "celestial-plum-solitaire",
      sku: "AUR-RNG-007",
      name: "Celestial Plum Solitaire",
      category: "RINGS",
      categorySlug: "rings",
      price: 3800,
      rating: 4.95,
      reviewsCount: 11,
      badge: "NEW IN",
      isNewArrival: true,
      isBestSeller: false,
      featured: true,
      inStock: true,
      stockCount: 5,
      metal: "18k Solid Yellow Gold",
      gemstone: "Deep Siberian Plum Amethyst (6.2 ct Oval)",
      secondaryStone: "Side Trapezoid Diamonds (0.50 ct pair)",
      certification: "Aurelian Gemological Dossier",
      origin: "Paris Atelier",
      description: "A commanding centerstone with exceptional purple-violet fire, flanked by bespoke trapezoid-cut diamonds in an elevated cathedral setting.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUpT2adNkTYXtT_WR9NrJtaPuhhUg4ZieHZMWtYL0-_LHEVnbceowFePPAkekVpTI0i7UIQFLV6CDkrWqGe9u0-EA5mrJG-oEn8xM4PyaKg58QBLq5SyMHq56zAlAAm_yVBOqCFueSUougEY1RJPkC7i-FU4fT4HGXxBRCCcouT-D1vBpDPxtEpS_ZQ-InS-n2vZ4csQMTSLCbsVfz_M1DGfwsVsguhwm-_31yvoVgwUwyZYW0hU2S",
      alt: "Exquisite luxury solitaire ring with deep plum gemstone."
    },
    {
      id: "cascade-diamond-collar",
      sku: "AUR-NCK-008",
      name: "Cascade Diamond Collar",
      category: "NECKLACES",
      categorySlug: "necklaces",
      price: 6200,
      rating: 5.0,
      reviewsCount: 8,
      badge: "HAUTE JOAILLERIE",
      isNewArrival: false,
      isBestSeller: false,
      featured: true,
      inStock: true,
      stockCount: 2,
      metal: "18k Yellow and White Gold Dual Setting",
      gemstone: "Graduated Round and Marquise Diamonds (3.80 ct)",
      secondaryStone: "Drop Lavender Tourmaline (2.10 ct)",
      certification: "GIA & Maison Aurelian Master Dossier",
      origin: "Parisian Master Atelier",
      description: "A showpiece of uncompromising craftsmanship. Flexible articulated links drape across the clavicle, terminating in a luminescent lavender tourmaline pendant.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw4ljVWaQN_lNlxsG0cJtYNiOeuOGwe67b-8uqbSEZJlJiDLzIuBz7vlYY6jBcBIBcFxSQUe6U3Rl8E6y-5i0QXccC3Sm0Aio9taXDZaP4vL1AABqAG3wc39uFEa2OyGfAJPbVZxewZPZU53G4RSDCR9ZVltDae_YCfW3c-Hmze_5IzC4GSnjAlqSPHcBArC_OK7ADfP-5sWil4MAuGc8-LxniWmbJ1mPs_kTIcHaEmZ7csMJMNFur",
      alt: "Articulated gold and diamond necklace with lavender tourmaline pendant."
    }
  ],
  promotions: [
    {
      code: "AURELIAN15",
      description: "15% off your premier collection acquisition",
      discountType: "percentage",
      discountValue: 15,
      minOrderAmount: 0,
      active: true,
      expiryDate: "2027-12-31"
    },
    {
      code: "ROYALTY20",
      description: "20% off high-jewelry orders exceeding $3,000",
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 3000,
      active: true,
      expiryDate: "2027-12-31"
    },
    {
      code: "SOVEREIGN500",
      description: "$500 VIP private patronage credit on orders over $2,500",
      discountType: "fixed",
      discountValue: 500,
      minOrderAmount: 2500,
      active: true,
      expiryDate: "2027-12-31"
    }
  ],
  boutiques: [
    {
      id: "paris-place-vendome",
      city: "Paris",
      name: "Aurelian Maison Place Vendôme",
      address: "18 Place Vendôme, 75001 Paris, France",
      phone: "+33 1 42 68 00 00",
      services: ["High Jewelry Salon", "Custom Bespoke Design", "Private Vault Viewing"]
    },
    {
      id: "ny-fifth-avenue",
      city: "New York",
      name: "Aurelian Salon Fifth Avenue",
      address: "712 Fifth Avenue, New York, NY 10019, USA",
      phone: "+1 212 555 0198",
      services: ["VIP Private Lounge", "Diamond Concierge", "Appraisal & Certification"]
    },
    {
      id: "london-bond-street",
      city: "London",
      name: "Aurelian Mayfair",
      address: "42 New Bond Street, London W1S 2RY, UK",
      phone: "+44 20 7946 0912",
      services: ["Private Horology Suite", "Heritage Restoration", "Bespoke Commissions"]
    },
    {
      id: "geneva-rue-rhone",
      city: "Geneva",
      name: "Aurelian Rue du Rhône",
      address: "35 Rue du Rhône, 1204 Geneva, Switzerland",
      phone: "+41 22 819 00 20",
      services: ["Grand Complications Salon", "Gemological Laboratory", "Concierge Vault"]
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: "The most exquisite piece I've ever owned. The way it catches the light is truly magical. AURELIAN is pure luxury.",
      author: "ELIZABETH V.",
      title: "VIP CLIENT",
      city: "Monaco",
      piece: "Violet Sapphire Chandelier"
    },
    {
      id: 2,
      quote: "The craftsmanship in Place Vendôme surpassed all expectations. A bespoke experience worthy of royalty.",
      author: "LADY CHARLOTTE H.",
      title: "PATRON OF THE MAISON",
      city: "London",
      piece: "Amethyst Empress Bracelet"
    }
  ],
  profile: {
    id: "usr_vip_001",
    name: "VIP Sovereign Patron",
    tier: "Imperial Sovereign Member",
    tierColor: "#e9c349",
    memberSince: "2024",
    loyaltyPoints: 14850,
    dedicatedConcierge: {
      name: "Henri de Montmirail",
      title: "Senior High Jewelry Liaison",
      email: "concierge@aurelian-maison.com",
      phone: "+33 1 42 68 00 12"
    },
    privileges: [
      "Complimentary Armored Courier Delivery worldwide",
      "Private viewing access 48h prior to public collections",
      "Annual complimentary gemological servicing & ultrasonic polishing",
      "Invitation to biannual Place Vendôme private salon banquet"
    ]
  },
  consultations: [
    {
      id: "cst-2026-001",
      clientName: "Eleanor Vance",
      email: "eleanor.vance@luxurymail.com",
      phone: "+1 212 555 4321",
      boutiqueId: "ny-fifth-avenue",
      boutiqueName: "Aurelian Salon Fifth Avenue",
      date: "2026-10-15",
      timeSlot: "14:00 - 15:30",
      interest: "Custom Bespoke Engagement Ring",
      status: "CONFIRMED",
      createdAt: "2026-09-15T10:00:00.000Z"
    }
  ],
  orders: [
    {
      id: "AUR-2026-8921",
      orderNumber: "AUR-2026-8921",
      customer: {
        firstName: "Elena",
        lastName: "Rostova",
        email: "elena.rostova@prestigemail.com",
        phone: "+33 6 12 34 56 78",
        address: "12 Avenue Montaigne",
        city: "Paris",
        country: "France",
        postalCode: "75008"
      },
      items: [
        {
          id: "amethyst-empress-bracelet",
          name: "Amethyst Empress Bracelet",
          price: 2450,
          quantity: 1,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXwTIdyOQUnvoR4dB86w_yZmnJnPOsXzVy2joNf_glxxI29C0oy6z-HaNHL7h3audY9HFQbBjqCH6Y4P8bYI7FX7jBZk9AIjiYpe_QX1eb2tM4wX1uF5WOvtT198LRKCPIquyzpQux1wdYZwOrVfsceNH1XB6_8lprnNmadGEi4HYYsIvB_On19cg5HygJtV7UkvSvlu1wSeBhNcvEyrgPzl5x1emPKx6fkYr1zT1Onpbjg9OmxcJW"
        }
      ],
      pricing: {
        subtotal: 2450,
        discountAmount: 367.5,
        discountCode: "AURELIAN15",
        taxAmount: 171.81,
        shippingFee: 0,
        shippingType: "Complimentary Insured Courier",
        total: 2254.31
      },
      paymentMethod: "Aurelian VIP Concierge Wire",
      giftWrap: true,
      giftMessage: "Pour toujours et à jamais.",
      status: "PREPARING_DISPATCH",
      trackingNumber: "AUR-EXP-FR-982149",
      createdAt: "2026-09-16T14:30:00.000Z"
    }
  ],
  subscribers: [
    {
      email: "vip.collector@aurelian-maison.com",
      subscribedAt: "2026-09-01T08:00:00.000Z",
      source: "web_footer"
    }
  ],
  carts: {}
};
