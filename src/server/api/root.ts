import { teamsRouter } from "@/server/api/routers/team/_router";
import { usersRouter } from "@/server/api/routers/user/_router";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  teams: teamsRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
