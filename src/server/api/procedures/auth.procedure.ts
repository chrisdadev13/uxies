import { t } from "../trpc";
import {
  enforceUserIsAdmin,
  enforceUserIsAuthed,
} from "../middlewares/session.middleware";

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const rbacProcedure = t.procedure.use(enforceUserIsAdmin);
