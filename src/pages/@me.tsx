import Main from "@/components/layouts/main";
import TeamSwitcher from "@/components/team/team-switcher";
import { api } from "@/utils/api";
import type { ReactElement } from "react";

export default function User() {
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

User.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
