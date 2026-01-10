export const copy = {
  site: {
    tagline: "Year of the Build",
  },
  digests: {
    description: "Weekly summaries of progress across all projects.",
    cta: "Subscribe to get these in your inbox.",
  },
  devlogs: {
    description: "Rolling devlogs detailing ongoing progress and challenges.",
  },
  projects: {
    description: "What's being built. Each project gets its own devlogs tracking progress from idea to launch.",
  },
  empty: (type: string) => `No ${type} yet. Check back soon!`,
} as const;
