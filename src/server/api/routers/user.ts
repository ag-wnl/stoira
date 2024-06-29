import { Input } from "postcss";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
    hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    getUser: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { name: input.name },
      });

      if (!user) {
        throw new Error(`User with name ${input.name} not found`);
      }

      return user;
    }),

    updateUser: protectedProcedure
    .input(z.object({
      realName: z.string().optional(),
      about: z.string().optional(),
      website: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id; // Assuming the user is authenticated and session has the user id

      const updatedUser = await ctx.db.user.update({
        where: { id: userId },
        data: {
          realName: input.realName,
          about: input.about,
          website: input.website,
        },
      });

      return updatedUser;
    }),
});
