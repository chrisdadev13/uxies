import { z } from "zod";
import { createTRPCRouter } from "../../trpc";
import {
  protectedProcedure,
  rbacProcedure,
} from "../../procedures/auth.procedure";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user)
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

    return {
      ...user,
    };
  }),
});
