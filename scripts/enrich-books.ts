import * as fs from "fs";
import * as path from "path";

const booksFilePath = path.resolve(__dirname, "../data/nodes/books.json");
const existingBooks = fs.existsSync(booksFilePath) ? JSON.parse(fs.readFileSync(booksFilePath, "utf8")) : [];

const newBooks = [
  {
    id: "book-muller-brockmann-grid",
    type: "book",
    label: "Grid Systems in Graphic Design",
    description: "Josef Müller-Brockmann's seminal Swiss design manual establishing the mathematical precision, modular grid structures, and visual order of functional typography.",
    domain: "domain-web-graphic-design",
    tags: ["grid-systems", "swiss-design", "graphic-design", "layout", "typography"],
    status: "evergreen",
    title: "Grid Systems in Graphic Design",
    authors: ["Josef Müller-Brockmann"],
    year: 1981,
    isbn: "978-3721201452",
    publisher: "Niggli",
    canonical_url: "https://niggli.ch/en/grid-systems-in-graphic-design.html",
    summary: "The classic treatise on using modular grid systems to solve visual communication problems with systematic clarity, functional hierarchy, and proportional harmony.",
    key_mental_models: [
      {
        name: "The Modular Grid Matrix",
        description: "Subdividing two-dimensional planes into vertical columns and horizontal modules that govern all text, image, and whitespace positions.",
        application: "Applied in Starlight Agent Canvas and FrankX website responsive grid systems."
      },
      {
        name: "Order as Aesthetic Discipline",
        description: "True visual beauty emerges from functional legibility and logical structure rather than decorative arbitrary placement.",
        application: "Core rule in Starlight anti-slop visual review gates."
      }
    ],
    core_chapters: [
      { number: 1, title: "The Grid and Design Philosophy", takeaway: "The grid is a tool of order that enforces clarity and objectivity." },
      { number: 4, title: "The 8-Column, 12-Column and 16-Column Grids", takeaway: "Mathematical division of multi-column layouts for responsive flexibility." }
    ],
    cross_repo_applications: [
      { repo: "starlight-design-intelligence", context: "Standardizes layout grid tokens and breakpoint rules." },
      { repo: "frankx.ai-vercel-website", context: "Governs page section layouts and CSS grid implementations." }
    ],
    quotes: [
      { quote: "The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style.", source: "Introduction" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-baseline-grid" },
      { type: "teaches", target: "concept-modular-scale" }
    ]
  },
  {
    id: "book-bringhurst-typography",
    type: "book",
    label: "The Elements of Typographic Style",
    description: "Robert Bringhurst's universally revered bible of typography, exploring historical letterforms, proportional harmony, rhythm, and typographic syntax.",
    domain: "domain-web-graphic-design",
    tags: ["typography", "letterforms", "type-scale", "kerning", "rhythm"],
    status: "evergreen",
    title: "The Elements of Typographic Style",
    authors: ["Robert Bringhurst"],
    year: 1992,
    isbn: "978-0881792126",
    publisher: "Hartley & Marks Publishers",
    canonical_url: "https://hartleyandmarks.com/the-elements-of-typographic-style.html",
    summary: "A poetic yet rigorously technical exploration of typography. Explains vertical and horizontal rhythm, modular type scales, optical adjustments, punctuation, and structural proportion.",
    key_mental_models: [
      {
        name: "Vertical Rhythm & Baseline Grid",
        description: "Maintaining a constant proportional line-height across paragraphs, headings, and margins so text aligns to a harmonic rhythmic beat.",
        application: "Enforced in FrankX MDX blog typography and Arcanea reader layouts."
      },
      {
        name: "The Measure (Line Length)",
        description: "Keeping text line lengths between 45 and 75 characters (ideal ~66 characters) to maximize reading comfort and velocity.",
        application: "Standardized in prose max-w classes across all Next.js applications."
      }
    ],
    core_chapters: [
      { number: 2, title: "Rhythm & Proportion", takeaway: "Horizontal and vertical rhythm must dance together in mathematical harmony." },
      { number: 5, title: "Structural Forms & Proportions", takeaway: "Choosing typeface pairings based on complementary structural axes." }
    ],
    cross_repo_applications: [
      { repo: "starlight-design-intelligence", context: "Governs typographic scale and line-height variables." }
    ],
    quotes: [
      { quote: "Typography exists to honor content.", source: "Chapter 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-modular-scale" },
      { type: "teaches", target: "concept-baseline-grid" }
    ]
  },
  {
    id: "book-lupton-thinking-with-type",
    type: "book",
    label: "Thinking with Type",
    description: "Ellen Lupton's essential guide on typography for visual communicators, covering letterforms, grids, typographic hierarchies, and spatial composition.",
    domain: "domain-web-graphic-design",
    tags: ["typography", "visual-communication", "graphic-design", "layout"],
    status: "stable",
    title: "Thinking with Type",
    authors: ["Ellen Lupton"],
    year: 2004,
    isbn: "978-1568989693",
    publisher: "Princeton Architectural Press",
    canonical_url: "http://thinkingwithtype.com",
    summary: "Practical and theoretical framework on how type behaves on the page and screen. Covers anatomy of letterforms, tracking, kerning, leading, hierarchy, and grid layouts.",
    key_mental_models: [
      {
        name: "Typographic Hierarchy",
        description: "Using scale, weight, positioning, and color contrast to guide the eye through structured priority levels.",
        application: "Applied in UI dashboards and high-density agent telemetry panels."
      }
    ],
    cross_repo_applications: [
      { repo: "frankx.ai-vercel-website", context: "Directs content hierarchy and landing page typography." }
    ],
    quotes: [
      { quote: "Typography is what language looks like.", source: "Introduction" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-modular-scale" }
    ]
  },
  {
    id: "book-vignelli-canon",
    type: "book",
    label: "The Vignelli Canon",
    description: "Massimo Vignelli's modernist doctrine of visual discipline, timeless geometric restraint, semantic typography, and elimination of decorative waste.",
    domain: "domain-web-graphic-design",
    tags: ["vignelli", "modernism", "graphic-design", "brand-identity", "timeless-design"],
    status: "evergreen",
    title: "The Vignelli Canon",
    authors: ["Massimo Vignelli"],
    year: 2008,
    publisher: "Lars Müller Publishers",
    canonical_url: "https://www.vignelli.com/canon.pdf",
    summary: "The iconic modernist design manual. Details 12 intangible principles (Semantics, Syntactics, Pragmatics, Discipline, Appropriateness, Ambiguity, History, Timelessness, Responsibility, Structure, Emotion) and tangible layout execution rules.",
    key_mental_models: [
      {
        name: "Semantics, Syntactics, Pragmatics",
        description: "Understanding the true meaning of the subject (Semantics), designing the syntax of its visual elements (Syntactics), and ensuring complete clarity in user reception (Pragmatics).",
        application: "The baseline design methodology for Starlight brand identity and icons."
      },
      {
        name: "Timelessness over Trends",
        description: "Rejecting fleeting visual fads in favor of enduring geometric relationships and essential letterforms.",
        application: "Guides Arcanea and Starlight visual standards."
      }
    ],
    cross_repo_applications: [
      { repo: "starlight-design-intelligence", context: "Forms the modernist core of the design system." }
    ],
    quotes: [
      { quote: "If you can design one thing, you can design everything.", source: "Introduction" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-brand-dna-matrix" },
      { type: "teaches", target: "concept-vector-first-assets" }
    ]
  },
  {
    id: "book-walter-design-for-emotion",
    type: "book",
    label: "Designing for Emotion",
    description: "Aarron Walter's psychological framework on emotional engagement, anthropomorphism, brand personality, and delight in user experience.",
    domain: "domain-web-graphic-design",
    tags: ["emotional-design", "ui-ux", "delight", "psychology", "user-experience"],
    status: "stable",
    title: "Designing for Emotion",
    authors: ["Aarron Walter"],
    year: 2011,
    publisher: "A Book Apart",
    canonical_url: "https://abookapart.com/products/designing-for-emotion",
    summary: "Explains how emotional connection turns indifferent users into passionate advocates. Extends Maslow's hierarchy to UI: Functional -> Reliable -> Usable -> Delightful.",
    key_mental_models: [
      {
        name: "Emotional Hierarchy of User Needs",
        description: "Delight cannot compensate for a broken, unusable interface; but on top of solid usability, emotional resonance creates unforgettable experiences.",
        application: "Applied in Arcanea onboarding journeys and Guardian voice interactions."
      }
    ],
    cross_repo_applications: [
      { repo: "arcanea-ai-app", context: "Directs Guardian visual presence and interactive responses." }
    ],
    quotes: [
      { quote: "Make it functional, reliable, usable, and pleasurable.", source: "Chapter 2" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-aesthetic-usability-effect" },
      { type: "teaches", target: "concept-micro-interactions" }
    ]
  },
  {
    id: "book-schwartz-product-led-seo",
    type: "book",
    label: "Product-Led SEO",
    description: "Eli Schwartz's modern strategic methodology replacing superficial keyword stuffing with user-centric product architecture and programmatic indexation.",
    domain: "domain-content-seo-publishing",
    tags: ["seo", "product-led-seo", "search-strategy", "programmatic-seo", "information-gain"],
    status: "evergreen",
    title: "Product-Led SEO",
    authors: ["Eli Schwartz"],
    year: 2021,
    isbn: "978-1544519630",
    publisher: "Lioncrest Publishing",
    canonical_url: "https://www.elischwartz.co/product-led-seo/",
    summary: "A revolutionary shift from legacy SEO tactics to product-first organic discovery. Focuses on user intent, conversion-driven landing experiences, programmatic page generation, and brand search dominance.",
    key_mental_models: [
      {
        name: "Product-Led Search Intent",
        description: "Building pages that directly answer search queries with working product utilities rather than generic affiliate text.",
        application: "Applied in FrankX prompt library and tool comparison directory templates."
      },
      {
        name: "Information Gain over Paraphrasing",
        description: "Google algorithms reward pages that provide net-new data, proprietary benchmarks, or novel perspectives beyond existing search results.",
        application: "Mandatory rubric for all FrankX blog articles and research dossiers."
      }
    ],
    cross_repo_applications: [
      { repo: "frankx.ai-vercel-website", context: "Directs programmatic prompt library and blog SEO architecture." },
      { repo: "agentic-income-template", context: "Structures comparison data matrices for high search conversion." }
    ],
    quotes: [
      { quote: "SEO is not about tricking an algorithm. It is about understanding what humans search for and building the best product to satisfy that search.", source: "Introduction" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-topical-authority" },
      { type: "teaches", target: "concept-information-gain-score" },
      { type: "teaches", target: "concept-programmatic-seo" }
    ]
  },
  {
    id: "book-schwartz-breakthrough-advertising",
    type: "book",
    label: "Breakthrough Advertising",
    description: "Eugene M. Schwartz's legendary masterwork on market awareness stages, customer sophistication levels, and channelized mass desire.",
    domain: "domain-content-seo-publishing",
    tags: ["copywriting", "advertising", "market-awareness", "market-sophistication", "psychology"],
    status: "evergreen",
    title: "Breakthrough Advertising",
    authors: ["Eugene M. Schwartz"],
    year: 1966,
    isbn: "978-0887232985",
    publisher: "Boardroom Books",
    canonical_url: "https://breakthroughadvertising.com",
    summary: "The ultimate textbook on persuasion engineering. Explains that copy cannot create desire for a product; it can only channel the existing hopes, dreams, and fears of millions of people onto a specific product.",
    key_mental_models: [
      {
        name: "The 5 Stages of Customer Awareness",
        description: "Unaware -> Problem Aware -> Solution Aware -> Product Aware -> Most Aware. Headline and copy angle must strictly match the market's exact stage.",
        application: "Calibrates all FrankX landing page headlines, email sequences, and social hooks."
      },
      {
        name: "The 5 Stages of Market Sophistication",
        description: "From simple direct claims (Stage 1) to mechanisms (Stage 3) to expanded mechanisms (Stage 4) and identification/values (Stage 5).",
        application: "Structures the Unique Mechanism in FrankX high-ticket digital products."
      }
    ],
    cross_repo_applications: [
      { repo: "publishing-house", context: "Calibrates book titles, back-cover copy, and sales landing pages." }
    ],
    quotes: [
      { quote: "Copy cannot create desire for a product. It can only take the hopes, dreams, fears and desires that already exist in the hearts of millions of people, and focus those pre-existing desires onto a particular product.", source: "Chapter 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-market-sophistication-stages" },
      { type: "teaches", target: "concept-direct-response-copywriting" }
    ]
  },
  {
    id: "book-handley-everybody-writes",
    type: "book",
    label: "Everybody Writes",
    description: "Ann Handley's modern guide to creating ridiculously good content, clear storytelling, empathetic brand voice, and compounding editorial habits.",
    domain: "domain-content-seo-publishing",
    tags: ["content-writing", "storytelling", "editorial", "brand-voice", "content-creation"],
    status: "stable",
    title: "Everybody Writes",
    authors: ["Ann Handley"],
    year: 2014,
    isbn: "978-1118905555",
    publisher: "Wiley",
    canonical_url: "https://annhandley.com/everybodywrites/",
    summary: "A comprehensive manual for writing with clarity, empathy, and authority in the digital age. Details writing rules, storytelling structures, cadence, grammar, and publishing discipline.",
    key_mental_models: [
      {
        name: "Empathetic Editorial Clarity",
        description: "Writing directly to one specific person with relentless focus on their utility and transformation.",
        application: "Standardized across FrankX newsletter and MDX essays."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-creator-os", context: "Forms writing guidelines for the Creation Engine agent." }
    ],
    quotes: [
      { quote: "Quality content means content that is packed with clear utility and is brimming with inspiration.", source: "Part 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-pillar-cluster-model" },
      { type: "teaches", target: "concept-mdx-publishing-pipeline" }
    ]
  },
  {
    id: "book-bly-copywriters-handbook",
    type: "book",
    label: "The Copywriter's Handbook",
    description: "Robert W. Bly's step-by-step guide to writing copy that sells, headline formulas, feature-to-benefit translation, and response generation.",
    domain: "domain-content-seo-publishing",
    tags: ["copywriting", "direct-response", "headlines", "lead-generation", "marketing"],
    status: "stable",
    title: "The Copywriter's Handbook",
    authors: ["Robert W. Bly"],
    year: 1985,
    isbn: "978-1250238016",
    publisher: "Henry Holt and Co.",
    canonical_url: "https://www.bly.com",
    summary: "The standard reference for professional copywriters. Covers the 4 U's formula for headlines (Urgent, Unique, Ultra-specific, Useful), FAB formula (Features, Advantages, Benefits), and lead generation mechanics.",
    key_mental_models: [
      {
        name: "The 4 U's Formula",
        description: "Headlines must be Urgent, Unique, Ultra-specific, and Useful to maximize CTR and reading commitment.",
        application: "Evaluated in prompt library headline generators."
      }
    ],
    cross_repo_applications: [
      { repo: "publishing-house", context: "Direct response sales pages and email campaigns." }
    ],
    quotes: [
      { quote: "The goal of copywriting is not to win creative awards; it is to persuade the reader to take a specific action.", source: "Chapter 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-direct-response-copywriting" }
    ]
  },
  {
    id: "book-hormozi-100m-offers",
    type: "book",
    label: "$100M Offers",
    description: "Alex Hormozi's blueprint on creating Grand Slam Offers so good people feel stupid saying no, through the Value Equation and pricing power.",
    domain: "domain-social-attraction-funnels",
    tags: ["offers", "value-equation", "pricing", "monetization", "grand-slam-offers"],
    status: "evergreen",
    title: "$100M Offers",
    authors: ["Alex Hormozi"],
    year: 2021,
    isbn: "978-1737475712",
    publisher: "Acquisition.com",
    canonical_url: "https://www.acquisition.com/books",
    summary: "Teaches how to eliminate commoditization and price resistance by constructing asymmetric Grand Slam Offers. Formulates the Value Equation: Value = (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice).",
    key_mental_models: [
      {
        name: "The Value Equation",
        description: "Maximize Dream Outcome and Perceived Likelihood (numerator); minimize Time Delay and Effort/Sacrifice (denominator).",
        application: "Core formula for all FrankX digital product blueprints and agentic income services."
      },
      {
        name: "Price-to-Value Discrepancy",
        description: "Never compete on price; compete on extreme value delivery that justifies premium pricing, enabling massive reinvestment in product quality.",
        application: "Governs high-ticket advisory and template monetization systems."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-income-skills", context: "Standardizes value propositions for autonomous service agents." },
      { repo: "publishing-house", context: "Structures course and masterclass offer packaging." }
    ],
    quotes: [
      { quote: "Make people an offer so good they would feel stupid saying no.", source: "Chapter 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-grand-slam-offers" },
      { type: "teaches", target: "concept-value-ladder-architecture" }
    ]
  },
  {
    id: "book-hormozi-100m-leads",
    type: "book",
    label: "$100M Leads",
    description: "Alex Hormozi's framework for generating unlimited customer leads through the Core 4 advertising channels, lead magnets, and affiliate referral engines.",
    domain: "domain-social-attraction-funnels",
    tags: ["lead-generation", "marketing", "distribution", "lead-magnets", "organic-content"],
    status: "evergreen",
    title: "$100M Leads",
    authors: ["Alex Hormozi"],
    year: 2023,
    isbn: "978-1737475750",
    publisher: "Acquisition.com",
    canonical_url: "https://www.acquisition.com/books",
    summary: "The companion to $100M Offers detailing the Core 4 methods to get leads: Warm Outreach, Cold Outreach, Free Content (Organic), and Paid Ads. Details Hook-Retain-Reward content mechanics and Lead Magnet creation.",
    key_mental_models: [
      {
        name: "Hook, Retain, Reward",
        description: "Every post/video must capture attention in 3 seconds (Hook), maintain curiosity across pacing (Retain), and deliver high actionable value (Reward).",
        application: "Applied in social media generation skills and video production scripts."
      },
      {
        name: "Give Away Your Secrets, Sell the Implementation",
        description: "Publish your most valuable knowledge for free to build immense goodwill, then sell software, execution, or automated workflows.",
        application: "The foundational philosophy behind Starlight open-source knowledge trees."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-creator-os", context: "Directs automated lead generation and content distribution skills." }
    ],
    quotes: [
      { quote: "Volume negates luck. If you do enough of the right things, success becomes mathematically inevitable.", source: "Chapter 3" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-organic-distribution-loops" },
      { type: "teaches", target: "concept-scroll-stopping-hooks" }
    ]
  },
  {
    id: "book-brunson-dotcom-secrets",
    type: "book",
    label: "DotCom Secrets",
    description: "Russell Brunson's definitive playbook on sales funnels, value ladders, front-end lead generation, and automated backend ascension.",
    domain: "domain-social-attraction-funnels",
    tags: ["funnels", "sales-funnels", "value-ladder", "conversion", "opt-in"],
    status: "stable",
    title: "DotCom Secrets",
    authors: ["Russell Brunson"],
    year: 2015,
    isbn: "978-1630474775",
    publisher: "Morgan James Publishing",
    canonical_url: "https://www.dotcomsecrets.com",
    summary: "Lays out the fundamental architecture of online sales funnels: The Value Ladder (Lead Magnet -> Tripwire -> Core Offer -> High-Ticket Backend), Soap Opera Email Sequences, and One-Click Upsells.",
    key_mental_models: [
      {
        name: "The Value Ladder",
        description: "Guiding customers through an escalating progression of value and price as trust deepens.",
        application: "Standardized across FrankX ecosystem: Free Graph -> Starter Pack -> Prompt Library -> Enterprise Advisory."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-income-template", context: "Designs affiliate and digital product funnel flows." }
    ],
    quotes: [
      { quote: "A value ladder is the visual representation of all the products and services you can offer to your dream client.", source: "Section 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-value-ladder-architecture" },
      { type: "teaches", target: "concept-vsl-funnel-architecture" }
    ]
  },
  {
    id: "book-brunson-expert-secrets",
    type: "book",
    label: "Expert Secrets",
    description: "Russell Brunson's guide to positioning expertise, storytelling frameworks, webinars, and converting visitors into passionate movement members.",
    domain: "domain-social-attraction-funnels",
    tags: ["expert-secrets", "storytelling", "webinars", "vsl", "movement-building"],
    status: "stable",
    title: "Expert Secrets",
    authors: ["Russell Brunson"],
    year: 2017,
    isbn: "978-1683504580",
    publisher: "Morgan James Publishing",
    canonical_url: "https://www.expertsecrets.com",
    summary: "Teaches how to package knowledge into a charismatic leader identity, create a mass movement with a Future-Based Cause, and deliver high-converting VSL presentations using the Epiphany Bridge script.",
    key_mental_models: [
      {
        name: "The Epiphany Bridge",
        description: "Telling personal backstory narratives that allow the audience to experience the exact emotional realization that transformed the author.",
        application: "Shapes Arcanea origin narratives and FrankX AI Architect case studies."
      }
    ],
    cross_repo_applications: [
      { repo: "publishing-house", context: "Governs webinar presentations and VSL narrative scripts." }
    ],
    quotes: [
      { quote: "People don't buy what you do; they buy why you do it.", source: "Section 2" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-vsl-funnel-architecture" }
    ]
  },
  {
    id: "book-cialdini-influence",
    type: "book",
    label: "Influence: The Psychology of Persuasion",
    description: "Robert Cialdini's landmark behavioral psychology study detailing the six universal principles of ethical persuasion and compliance.",
    domain: "domain-social-attraction-funnels",
    tags: ["psychology", "persuasion", "behavioral-economics", "influence", "social-proof"],
    status: "evergreen",
    title: "Influence: The Psychology of Persuasion",
    authors: ["Robert B. Cialdini"],
    year: 1984,
    isbn: "978-0061241895",
    publisher: "Harper Business",
    canonical_url: "https://www.influenceatwork.com",
    summary: "Identifies the fundamental psychological triggers that cause humans to say yes: Reciprocity, Commitment & Consistency, Social Proof, Authority, Liking, Scarcity, and Unity.",
    key_mental_models: [
      {
        name: "The 7 Influence Principles",
        description: "Reciprocity (giving value first), Social Proof (evidence of peer adoption), Authority (deep domain credentials), Scarcity (authentic urgency).",
        application: "Ethical persuasion baseline for all FrankX landing pages and email triggers."
      }
    ],
    cross_repo_applications: [
      { repo: "frankx.ai-vercel-website", context: "Guides social proof badges, attestation blocks, and CTA framing." }
    ],
    quotes: [
      { quote: "We all fool ourselves from time to time in order to keep our thoughts and beliefs consistent with what we have already done or decided.", source: "Chapter 3" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-lifecycle-email-automation" }
    ]
  },
  {
    id: "book-graham-intelligent-investor",
    type: "book",
    label: "The Intelligent Investor",
    description: "Benjamin Graham's foundational bible of Value Investing, establishing Mr. Market, the Margin of Safety, and fundamental equity valuation.",
    domain: "domain-investing-wealth-capital",
    tags: ["value-investing", "margin-of-safety", "benjamin-graham", "mr-market", "fundamental-analysis"],
    status: "evergreen",
    title: "The Intelligent Investor",
    authors: ["Benjamin Graham"],
    year: 1949,
    isbn: "978-0060555665",
    publisher: "Harper Business",
    canonical_url: "https://www.harpercollins.com",
    summary: "The cornerstone of modern finance. Delineates investment vs speculation. Introduces Mr. Market as an emotional counterparty and establishes the Margin of Safety as the central secret of enduring capital preservation.",
    key_mental_models: [
      {
        name: "Margin of Safety",
        description: "Always purchasing assets at a substantial discount to intrinsic value to absorb unexpected downturns, errors, or black swan events.",
        application: "Applied in Starlight financial modeling and compute resource budgeting."
      },
      {
        name: "Mr. Market Allegory",
        description: "Market prices fluctuate emotionally; the intelligent investor serves as Mr. Market's buyer when he is manic-depressive, not his disciple.",
        application: "Guides macro capital allocation and contrarian venture positioning."
      }
    ],
    core_chapters: [
      { number: 8, title: "The Investor and Market Fluctuations", takeaway: "Price fluctuations should be welcomed as opportunities to buy low and sell high." },
      { number: 20, title: "Margin of Safety as the Central Concept of Investment", takeaway: "The function of margin of safety is rendering the necessity for accurate future prediction unnecessary." }
    ],
    cross_repo_applications: [
      { repo: "agentic-investor-os", context: "Grounds fundamental asset valuation and valuation criteria." }
    ],
    quotes: [
      { quote: "Confronted with a challenge to distill the secret of sound investment into three words, we venture the motto, MARGIN OF SAFETY.", source: "Chapter 20" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-margin-of-safety" },
      { type: "teaches", target: "concept-intrinsic-value-dcf" }
    ]
  },
  {
    id: "book-munger-poor-charlies-almanack",
    type: "book",
    label: "Poor Charlie's Almanack",
    description: "Charlie Munger's wit, wisdom, and latticework of mental models across psychology, physics, mathematics, and multidisciplinary investing.",
    domain: "domain-investing-wealth-capital",
    tags: ["charlie-munger", "mental-models", "latticework", "inversion", "multidisciplinary-thinking"],
    status: "evergreen",
    title: "Poor Charlie's Almanack",
    authors: ["Charles T. Munger", "Peter D. Kaufman"],
    year: 2005,
    isbn: "978-1578643035",
    publisher: "Warranting Publishing",
    canonical_url: "https://poorcharliesalmanack.com",
    summary: "Collects Charlie Munger's legendary talks on constructing a Latticework of Mental Models, the Psychology of Human Misjudgment, Inversion, and Circle of Competence.",
    key_mental_models: [
      {
        name: "Latticework of Mental Models",
        description: "Synthesizing the fundamental big ideas from mathematics, physics, biology, and psychology to understand complex systems.",
        application: "The foundational architectural philosophy of the Starlight Knowledge Tree."
      },
      {
        name: "Inversion (Invert, Always Invert)",
        description: "Instead of asking how to succeed, ask how to guarantee failure, and then systematically avoid those failure modes.",
        application: "Directly powers Starlight Red-Team passes and Santa Loop audits."
      },
      {
        name: "Circle of Competence",
        description: "Knowing the exact boundaries of what you understand deeply vs what you only have superficial knowledge of.",
        application: "Enforced in agent routing contracts."
      }
    ],
    cross_repo_applications: [
      { repo: "starlight-knowledge-tree", context: "Philosophical blueprint for the multi-domain ontology." },
      { repo: "second-brain-vault", context: "Structures mental model catalogs and reflection rubrics." }
    ],
    quotes: [
      { quote: "You must know the big ideas in the big disciplines and use them routinely.", source: "Talk Two" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-circle-of-competence" },
      { type: "teaches", target: "concept-margin-of-safety" }
    ]
  },
  {
    id: "book-marks-most-important-thing",
    type: "book",
    label: "The Most Important Thing",
    description: "Howard Marks' masterclass on risk management, market cycles, second-level thinking, and contrarian investing from Oaktree Capital.",
    domain: "domain-investing-wealth-capital",
    tags: ["howard-marks", "risk-management", "market-cycles", "second-level-thinking", "contrarian"],
    status: "evergreen",
    title: "The Most Important Thing",
    authors: ["Howard Marks"],
    year: 2011,
    isbn: "978-0231153683",
    publisher: "Columbia University Press",
    canonical_url: "https://www.oaktreecapital.com/insights/howard-marks-memos",
    summary: "Distills Howard Marks' Oaktree memos into 20 essential chapters. Details Second-Level Thinking, understanding that risk is the probability of permanent capital loss, and leaning against market extremes.",
    key_mental_models: [
      {
        name: "Second-Level Thinking",
        description: "First-level: 'It's a great company, let's buy.' Second-level: 'It's a great company, but everyone knows it, so it is overpriced and risky.'",
        application: "Applied in Starlight strategic decision evaluation and AI trend counter-positioning."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-investor-os", context: "Directs risk evaluation algorithms and portfolio rebalancing." }
    ],
    quotes: [
      { quote: "Remember, your goal in investing isn't to earn average returns; you want to do better than average. Thus, your thinking has to be better than that of others.", source: "Chapter 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-second-level-thinking" },
      { type: "teaches", target: "concept-macro-credit-cycles" }
    ]
  },
  {
    id: "book-dalio-principles-debt-crises",
    type: "book",
    label: "Principles for Navigating Big Debt Crises",
    description: "Ray Dalio's macroeconomic template on short-term and long-term credit cycles, deleveraging dynamics, and sovereign monetary policy.",
    domain: "domain-investing-wealth-capital",
    tags: ["ray-dalio", "debt-crises", "credit-cycles", "macroeconomics", "deleveraging"],
    status: "evergreen",
    title: "Principles for Navigating Big Debt Crises",
    authors: ["Ray Dalio"],
    year: 2018,
    isbn: "978-1732689800",
    publisher: "Bridgewater Associates",
    canonical_url: "https://www.principles.com/big-debt-crises",
    summary: "The comprehensive mechanics of credit creation, asset bubbles, tightening phases, beautiful deleveragings, and currency devaluations across 48 historical crises.",
    key_mental_models: [
      {
        name: "The Economic Machine (Credit Cycles)",
        description: "Credit creates purchasing power out of future promises, producing short-term (5-8 year) and long-term (50-75 year) debt cycles.",
        application: "Guides macro treasury management and multi-currency capital hedging."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-wealth-os", context: "Informs treasury management and inflation-hedging strategies." }
    ],
    quotes: [
      { quote: "Credit is spending power that is created out of thin air. When you get a loan, you can spend more than you produce.", source: "Part 1" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-macro-credit-cycles" }
    ]
  },
  {
    id: "book-naval-almanack",
    type: "book",
    label: "The Almanack of Naval Ravikant",
    description: "Naval Ravikant's principles on building wealth through specific knowledge, accountability, and permissionless leverage (code and media).",
    domain: "domain-investing-wealth-capital",
    tags: ["naval", "wealth-creation", "permissionless-leverage", "specific-knowledge", "sovereignty"],
    status: "evergreen",
    title: "The Almanack of Naval Ravikant",
    authors: ["Eric Jorgenson", "Naval Ravikant"],
    year: 2020,
    isbn: "978-1544514215",
    publisher: "Magrathea Publishing",
    canonical_url: "https://www.navalmanack.com",
    summary: "Collects Naval Ravikant's wisdom on sovereign wealth creation. Explains how to acquire Specific Knowledge, take on Accountability, and apply Permissionless Leverage (Code, Media, Autonomous Agent Swarms).",
    key_mental_models: [
      {
        name: "Permissionless Leverage (Code & Media)",
        description: "Leverage that works while you sleep without needing anyone's permission: software code, digital media, and autonomous agent swarms.",
        application: "The foundational philosophy behind FrankX creator engines and Starlight agent swarms."
      },
      {
        name: "Specific Knowledge & Authenticity",
        description: "Specific knowledge is found by pursuing your genuine curiosity and obsession rather than whatever is currently hot.",
        application: "Guides Arcanea creative universe and sovereign intellectual property."
      }
    ],
    cross_repo_applications: [
      { repo: "agentic-creator-os", context: "Core philosophical foundation for creator sovereignty." },
      { repo: "agentic-income-skills", context: "Designs permissionless leverage workflows for digital products." }
    ],
    quotes: [
      { quote: "Fortunes require leverage. Business leverage comes from capital, people, and products with no marginal cost of replication (code and media).", source: "Building Wealth" }
    ],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [
      { type: "teaches", target: "concept-permissionless-leverage" },
      { type: "teaches", target: "concept-sovereign-wealth-engine" },
      { type: "teaches", target: "concept-barbell-capital-allocation" }
    ]
  }
];

const merged = [...existingBooks.filter(e => !newBooks.some(n => n.id === e.id)), ...newBooks];
fs.writeFileSync(booksFilePath, JSON.stringify(merged, null, 2), "utf8");
console.log(`✅ Successfully enriched books.json! Total books: ${merged.length}`);
