import { getStackItems } from "@/features/portfolio/constants";
import type { Portfolio } from "@/features/portfolio/types";

export const portfolioEn: Portfolio = {
  intro: {
    headline: "A marketer who builds\nthe ideas they plan",
    subhead: "I design one flow from strategy through content to execution.",
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
      title: "Made a flavor-and-outfit Reel so the taste would be remembered again.",
      kind: "team",
      meta: "Team project (5) · Pre-launch plan | Role: Reel production",
      tools: "Figma · CapCut · Generative AI",
      period: "2026.07",
      icon: "/project/variway/icon.png",
      summary:
        "A two-week plan to be remembered for taste, then chosen again for a pre-work meal and for search.",
      problemLabel: "Market Analysis",
      problemLead:
        "Discount-led messages left buyers with no reason to remember the brand.",
      problem:
        "In a market where Flymeal and Proteone talk in specs and discounts, Bareway had no clear reason to be bought again.",
      strategyLabel: "Strategy",
      strategyLead: "Remembered for taste, chosen again as a routine.",
      strategy:
        "Instagram shows the taste again, Kakao proposes a meal before work, and Naver connects search to purchase.",
      strategyPoints: [],
      executionLabel: "Channel Strategy",
      execution: [],
      channels: [
        {
          name: "Instagram Owned",
          role: "Make taste and the package memorable again",
          items: [
            "Reel ‘Outfit edits by flavor.zip’",
            "Match package color to a fashion look, and suggest another flavor",
          ],
        },
        {
          name: "Kakao Bizboard",
          role: "Offer a new reason: one meal before work",
          items: [
            "‘Craving something sweet before work?’",
            "‘A light daily protein’",
          ],
        },
        {
          name: "Naver Powerlink",
          role: "Connect search to the product page and purchase",
          items: [
            "‘High-fiber protein shake’",
            "‘A Bareway shake that stays good to the last sip’",
          ],
        },
      ],
      creative: {
        label: "Reel Creative",
        lead: "Produced the Reel ‘Outfit edits by flavor.zip’.",
        body: "It was made not to look like a protein ad. Package colors match fashion looks, so choosing a taste feels like choosing an outfit.\nIt brings back a flavor they already tried, then leads to one they have not.\nFrames stack from strawberry to matcha, chocolate, and coffee, and the outfit cut enters over the pouch.",
      },
      mediaMix: {
        label: "Media Mix",
        budget: "2 weeks · ₩10M",
        rationale:
          "Taste recall runs with no ad spend. Paid budget goes to the pre-work moment and to search conversion.",
        items: [
          {
            channel: "Kakao Bizboard",
            share: "70%",
            role: "Reach people who already had a touchpoint",
            notes: ["₩7M · site visitors and channel friends"],
          },
          {
            channel: "Naver Powerlink",
            share: "30%",
            role: "Connect search to purchase",
            notes: ["₩3M · two creatives, 15% each"],
          },
          {
            channel: "Instagram Owned",
            share: "0% paid",
            role: "Remind followers of the taste",
            notes: ["₩0 · flavor-and-outfit Reel"],
          },
        ],
      },
      closing: {
        kind: "points",
        label: "Project Point",
        items: [],
      },
      deck: false,
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
      title: "Turned first-luxury anxiety into a taste-discovery experience.",
      kind: "team",
      meta: "Team project (6) · Meta ads | Role: landing page planning, design & build · Meta ad setup · GA4 integration & analysis",
      tools: "GA4 · Meta Ads · Cursor",
      period: "2026.08–09",
      reading: "result-first",
      result: "To reviews 26.6% → 67.4%",
      icon: "/project/chicment/icon.png",
      summary:
        "A 5-question test helped people find taste criteria, then the result led to Chicment’s real-use reviews.",
      problemLead:
        "They find products appealing — but can’t explain why those products fit them.",
      problem:
        "First-luxury beginners can compare products and prices. What they lack is a personal selection standard.",
      strategyLead:
        "Don’t add more information. Help them discover their own taste criteria first.",
      strategy:
        "The audience was women in their 20s–30s facing a first luxury purchase.",
      strategyFlow: [
        "Short-form ad",
        "5-question interactive test",
        "16 taste-type results",
        "Chicment real-use review content",
      ],
      strategyPoints: [],
      execution: [],
      channels: [
        {
          name: "Landing page",
          role: "Owned · what changed in round 2",
          items: [
            "Headline: ‘just for fun’ → ‘Avoid a first-luxury mistake!’",
            "Live ‘N people took this test’ on the first screen",
            "CTA: ‘Chicment’s real reviews’ → ‘See honest reviews’",
          ],
        },
        {
          name: "Meta ads · GA4",
          role: "Owned · setup & analysis",
          items: [
            "Round-1 spend was ₩86,501 on creative 1 and ₩5,849 on creative 2\nThe weaker one was stopped early. GA4 measured visit → start → reviews",
            "About 78% of round-1 response was ages 25–34\nRound 2 narrowed to women 24–32",
          ],
        },
      ],
      mediaMix: {
        label: "Ad Test",
        budget: "₩250K total · Round 1 ₩100K · Round 2 ₩150K",
        rationale:
          "In round 2, short-form A got heavier and explanatory, and clicks fell.\nShort-form B, whose promise of avoiding a first-luxury mistake matched the landing, gained clicks.\nTotal visits stayed nearly flat, 535 to 527.",
        items: [
          {
            channel: "Short-form A",
            share: "CTR 5.77% → 1.95%",
            role: "Efficiency fell",
            notes: ["CPC ₩167 → ₩403 · landing views 501 → 14"],
          },
          {
            channel: "Short-form B",
            share: "CTR 1.72% → 4.67%",
            role: "Efficiency rose",
            notes: ["Impressions 699 → 11,934 · landing views 7 → 497"],
          },
        ],
      },
      closing: {
        kind: "outcome",
        label: "Optimization",
        comparison: {
          beforeLabel: "Round 1 · 8.20–8.24",
          afterLabel: "Round 2 · 9.1–9.3",
          rows: [
            { label: "Visit", before: 535, after: 527 },
            { label: "Test start", before: 94, after: 46 },
            { label: "To reviews", before: 25, after: 31 },
          ],
        },
        body: "The share of starters who reached reviews rose from 26.6% to 67.4%, and mid-test drop-off fell from 69 people to 15.\nPre-start drop-off grew from 82.4% to 91.3% — the first-screen barrier was not solved.",
      },
      cover: {
        src: "/project/chicment/mockup.png",
        alt: "Chicment PICKGAM interactive content mockup",
        fit: "contain",
      },
      detailHero: false,
      links: [
        {
          label: "PICKGAM landing — luxury taste test",
          href: "https://loving44.dothome.co.kr/",
        },
        {
          label: "Project presentation (PDF)",
          href: "/project/chicment/ppt.en.pdf",
        },
      ],
    },
    {
      slug: "musinsa",
      shortTitle: "Musinsa",
      title: "Made one street film so every season stays with Musinsa.",
      kind: "personal",
      meta: "Personal project (contest) · Eliminated in prelims | Role: concept · AI film direction · edit",
      tools: "GPT · KlingAI · CapCut",
      period: "2026.06",
      icon: "/project/musinsa/icon.png",
      summary:
        "Announces how cheap Mujinjang is, with summer’s feeling and orange tone, made to stay on Reels.",
      strategyLabel: "Concept",
      strategyLead: "The flow follows summer’s seasonal feeling.",
      strategy:
        "It moves from early-summer green, to a monsoon umbrella, to harsh midsummer noon, to late-summer dusk, and the fashion changes to match that seasonal feeling.\nThe bike, the cone, and the opening orange keep the brand tone.\nChanging season and fashion on one street was made with AI.\nGPT made the start and end frames. Kling generated several 3-second clips, then CapCut joined them and finished the film.",
      executionLabel: "Film",
      execution: [
        "Opening line: ‘Any season, with Musinsa.’",
        "End card: ‘Mujinjang’ · 26 Summer Black Friday · ‘Up to 80% off’",
      ],
      closing: {
        kind: "points",
        label: "Key Takeaway",
        items: [],
        body: "The offer sits on the last card. Next time, Mujinjang comes first, then the season cuts.",
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
