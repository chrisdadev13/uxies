import { Role } from "@/server/auth";
import { t } from "../trpc";
import { TRPCError, type Maybe } from "@trpc/server";
import { TRPCContextInner } from "../trpc";
import { Session } from "next-auth";

export const getUserFromSession = async (
  ctx: TRPCContextInner,
  session: Maybe<Session>
) => {
  const { prisma } = ctx;

  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;

  const { email, id } = user;

  if (!email || !id) return null;

  return {
    ...user,
  };
};

export type UserFromSession = Awaited<ReturnType<typeof getUserFromSession>>;
export type TrpcSessionUser = UserFromSession;

export const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || ctx.session?.membership.role === Role.USER) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
