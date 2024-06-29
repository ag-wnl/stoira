import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
    createComment: protectedProcedure
        .input(z.object({
        content: z.string().min(1),
        postId: z.number()
        }))
        .mutation(async ({ ctx, input }) => {
        // simulate a slow db call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return ctx.db.comment.create({
            data: {
                content: input.content,
                post: { connect: { id: input.postId } },
                author: { connect: { id: ctx.session.user.id } }
            }
        });
    }),

    // Procedure to fetch comments by post ID
    getCommentsByPostId: publicProcedure
        .input(z.object({ postId: z.number() }))
        .query(async ({ ctx, input }) => {
        return ctx.db.comment.findMany({
            where: { postId: input.postId },
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                replies: { // Include replies
                    include: {
                        author: {
                        select: {
                            name: true,
                            image: true,
                        },
                        },
                    },
                },
            }
        });
    }),

    createReply: protectedProcedure
    .input(z.object({
        content: z.string().min(1),
        postId: z.number(),
        parentCommentId: z.number(), 
    }))
    .mutation(async ({ ctx, input }) => {
        try {    
        const reply = await ctx.db.comment.create({
            data: {
            content: input.content,
            post: { connect: { id: input.postId } },
            author: { connect: { id: ctx.session.user.id } },
            parentComment: { connect: { id: input.parentCommentId } }, // Connect parent comment
            },
        });

        return reply;
    } catch (err) {
        console.error('Error creating reply:', err);
    }
  }),

  // Procedure to fetch replies by parent comment ID
  getRepliesByCommentId: publicProcedure
    .input(z.object({ parentCommentId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { parentCommentId: input.parentCommentId },
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),
});
