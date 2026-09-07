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
  featuredSlug: "bareway",
  skills: [
    {
      label: "Brand analysis",
      description:
        "I research a brand and its competitors — products, content, and audience response — to surface distinctive strengths.\nFindings are framed as target and content strategy, not a list of observations.",
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
      situation:
        "Even in a protein-shake market (~₩5.8T), competitors repeated taste, value, and nutrition specs — while Bareway lacked a clear repurchase strategy. For persona ‘Kim Bare’ (23, job-seeking marketer into fashion, home workouts, and body care), we hypothesized that mood and routine messaging would recall the brand better than specs alone. The brief was a pre-launch plan: Meta, Kakao DA, and Naver SA creatives, assumed KPIs, and a ₩10M monthly media mix.",
      actions: [
        "Compared USP and pricing across four competitors (Flymeal, EatTheFit, Kkobakkobab, Proteone) to find a taste × lifestyle gap",
        "Split Meta (remarketing), Kakao (routine proximity), and Naver SA (search/conversion) along the first-buy → pause → repurchase journey",
        "Produced one taste × fashion Instagram Reel plus Kakao Bizboard and Naver PowerLink creatives",
        "Media mix: Kakao Bizboard 70% (₩7M), Naver PowerLink 30% (₩1.5M × 2), Instagram Reels owned (paid 0%) for a ₩10M monthly plan",
        "Locked assumed KPIs — Meta save 0.03–0.05% / share 0.3–0.5%, Naver CVR 12%+ / CTR 1.5%, Kakao CPA down / UTM / scroll depth",
      ],
      result:
        "Delivered a repurchase campaign plan with one Reel, Kakao Bizboard and Naver creatives, plus channel roles, budget, and assumed KPIs. 70% of paid budget sat on Kakao retargeting; Instagram worked as owned reminder — ‘recall’ vs ‘repurchase’ split by medium. Reflection: no live metrics yet, but pinning success criteria (e.g. Naver CVR 12% above ~11.5% prior purchase CVR) at the creative stage was the plan’s main persuasion point.",
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
      slug: "musinsa",
      shortTitle: "Musinsa",
      title: "AI ad film for Mujinjang Black Friday momentum",
      kind: "personal",
      meta: "Personal project (contest) · Eliminated in prelims | Role: concept · AI film direction · edit",
      tools: "CapCut · KlingAI",
      period: "2026.06",
      situation:
        "Musinsa’s ‘Mujinjang success AI film contest’ asked for a 5–30s AI ad announcing Mujinjang Black Friday. The hypothesis: a discount card alone won’t stop the scroll — season mood and brand tone must remain in short cuts. Street scenes shifting between clear and rainy weather, with repeating props like bikes and cones, aimed to read like a lookbook as much as a promo.",
      actions: [
        "Designed concept and cut list to brief rules (key visual ≥1×, 5–30s, AI-made)",
        "Kept season mood continuous by changing only weather and wardrobe at the same location",
        "Used orange accents (bike, cones) as visual links across cuts, aligned to key visual and brand color (#FE4900)",
        "Generated and edited with KlingAI and CapCut into a finished Mujinjang promo AI film",
      ],
      result:
        "Submitted one AI ad for Mujinjang Black Friday but was eliminated in the prelims. Wear-and-street mood landed, yet ‘Mujinjang’ and the offer weren’t readable in the opening seconds — weak fit with a hype/promo brief. Reflection: mood and promo message need separate layers; next time lead with event/benefit, then continue into mood cuts.",
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
    },
    {
      company: "Woongjin Thinkbig",
      role: "FrontEnd Developer",
      period: "2025.03.12 – 2025.11.30",
    },
    {
      company: "SPARTACLUB · Naebaeum Camp",
      role: "Student",
      period: "2026.04.20 – 2026.09.14",
    },
  ],
  education: [
    {
      school: "Gwangju Software Meister High School",
      period: "2022.03 – 2025.02",
    },
  ],
  certificates: [
    {
      name: "Industrial Engineer Information Processing",
      date: "2024.03.15",
    },
  ],
};
