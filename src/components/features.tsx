import React from "react";
import Link from "next/link";
import { BrandGithub } from "tabler-icons-react";
import { buttonVariants } from "@/ui/button";

import {
  FeatureTile,
  FirstCard,
  FourthCard,
  SecondCard,
  ThirdCard,
} from "./feature";

const features = [
  {
    paragraph: "Design your meetings focusing in what matters, the TIME!!",
    id: "first",
    card: FirstCard,
  },
  {
    paragraph: "Monitor and create a professional ecosystem for your team",
    id: "second",
    card: SecondCard,
  },
  {
    paragraph:
      "Invite your co-workers, teammates, classmates and start working",
    id: "third",
    card: ThirdCard,
  },
  {
    paragraph: "Don't lose the one by one connection, connect with your team",
    id: "fourth",
    card: FourthCard,
  },
];

const Features = () => {
  return (
    <>
      <div className="mt-20 flex flex-col items-center justify-center text-center md:px-20 lg:px-72 xl:px-96">
        <h1 className="text-4xl font-extrabold">
          Not only a chat application but your workspace{" "}
          <span className="text-primary">
            join now and create your work environment.
          </span>
        </h1>
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "mt-10",
          })}
        >
          <BrandGithub />
          Star on Github
        </Link>
        <div className="flex w-full items-start gap-20">
          <div className="w-full py-[35vh]">
            <ul>
              {features.map((feature, index) => (
                <li key={index}>
                  <FeatureTile id={feature.id}>{feature.paragraph}</FeatureTile>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky top-0 flex h-screen w-full items-center">
            <div className="relative aspect-square w-full rounded-2xl bg-gray-100">
              {features.map((feature, index) => (
                <feature.card id={feature.id} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative px-32">
          <h1 className="text-6xl font-bold">
            Create your virtual office. Space. Chatroom. Calendar. Online
            Environment. ToDo
          </h1>
          <div className="absolute bottom-[-3%] left-0 right-0 top-auto h-full w-full bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <h1 className="mb-28 mt-5 text-4xl text-gray-500">
          All in one single place
        </h1>
      </div>
    </>
  );
};

export default Features;
