import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

export enum Role {
  OWNER,
  ADMIN,
  USER,
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
    membership: {
      team: string;
      teamName: string;
    };
  }

  interface User {
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user }) {
      const alreadyExist = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
        include: {
          memberships: {
            include: {
              team: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (alreadyExist) {
        return true;
      }

      return false;
    },
    session: async ({ session, user }) => {
      const membership = await prisma.membership.findFirst({
        where: {
          userId: user.id,
        },
        include: {
          team: true,
        },
      });

      if (session.user) {
        session.user.id = user.id;
      }
      return {
        ...session,
        user: {
          name: "",
          image: "",
          id: user.id,
          role: membership?.role,
        },
        membership: {
          team: membership?.teamId,
          teamName: membership?.team.name,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER,
        port: parseInt(env.EMAIL_PORT),
        auth: {
          user: env.EMAIL_USER,
          pass: env.EMAIL_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
