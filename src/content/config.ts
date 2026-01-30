import { defineCollection, z } from 'astro:content';

const projetos = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        coverImage: image().optional(),
        techStack: z.array(z.string()).optional(),
        year: z.string().optional(),
        projectType: z.string().optional(),
    }),
});

export const collections = { projetos };
