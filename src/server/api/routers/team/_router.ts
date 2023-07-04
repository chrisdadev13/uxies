import { z } from "zod";
import { createTRPCRouter } from "../../trpc";
import {
  protectedProcedure,
  rbacProcedure,
} from "../../procedures/auth.procedure";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { Role } from "@prisma/client";

export const teamsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      const team = await prisma.team.findUnique({
        where: {
          name: input.name,
        },
      });

      return {
        ...team,
      };
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        memberships: {
          select: {
            teamId: true,
          },
        },
      },
    });

    if (!user)
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

    const teams = await prisma.team.findMany({
      where: {
        id: {
          in: [...user?.memberships.map((e) => e.teamId), "id"],
        },
      },
    });

    return [
      {
        label: "Personal Account",
        teams: [
          {
            label: "@me",
            value: user.id,
          },
        ],
      },
      {
        label: "Teams",
        teams: [
          ...teams.map((e) => ({
            label: e.name,
            value: e.id,
          })),
        ],
      },
    ];
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().trim().toLowerCase(),
        bio: z.string().min(0).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const alreadyExist = Boolean(
        await prisma.team.findFirst({
          where: {
            name: input.name,
          },
        })
      );

      if (alreadyExist)
        throw new TRPCError({
          code: "CONFLICT",
          message: "The group name was already taken, try again",
        });

      const newTeam = await prisma.team.create({
        data: {
          name: input.name,
          bio: input.bio,
          limit: 5,
          members: {
            create: {
              userId: ctx.session.user.id,
              role: Role.OWNER,
            },
          },
        },
      });

      return {
        name: newTeam.name,
        bio: newTeam.bio,
        owner: ctx.session.user,
      };
    }),
});
