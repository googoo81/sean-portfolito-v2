import { getStackItems } from "@/features/portfolio/constants";
import type { Portfolio } from "@/features/portfolio/types";

export const portfolioEn: Portfolio = {
  intro: {
    headline: "A marketer who builds\nthe ideas they plan",
    process: ["Strategy", "Content", "Execution"],
    closing:
      "I don’t stop at analysis — I design the full path from insight to content that fits the audience and channel, all the way to a finished deliverable.",
    pairs: [
      ["Planning", "Visual"],
      ["Copy", "Development"],
    ],
  },
  contact: {
    name: "Hyeonwoo Song",
    phone: "010-9052-4780",
    email: "officialhyeanwoo@gmail.com",
    github: "https://github.com/googoo81",
    linkedin:
      "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%86%A1-a058b528a/",
  },
  stack: getStackItems("en"),
  featuredSlug: "chicment",
  skills: [
    {
      label: "Brand analysis",
      description:
        "I research brands and competitors to uncover distinctive strengths.\nFindings become target and content strategy—not a list of observations.",
    },
    {
      label: "Brand research",
      description:
        "I set content themes and messages from audience interests and lifestyle cues.\nBrand intent is shaped into concepts people can understand and care about quickly.",
    },
    {
      label: "Image content",
      description:
        "I produce card news, Instagram carousels, and ad creatives with Figma and generative AI.\nFlow and layout are planned so the brand message lands visually.",
    },
    {
      label: "Short-form content",
      description:
        "I plan short-form from concept through scene design, storyboard, and copy.\nImage and video are sequenced so viewers stay through the end.",
    },
    {
      label: "Storytelling",
      description:
        "I design content journeys from brand intro to product, channel, and user action.\nEach frame and line is meant to read as one continuous story.",
    },
    {
      label: "Copywriting",
      description:
        "I write titles, body copy, and CTAs for the goal and channel.\nAfter someone sees the content, the next action should be obvious.",
    },
  ],
  projects: [
    {
      slug: "bareway",
      shortTitle: "Bareway",
      title: "A repurchase campaign designed with a ₩10M monthly media mix",
      kind: "team",
      meta: "Team project · Pre-launch plan | Role: content strategy · Reels/ad creatives · design",
      tools: "Figma · CapCut · Generative AI",
      period: "2026.07",
      icon: "/project/variway/icon.png",
      problem:
        "Even in a protein-shake market (~₩5.8T), competitors kept repeating taste, value, and nutrition specs. Bareway lacked a clear path from first purchase to brand recall and repurchase — the brief needed a content and media structure that answered “why drink again,” not only “what to buy.”",
      strategy:
        "For persona ‘Kim Bare’ (23, job-seeking marketer into fashion, home workouts, and body care), we chose mood and routine messaging over spec lists. Along first-buy → pause → repurchase, Meta owned remarketing, Kakao owned routine proximity, and Naver SA owned search/conversion. The plan assumed a ₩10M monthly mix that split “make them remember” vs “make them buy again” by channel.",
      execution: [
        "Compared USP and pricing across four competitors (Flymeal, EatTheFit, Kkobakkobab, Proteone) to map a taste × lifestyle gap",
        "Produced one taste × fashion Instagram Reel plus Kakao Bizboard and Naver PowerLink creatives",
        "Built the media-mix deck — Kakao Bizboard 70% (₩7M), Naver PowerLink 30% (₩1.5M × 2), Instagram Reels owned (paid 0%)",
        "Locked assumed channel KPIs at the creative stage — Meta save/share, Naver CVR/CTR, Kakao CPA/UTM/scroll depth",
      ],
      closing: {
        kind: "points",
        label: "Project Point",
        items: [
          "Repurchase strategy grounded in market analysis",
          "Creative strategy matched to intent by channel",
          "SA keyword structure",
          "DA and owned content planning",
          "Budget-based media mix design",
        ],
      },
      cover: {
        src: "/project/variway/mockup.png",
        alt: "Bareway Instagram Reels mockup",
        fit: "contain",
      },
      video: "/project/variway/main.mov",
      videoFormat: "reels",
      links: [
        {
          label: "Campaign plan (PDF)",
          href: "/project/variway/ppt.en.pdf",
        },
      ],
    },
    {
      slug: "chicment",
      shortTitle: "Chicment",
      title:
        "Interactive content that turns vague taste into clear first-luxury criteria",
      kind: "team",
      meta: "Team project · Instagram ads | Role: content strategy · interactive planning · ad & landing iteration",
      tools: "GA4 · Meta Ads · Cursor",
      period: "2026.08",
      icon: "/project/chicment/icon.png",
      problem:
        "First-luxury shoppers in their 20s–30s can find brand and product info easily, but lack personal criteria for “is this right for me?” Chicment already held trusted wear-and-use reviews, yet a community-heavy structure and information volume raised the entry bar. The core gap: “I know what I like, but I can’t explain why.”",
      strategy:
        "Instead of one-way product recommendations, we built PICKGAM — a 30-second interactive test where users discover their own taste criteria through choice. The funnel was ad → taste test → result → Chicment real-use reviews, with message continuity from ad promise to landing reason-to-participate as the strategic spine.",
      execution: [
        "Planned and built the PICKGAM landing (five intuitive choices) and connected it to Instagram ads",
        "Round 1: curiosity short-form reached 5.77% CTR, but 80% first-screen bounce and 4.7% final CTA exposed a bottleneck",
        "Hypothesized that the first screen didn’t explain why to take the test now; reframed from ‘fun taste quiz’ to ‘reduce first-luxury failure’",
        "Improved round-2 landing and creatives with question-led copy, problem framing, ‘check real reviews’ CTA, toned-down UI, and live participant proof",
        "Compared round-2 splits — info creatives 5.77%→1.95% CTR vs curiosity 1.72%→4.67% — concluding ad–landing continuity beats hook intensity alone",
      ],
      closing: {
        kind: "outcome",
        body: "Among users who started the test, CTA reach rose 26%→66% and final CTA click 4.7%→6.2%, strengthening the late funnel into Chicment. Early entry remains a follow-up challenge, but we confirmed that one message from ad problem → landing reason → result → CTA matters more than spiking CTR with shock hooks. Traffic → drop-off → hypothesis → content fix → retest became the decision loop.",
      },
      cover: {
        src: "/project/chicment/mockup.png",
        alt: "Chicment PICKGAM interactive content mockup",
        fit: "contain",
      },
      links: [
        {
          label: "PICKGAM landing — luxury taste test",
          href: "https://loving44.dothome.co.kr/",
        },
        {
          label: "Chicment New Customer Acquisition Project",
          href: "/project/chicment/ppt.en.pdf",
        },
      ],
    },
    {
      slug: "musinsa",
      shortTitle: "Musinsa",
      title: "AI ad film for Mujinjang Black Friday momentum",
      kind: "personal",
      meta: "Personal project (contest) · Eliminated in prelims | Role: concept · AI film direction · edit",
      tools: "CapCut · KlingAI",
      period: "2026.06",
      icon: "/project/musinsa/icon.png",
      problem:
        "Musinsa’s ‘Mujinjang success AI film contest’ asked for a 5–30s AI ad announcing Mujinjang Black Friday. A discount card alone rarely stops the scroll — short cuts still needed season mood and brand tone so hype and atmosphere could travel together.",
      strategy:
        "Treat the promo like a lookbook: keep season mood continuous by changing only weather and wardrobe at the same location, and link cuts with orange accents (bike, cones) aligned to the key visual and brand color (#FE4900).",
      execution: [
        "Designed concept and cut list to brief rules (key visual ≥1×, 5–30s, AI-made)",
        "Built street scenes with weather/wardrobe shifts and repeating props as visual bridges",
        "Generated and edited with KlingAI and CapCut into one finished Mujinjang promo AI film",
      ],
      closing: {
        kind: "points",
        label: "Key Takeaway",
        items: [
          "Cut design that keeps season mood and brand tone continuous in a short ad",
          "Prop and accent color aligned to key visual and brand palette",
          "Solo pipeline from concept to finished film via AI generate-and-edit",
          "Next-work rule — stamp event/benefit early, then continue into mood cuts as separate message layers",
        ],
      },
      cover: {
        src: "/project/musinsa/mockup.png",
        alt: "Musinsa Mujinjang AI ad mockup",
        fit: "contain",
      },
      video: "/project/musinsa/main.mov",
      videoFormat: "reels",
    },
  ],
  histories: [
    {
      company: "Sionic AI",
      role: "FrontEnd Developer, Designer",
      period: "2024.10.02 – 2025.02.07",
      href: "https://night-sunday-f95.notion.site/In-Sionic-3a68c8fcce8a81d58004feb295854713",
    },
    {
      company: "Woongjin Thinkbig",
      role: "FrontEnd Developer",
      period: "2025.03.12 – 2025.11.30",
      href: "https://night-sunday-f95.notion.site/In-3a68c8fcce8a813ab4d4da80aca3bdcc",
    },
    {
      company: "SPARTACLUB · Naebaeum Camp",
      role: "Student",
      period: "2026.04.20 – 2026.09.14",
      projectsFilter: "team",
    },
  ],
  education: [
    {
      school: "Gwangju Software Meister High School",
      period: "2022.03 – 2025.02",
      href: "https://night-sunday-f95.notion.site/In-School-3a68c8fcce8a81a48a74c7b99185ed70",
    },
  ],
  certificates: [
    {
      name: "Industrial Engineer Information Processing",
      date: "2024.03.15",
    },
  ],
};
