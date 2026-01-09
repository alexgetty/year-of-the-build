import { defineCollection, z } from 'astro:content';

const devlogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    isDraft: z.boolean().default(false),
    project: z.string(), // Slug reference to a project (required)
  }),
});

const digests = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(), // Sunday publish date
    isDraft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['planning', 'building', 'launched', 'abandoned']).default('planning'),
    tags: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(), // Key features list
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(), // Launch stats
    launchDate: z.date().optional(),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
  }),
});

export const collections = { devlogs, digests, projects };
