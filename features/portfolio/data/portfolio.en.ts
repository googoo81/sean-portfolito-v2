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
      title:
        "Made taste memorable in content, and designed repurchase across media touchpoints.",
      kind: "team",
      meta: "Team project · Pre-launch plan | Role: market analysis · channel strategy · content production · media mix",
      tools: "Figma · CapCut · Generative AI",
      period: "2026.07",
      icon: "/project/variway/icon.png",
      summary:
        "A strategy-planning project structured solo — from market analysis to channel content and media mix. Repurchase touchpoints were split by channel role, and taste plus daily routine were translated into content.",
      problemLabel: "Market Analysis",
      problemLead:
        "In a sea of similar ‘high-protein’ messages, we had to design a reason to come back.",
      problem:
        "The protein-shake market overlaps heavily on messaging, and Variway’s USP and repurchase reason weren’t sharp enough. Competitor work across brands like Flymeal and Proteone showed a repeating pattern of specs and value claims. From that analysis we chose taste, daily routine, and repurchase situations over another ‘high-protein’ line — analysis → pattern → strategy.",
      strategyLabel: "Strategy",
      strategyLead:
        "Split messages by the situations where someone needs a shake, then separate content strategy by media role.",
      strategy:
        "Execution follows those situation axes into each channel: search for conversion, DA for re-awareness, owned for experiencing taste and mood.",
      strategyPoints: [
        "Commute and office-snack moments",
        "Body care and diet routines",
        "Resistance to processed protein taste",
        "An experience so good they come back for the flavor",
      ],
      executionLabel: "Channel Strategy",
      execution: [],
      channels: [
        {
          name: "Naver SA",
          role: "Convert high-intent search users",
          items: [
            "Keyword analysis by search intent",
            "Separate brand vs category keywords",
            "Situational queries like ‘office snack’ and ‘commute protein’",
            "Designed as the touchpoint that catches ready-to-buy demand",
          ],
        },
        {
          name: "Kakao Bizboard / DA",
          role: "Re-aware users who aren’t actively searching",
          items: [
            "Short, intuitive messages on taste and daily situations",
            "Focused on site visits and retargeting",
            "Owns recall and return before search",
          ],
        },
        {
          name: "Instagram Owned",
          role: "Let people experience brand mood and product use",
          items: [
            "Reel / Story–led formats",
            "Content aimed at saves, shares, and store traffic",
            "Owned touchpoint that builds brand experience without paid spend",
          ],
        },
      ],
      creative: {
        label: "Reel Creative",
        lead: "I analyzed brand mood solo, turned it into a concept, and produced the Reel.",
        body: "Reel was prioritized over carousel so taste × fashion mood could read in a short film. The hero mockup and video above are that deliverable.",
        flow: [
          "Mood analysis",
          "Core message",
          "Film concept",
          "Scene design",
          "Final Reel production",
        ],
      },
      mediaMix: {
        label: "Media Mix",
        budget: "Total budget ₩10M · 2-week plan",
        rationale:
          "We split ready-to-buy search demand from re-awareness demand that hasn’t searched yet. Paid budget sits on conversion and retargeting; mood and experience run on owned for efficiency plus brand feel.",
        items: [
          {
            channel: "Kakao Bizboard",
            share: "70%",
            role: "Site visits and retargeting",
            notes: [
              "Re-remind taste for users not yet searching",
              "Center paid budget on return and pre-conversion",
            ],
          },
          {
            channel: "Naver Powerlink",
            share: "30%",
            role: "Capture brand and category search demand",
            notes: [
              "Connect high-intent search to conversion",
              "Shape inflow quality with situational and category keywords",
            ],
          },
          {
            channel: "Instagram Owned",
            share: "0% paid",
            role: "Operate content with no separate ad spend",
            notes: [
              "Reels and Stories for taste and routine mood",
              "Run for saves, shares, and store traffic",
            ],
          },
        ],
      },
      closing: {
        kind: "points",
        label: "Project Point",
        items: [
          "Derived brand message direction from competitive market analysis",
          "Structured SA keywords by search intent",
          "Defined content roles for DA and owned media",
          "Analyzed brand mood and produced the Reel myself",
          "Designed a ₩10M-scale media mix",
        ],
        body: "Market analysis → strategy → channels → content → media mix was designed as one flow. What this project is meant to show isn’t a forced performance number — it’s the ability to structure repurchase touchpoints end to end.",
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
      title: "Turned first-luxury anxiety into a taste-discovery experience.",
      kind: "team",
      meta: "Team project · Instagram ads | Role: content strategy · experience design · ad & landing iteration",
      tools: "GA4 · Meta Ads · Cursor",
      period: "2026.08",
      icon: "/project/chicment/icon.png",
      summary:
        "Women in their 20s–30s considering a first luxury purchase already see brand and price info — what they lack is a personal decision standard. Instead of dumping more information, we used interactive content to help them discover taste criteria, then connected the result to Chicment’s real-use reviews.",
      problemLead:
        "They find products appealing — but can’t explain why those products fit them.",
      problem:
        "First-luxury beginners browse reviews across many channels, yet information is fragmented and often promotional, so confidence stays low. The issue wasn’t missing information — it was missing a personal selection standard.",
      strategyLead:
        "Don’t add more information. Help them discover their own taste criteria first.",
      strategy:
        "The audience was women in their 20s–30s considering a first luxury buy. We designed a content path that hooks curiosity into the test, delivers a taste-discovery experience, then turns the result into a desire to check real reviews.",
      strategyFlow: [
        "Short-form ad",
        "5-question interactive test",
        "16 taste-type results",
        "Chicment real-use review content",
      ],
      strategyPoints: [
        "Enter the test through curiosity",
        "Provide a taste-discovery experience",
        "Convert the result page into desire for real reviews",
      ],
      execution: [
        "Researched first-luxury purchase friction and framed the core problem as missing selection criteria",
        "Planned PICKGAM — a 5-question interactive test with 16 result types",
        "Designed and built the landing experience: ad → test → result → reviews",
        "Planned Meta short-form creatives to drive test entry",
        "Analyzed round-1 performance and identified pre-start drop-off as the main bottleneck",
        "Improved first-screen copy, CTA, and targeting for round 2",
      ],
      closing: {
        kind: "outcome",
        label: "Optimization",
        before: {
          title: "Before · Round 1",
          metrics: [
            { label: "Visits", value: "547" },
            { label: "Test starts", value: "121" },
            { label: "Drop-off before start", value: "~79%" },
            { label: "CTA reach among starters", value: "31.4%" },
          ],
          insight:
            "The bottleneck wasn’t only ad click — the landing first screen didn’t clearly explain why someone should take the test now.",
        },
        after: {
          title: "After · Round 2 changes",
          items: [
            "Strengthened the ‘prevent first-luxury failure’ message",
            "Added subcopy that states a reason to participate",
            "Added social proof such as live participant count",
            "Improved CTA copy",
            "Reset targeting conditions",
          ],
        },
        body: "We didn’t stop at ad CTR. Post-click behavior data revealed the bottleneck, then we redesigned message, CTA, and targeting. The point of this project isn’t a single final metric — it’s reading performance and shipping the next improvement.",
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
