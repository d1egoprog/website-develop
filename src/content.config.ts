import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';


const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),	
});		

const industry = defineCollection({
  loader: glob( { base: "src/content/industry", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    organization: z.object({
        name: z.string(),
        url: z.string().optional(),
        type: z.string(),
    }),
    duration: z.object({
        start: z.object({
            year: z.int(),
            month: z.int(),
        }),
        end: z.object({
            year: z.int(),
            month: z.int(),
        }),
    }),
    location: z.object({
        city: z.string(),
        country: z.string()
    }),
    website: z.string().optional(),
    order: z.number()
  })
});

const research = defineCollection({
  loader: glob( { base: "src/content/research", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
        organization: z.object({
        name: z.string(),
        url: z.string().optional(),
        faculty: z.object({
            department:z.object({
                name: z.string(),
                url: z.string().optional(),
                type: z.string(),
            })
        })
    }),
    duration: z.object({
        start: z.object({
            year: z.int(),
            month: z.int(),
        }),
        end: z.object({
            year: z.int(),
            month: z.int(),
        }),
    }),
    location: z.object({
        city: z.string(),
        country: z.string()
    }),
    order: z.number()
  })
});

const education = defineCollection({
    loader: glob( { base: "src/content/education", pattern: "*.md" }),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        shortTitle: z.string().optional(),
        degree: z.object({
            level: z.string(),
            name: z.string(),
            abbreviation: z.string(),
            isced: z.number().optional(),
            url: z.string().optional()

        }),
        institution: z.object({
            name: z.string(),
            shortName: z.string().optional(),
            type: z.string().optional(),
            url: z.string().optional()
        }),
        department: z.object({
            name: z.string(),
            url: z.string().optional()
        }).optional(),
        location: z.object({
            city: z.string(),
            province: z.string().optional(),
            country: z.string(),
            continent: z.string()
        }),
        dates: z.object({
            completed: z.string()
        }),
        research: z.any().optional(),
        thesis: z.any().optional(),
        degreeProject: z.any().optional(),
        keywords: z.array(z.string()).default([]),
        display: z.object({
            order: z.number(),
            featured: z.boolean().optional()
        })
    })
});

export const collections = {
    education, research, industry, blog
};
