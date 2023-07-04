import type { NextApiRequest, NextApiResponse } from "next";
import { generateRandomId } from "@/utils/generate-id";
import { prisma } from "@/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { username, email, teamName, teamLimit } = data;

  const userEmail = email.toLowerCase();

  if (!email) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  const usernameTaken = Boolean(
    await prisma.user.findFirst({
      where: {
        username: username,
      },
    })
  );

  const existingUser = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  const existingTeam = await prisma.team.findFirst({
    where: {
      name: teamName,
    },
  });

  if (existingUser || existingTeam) {
    const message: string = existingUser
      ? "Email address is already registered"
      : "Team name is already taken";

    res.status(409).json({ message });
    return;
  }

  await prisma.user.create({
    data: {
      username: usernameTaken ? `${username}#${generateRandomId()}` : username,
      email: userEmail,
      memberships: {
        create: {
          team: {
            create: {
              name: teamName,
              limit: teamLimit,
            },
          },
        },
      },
    },
  });

  res.status(201).json({ message: "User created" });
  return;
};

export default handler;
