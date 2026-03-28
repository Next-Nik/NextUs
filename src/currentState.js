// NextUs Domain Explorer — Current State Data
// Version 1.0 · March 2026
// Illustrative data — produced by Decision Analytics when run against real domain data

export const CURRENT_STATE = {
  "human-being": {
    score: 5.4,
    narrative: "Significant progress in life expectancy and literacy over the past century, but the inner dimensions of human development — consciousness, meaning, psychological health — remain structurally under-resourced. Mental health reaches crisis levels globally while systems built to address it lag a generation behind what we know works.",
    gapSignal: false,
    gapReason: null,
    indicators: [
      { label: "Global literacy rate", value: "87%", trend: "up" },
      { label: "Mental health treatment gap", value: "75%", trend: "flat" },
      { label: "Life expectancy", value: "73 years", trend: "up" },
    ],
    actors: [
      { name: "Mind & Life Institute", scale: "global", type: "research_institution", winning: true },
      { name: "WHO Mental Health Action Plan", scale: "international", type: "government", winning: true },
      { name: "Luminos Fund", scale: "regional", type: "organisation", winning: true },
      { name: "Inner Development Goals", scale: "international", type: "organisation", winning: true },
      { name: "Porticus", scale: "international", type: "funder", winning: false },
    ],
    totalActors: 214,
    entryPoints: {
      Builder: "What system of human development are you trying to redesign?",
      Healer: "Where is the deepest wound in human flourishing you are called to address?",
      Sage: "What knowledge about human potential is most urgently needed right now?",
      Connector: "Who in this domain needs to find each other but hasn't yet?",
      Protector: "What conditions for human dignity are most at risk right now?",
      Nurturer: "What dimension of care is most missing from human development systems?",
      default: "What dimension of human development do you work in?",
    },
  },

  "society": {
    score: 4.1,
    narrative: "Democratic institutions are under stress globally. Trust in government, media, and each other is at historic lows across most measured democracies. The social fabric that makes collective action possible is fraying — not broken, but under pressure that existing systems were not designed to hold.",
    gapSignal: true,
    gapReason: "Low score · Low actor density in governance innovation · Funding concentrated in incumbents",
    indicators: [
      { label: "Global democracy index", value: "5.29/10", trend: "down" },
      { label: "Institutional trust", value: "43%", trend: "down" },
      { label: "Civic participation", value: "Declining", trend: "down" },
    ],
    actors: [
      { name: "Involve", scale: "national", type: "organisation", winning: true },
      { name: "DemocracyNext", scale: "international", type: "organisation", winning: true },
      { name: "Participedia", scale: "global", type: "research_institution", winning: true },
      { name: "Nesta", scale: "national", type: "organisation", winning: true },
      { name: "Open Government Partnership", scale: "international", type: "government", winning: false },
    ],
    totalActors: 87,
    entryPoints: {
      Builder: "What governance system are you trying to make more participatory?",
      Healer: "What broken social compact are you working to restore?",
      Sage: "What do we know about trust-building that isn't being applied?",
      Connector: "What communities need to be in dialogue but aren't?",
      Protector: "What democratic norm is most urgently under threat?",
      Nurturer: "What social fabric needs tending in your community?",
      default: "Where in the social fabric are you working?",
    },
  },

  "nature": {
    score: 3.8,
    narrative: "The trajectory is still negative but the rate is slowing. Renewable energy deployment is accelerating faster than most models predicted. Biodiversity loss continues at pace. The gap between what is needed and what is happening is large — but the number of actors in this field is growing faster than any other domain.",
    gapSignal: false,
    gapReason: null,
    indicators: [
      { label: "CO₂ concentration", value: "424 ppm", trend: "down" },
      { label: "Species at risk", value: "44,000+", trend: "down" },
      { label: "Renewable energy share", value: "30%", trend: "up" },
    ],
    actors: [
      { name: "Regen Network", scale: "global", type: "organisation", winning: true },
      { name: "La Paz Fish Cooperative", scale: "local", type: "community_group", winning: true },
      { name: "Terraformation", scale: "regional", type: "organisation", winning: true },
      { name: "Patagonia", scale: "international", type: "organisation", winning: true },
      { name: "Conservation International", scale: "global", type: "organisation", winning: false },
    ],
    totalActors: 431,
    entryPoints: {
      Builder: "What regenerative system are you trying to scale?",
      Healer: "Which ecosystem are you in relationship with and working to restore?",
      Sage: "What ecological knowledge is being lost that must be preserved?",
      Connector: "Who needs to be matched — a funder, a practitioner, a community?",
      Protector: "What living system is most urgently at risk in your territory?",
      Nurturer: "What land or water body are you in a relationship of care with?",
      default: "Which living system are you in relationship with?",
    },
  },

  "technology": {
    score: 6.2,
    narrative: "Technological capability is advancing faster than governance or wisdom. The tools exist. The capacity to use them well — individually, institutionally, collectively — lags significantly. AI is the sharpest expression of this gap: extraordinary capability arriving before the ethical and governance frameworks needed to hold it.",
    gapSignal: false,
    gapReason: null,
    indicators: [
      { label: "AI governance frameworks", value: "Emerging", trend: "up" },
      { label: "Digital access gap", value: "2.7B offline", trend: "flat" },
      { label: "Open source adoption", value: "Growing", trend: "up" },
    ],
    actors: [
      { name: "Centre for AI Safety", scale: "international", type: "research_institution", winning: true },
      { name: "Algorithmic Justice League", scale: "national", type: "organisation", winning: true },
      { name: "Digital Public Goods Alliance", scale: "global", type: "organisation", winning: true },
      { name: "Partnership on AI", scale: "global", type: "organisation", winning: true },
      { name: "OpenAI", scale: "global", type: "organisation", winning: false },
    ],
    totalActors: 156,
    entryPoints: {
      Builder: "What tool or system are you trying to make wiser or more equitable?",
      Healer: "What harm caused by technology are you working to address?",
      Sage: "What do we know about technology governance that isn't being applied?",
      Connector: "Who needs access to technology that currently can't reach it?",
      Protector: "What human capacity is at risk of being replaced rather than extended?",
      Nurturer: "How are you helping communities develop healthy relationships with technology?",
      default: "What tool or system are you trying to make wiser?",
    },
  },

  "finance-economy": {
    score: 3.2,
    narrative: "The current economic system continues to reward extraction over regeneration, short-term returns over long-term stewardship, and growth over wellbeing. Care work — the labour that sustains life — remains largely invisible to GDP. The gap between where capital flows and where it needs to flow is the largest leverage point in the system.",
    gapSignal: true,
    gapReason: "Score below threshold · Care economy actors critically underrepresented · Patient capital structurally scarce",
    indicators: [
      { label: "Wealth concentration (top 1%)", value: "45%", trend: "down" },
      { label: "Care economy valuation", value: "Unmeasured", trend: "flat" },
      { label: "Impact investment AUM", value: "$1.2T", trend: "up" },
    ],
    actors: [
      { name: "Wellbeing Economy Alliance", scale: "international", type: "organisation", winning: true },
      { name: "Celo Foundation", scale: "global", type: "funder", winning: true },
      { name: "Gitcoin", scale: "global", type: "organisation", winning: true },
      { name: "Triodos Bank", scale: "national", type: "funder", winning: true },
      { name: "BlackRock", scale: "global", type: "funder", winning: false },
    ],
    totalActors: 63,
    entryPoints: {
      Builder: "What economic system or institution are you redesigning?",
      Healer: "What economic harm — to people or planet — are you working to repair?",
      Sage: "What do we know about regenerative economics that isn't yet mainstream?",
      Connector: "What project needs capital that can't find it? What funder needs better signal?",
      Protector: "What commons or shared resource needs defending from extraction?",
      Nurturer: "How are you making care work visible and valued?",
      default: "What flow of resources are you trying to redirect?",
    },
  },

  "legacy": {
    score: 4.7,
    narrative: "Intergenerational thinking is structurally absent from most political and economic systems. The rights of future generations have no institutional voice. Indigenous wisdom traditions — the longest-running experiments in intergenerational stewardship — are disappearing faster than they are being honoured.",
    gapSignal: true,
    gapReason: "Future generations have no institutional representation · Indigenous knowledge holders critically under-resourced · Low actor density",
    indicators: [
      { label: "Languages at risk", value: "3,000+", trend: "down" },
      { label: "Long-term governance bodies", value: "~12 globally", trend: "flat" },
      { label: "Intergenerational equity index", value: "Unmeasured", trend: "flat" },
    ],
    actors: [
      { name: "Future Generations Commissioner Wales", scale: "national", type: "government", winning: true },
      { name: "Long Now Foundation", scale: "international", type: "organisation", winning: true },
      { name: "Potawatomi Language Keepers", scale: "local", type: "indigenous_knowledge_holder", winning: true },
      { name: "Club of Rome", scale: "international", type: "research_institution", winning: true },
      { name: "World Economic Forum", scale: "global", type: "organisation", winning: false },
    ],
    totalActors: 41,
    entryPoints: {
      Builder: "What institution or practice are you building to serve future generations?",
      Healer: "What severed lineage — of knowledge, culture, or relationship — are you working to restore?",
      Sage: "What wisdom from elders or ancestors needs to be carried forward?",
      Connector: "Who needs to be in conversation across generations that isn't?",
      Protector: "What inheritance — cultural, ecological, institutional — is at risk of being lost?",
      Nurturer: "How are you tending the relationship between generations in your community?",
      default: "What are you trying to leave behind for the seventh generation?",
    },
  },

  "vision": {
    score: 2.9,
    narrative: "This is the most under-resourced domain and the one whose absence creates a ceiling for all others. Without a shared sense of direction, coordination is impossible — not because the will is absent but because the destination is invisible. This is the gap NextUs itself exists to close.",
    gapSignal: true,
    gapReason: "Lowest score across all domains · Coordination infrastructure essentially unmeasured · Critical leverage point for all other domains",
    indicators: [
      { label: "Shared civilisational goal", value: "None articulated", trend: "flat" },
      { label: "Cross-domain coordination platforms", value: "<10 globally", trend: "up" },
      { label: "Futures literacy", value: "Unmeasured", trend: "flat" },
    ],
    actors: [
      { name: "NextUs", scale: "global", type: "organisation", winning: true },
      { name: "Collective Intelligence Project", scale: "international", type: "organisation", winning: true },
      { name: "Institute for the Future", scale: "international", type: "research_institution", winning: true },
      { name: "Perspectiva", scale: "national", type: "organisation", winning: true },
      { name: "World Future Council", scale: "international", type: "organisation", winning: false },
    ],
    totalActors: 28,
    entryPoints: {
      Builder: "What coordination infrastructure are you building?",
      Healer: "What fractured sense of shared future are you working to restore?",
      Sage: "What futures thinking is most urgently needed right now?",
      Connector: "Who needs to see the same horizon that currently can't find each other?",
      Protector: "What collective capacity for foresight is at risk of being lost?",
      Nurturer: "How are you helping your community develop a sense of shared direction?",
      default: "How are you helping humanity see where it is going?",
    },
  },
};

// Archetype definitions — for matching entry points
export const ARCHETYPES = [
  "Builder",
  "Healer",
  "Sage",
  "Connector",
  "Protector",
  "Nurturer",
];

// Scale labels for display
export const SCALE_LABELS = {
  local: "Local",
  municipal: "Municipal",
  regional: "Regional",
  national: "National",
  international: "International",
  global: "Global",
};

// Domain key to id mapping
export const DOMAIN_KEY_MAP = {
  "human-being": 0,
  "society": 1,
  "nature": 2,
  "technology": 3,
  "finance-economy": 4,
  "legacy": 5,
  "vision": 6,
};
