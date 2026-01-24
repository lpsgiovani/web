import { defineCollection, z } from 'astro:content';

const projetos = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        coverImage: image(),
        techStack: z.array(z.string()),
    }),
});

export const collections = { projetos };
