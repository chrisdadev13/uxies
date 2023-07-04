import type { ReactElement } from "react";

import Main from "@/components/layouts/main";
import TeamSwitcher from "@/components/team/team-switcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session === null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: session,
    },
  };
};

export default function Team() {
  const router = useRouter();
  const { data: team } = api.teams.get.useQuery({
    name: router.asPath.slice(1),
  });

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading</p>;
  }

  if (team)
    return (
      <>
        <h1>Team</h1>
        <p>The route is working</p>
        <p>{session?.user.id}</p>
      </>
    );
}

Team.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
