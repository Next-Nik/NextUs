export const TOP_LEVEL_GOAL =
  "A world that is a net positive for all life — where human civilisation contributes to the flourishing of the planet and each other.";

// Helper to build placeholder subDomains at a given depth
function placeholders(prefix, depth) {
  if (depth === 0) return [];
  return Array.from({ length: 7 }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: "Being mapped",
    horizonGoal: "placeholder",
    description: "placeholder",
    subDomains: placeholders(`${prefix}-${i + 1}`, depth - 1),
  }));
}

// Build a named subdomain with placeholder children
function sub(id, name, horizonGoal, description, depth = 2) {
  return {
    id,
    name,
    horizonGoal,
    description,
    subDomains: placeholders(id, depth),
  };
}

export const domains = [
  {
    id: "human-being",
    name: "Human Being",
    horizonGoal:
      "Every person has access to the conditions that allow them to know themselves, develop fully, and contribute meaningfully.",
    description:
      "The foundation of all collective life. When individuals have the conditions to develop fully — psychologically, physically, and spiritually — everything else follows.",
    subDomains: [
      sub("hb-health", "Health & Wellbeing",
        "Every person has access to the physical, psychological, and social conditions that allow them to function and flourish.",
        "The conditions of the body and mind that make full participation in life possible."),
      sub("hb-education", "Education & Development",
        "Every person has access to learning environments that cultivate their full human capacity across the lifespan.",
        "How human capacity is cultivated, transmitted, and grown — from early childhood through the full arc of a life."),
      sub("hb-consciousness", "Consciousness & Inner Life",
        "The interior dimension of human experience is recognised and resourced as foundational to collective life.",
        "The territory of inner development — contemplative practice, identity, meaning, and the cultivation of presence."),
      sub("hb-rights", "Rights, Dignity & Justice",
        "Every person is protected by structures that recognise their inherent dignity and enable full participation in society.",
        "The structural conditions that protect and enable human flourishing — rights, equity, and restorative justice."),
      sub("hb-culture", "Culture, Arts & Expression",
        "Human beings have rich access to creative expression, cultural continuity, and the meaning-making that makes life worth living.",
        "How human beings make meaning, process experience, and transmit values through creative and cultural life."),
      sub("hb-personal", "Personal Development",
        "Every person has access to tools and frameworks that support their individual growth and self-understanding.",
        "The practices, frameworks, and relationships that support a person in growing into their full potential."),
      sub("hb-community", "Community & Belonging",
        "Every person has access to genuine community — the relational fabric that makes individual flourishing sustainable.",
        "The social conditions that make belonging, connection, and mutual care possible at every scale of life."),
    ],
  },
  {
    id: "society",
    name: "Society",
    horizonGoal:
      "Human communities are organised in ways that generate trust, belonging, and collective agency.",
    description:
      "The architecture of how we live together — the structures, norms, and institutions that either generate or deplete collective capacity.",
    subDomains: [
      sub("soc-governance", "Governance & Democracy",
        "Governance systems are transparent, participatory, and genuinely accountable to the people they serve.",
        "How communities make collective decisions and hold power accountable."),
      sub("soc-justice", "Social Justice & Inclusion",
        "Every person can participate fully in society regardless of background, identity, or circumstance.",
        "The work of equity, representation, and dismantling structural barriers."),
      sub("soc-cooperation", "Global Cooperation",
        "Nations and peoples work together effectively on shared challenges at planetary scale.",
        "The frameworks, institutions, and practices that enable coordination across borders."),
      sub("soc-culture", "Cultural Dynamics",
        "Cultures are vibrant, diverse, and in generative relationship with each other.",
        "How meaning, identity, and values move through communities and across generations."),
      sub("soc-media", "Media & Information",
        "Information systems support informed, connected, and discerning citizens.",
        "The flows of information that shape how people understand their world."),
      sub("soc-peace", "Peace & Conflict",
        "Conflicts are resolved through dialogue, restorative justice, and structural change rather than violence.",
        "The practices and architectures that prevent, manage, and transform conflict."),
      sub("soc-fabric", "Social Fabric",
        "Communities have the trust, cohesion, and mutual care that make collective life resilient.",
        "The relational infrastructure that holds communities together — trust, belonging, civic participation."),
    ],
  },
  {
    id: "nature",
    name: "Nature",
    horizonGoal:
      "The living systems of the planet are regenerating, and humanity is a net contributor to that regeneration.",
    description:
      "The living systems that all life depends on — ecological, atmospheric, oceanic — and the human practices that support their regeneration.",
    subDomains: [
      sub("nat-climate", "Climate & Atmosphere", "placeholder", "placeholder"),
      sub("nat-ecosystems", "Ecosystems & Biodiversity", "placeholder", "placeholder"),
      sub("nat-food", "Food, Agriculture & Land", "placeholder", "placeholder"),
      sub("nat-water", "Water Systems", "placeholder", "placeholder"),
      sub("nat-ocean", "Oceans & Marine Life", "placeholder", "placeholder"),
      sub("nat-built", "Built Environment & Nature", "placeholder", "placeholder"),
      sub("nat-energy", "Energy & Resources", "placeholder", "placeholder"),
    ],
  },
  {
    id: "technology",
    name: "Technology",
    horizonGoal:
      "Our tools extend human wisdom and deepen connection, developing in relationship with our capacity to use them well.",
    description:
      "The tools we build and the futures they make possible — with particular attention to whether those systems serve the full scope of what humanity is trying to become.",
    subDomains: [
      sub("tech-ai", "Artificial Intelligence", "placeholder", "placeholder"),
      sub("tech-digital", "Digital Systems & Internet", "placeholder", "placeholder"),
      sub("tech-bio", "Biotechnology & Life Sciences", "placeholder", "placeholder"),
      sub("tech-energy", "Energy Technology", "placeholder", "placeholder"),
      sub("tech-space", "Space & Frontier Tech", "placeholder", "placeholder"),
      sub("tech-ethics", "Technology Ethics & Governance", "placeholder", "placeholder"),
      sub("tech-human", "Human-Technology Interface", "placeholder", "placeholder"),
    ],
  },
  {
    id: "finance-economy",
    name: "Finance & Economy",
    horizonGoal:
      "Resources flow toward what sustains and generates life — rewarding care, contribution, and long-term thinking.",
    description:
      "The flows that determine what gets built and who benefits — and what it would mean to align those systems with long-term human and planetary flourishing.",
    subDomains: [
      sub("fin-systems", "Economic Systems & Design", "placeholder", "placeholder"),
      sub("fin-capital", "Capital & Investment", "placeholder", "placeholder"),
      sub("fin-distribution", "Distribution & Equity", "placeholder", "placeholder"),
      sub("fin-labour", "Labour & Work", "placeholder", "placeholder"),
      sub("fin-trade", "Trade & Global Economy", "placeholder", "placeholder"),
      sub("fin-commons", "Commons & Shared Resources", "placeholder", "placeholder"),
      sub("fin-measurement", "Economic Measurement", "placeholder", "placeholder"),
    ],
  },
  {
    id: "legacy",
    name: "Legacy",
    horizonGoal:
      "Each generation leaves the conditions for the next generation to flourish more fully than they did.",
    description:
      "The long arc of civilisational responsibility — what we inherit, what we steward, and what we leave behind.",
    subDomains: [
      sub("leg-wisdom", "Intergenerational Wisdom", "placeholder", "placeholder"),
      sub("leg-longterm", "Long-Term Thinking & Stewardship", "placeholder", "placeholder"),
      sub("leg-heritage", "Heritage & Preservation", "placeholder", "placeholder"),
      sub("leg-future", "Future Generations", "placeholder", "placeholder"),
      sub("leg-ceremony", "Sacred & Ceremonial Life", "placeholder", "placeholder"),
      sub("leg-mythology", "Mythology & Narrative", "placeholder", "placeholder"),
      sub("leg-space", "Space Civilisation & Deep Future", "placeholder", "placeholder"),
    ],
  },
  {
    id: "vision",
    name: "Vision",
    horizonGoal:
      "Humanity has a shared and evolving picture of where it is going — and the coordination infrastructure to move toward it together.",
    description:
      "The orienting capacity of civilisation itself — the narratives, frameworks, and coordination systems that make collective movement possible.",
    subDomains: [
      sub("vis-futures", "Futures & Foresight", "placeholder", "placeholder"),
      sub("vis-philosophy", "Philosophy & Worldview", "placeholder", "placeholder"),
      sub("vis-indigenous", "Indigenous & Relational Worldviews", "placeholder", "placeholder"),
      sub("vis-leadership", "Conscious Leadership", "placeholder", "placeholder"),
      sub("vis-movements", "Social Movements & Change", "placeholder", "placeholder"),
      sub("vis-intelligence", "Collective Intelligence", "placeholder", "placeholder"),
      sub("vis-purpose", "Civilisational Purpose", "placeholder", "placeholder"),
    ],
  },
];
