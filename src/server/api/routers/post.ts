import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), title: z.string().min(1)}))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          title: input.title,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAllPosts: publicProcedure
  .query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });
  }),

  getPostById: publicProcedure
    .input(z.object({postId: z.number()}))
    .query(async ({ctx, input}) => {
      return ctx.db.post.findUnique({
        where: { id: input.postId },
        include: {
          createdBy: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      })
  }),

  searchPosts: publicProcedure
    .input(z.object({ term: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const searchTerm = input.term;
      return ctx.db.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      });
    }),
});
