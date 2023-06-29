import React, { useEffect, useRef } from "react";
import { useFeatureStore } from "@/store/features";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import DiceAvatar from "./avatar";

import {
  ChartBar,
  ChartPie,
  Link as LinkIcon,
  Pointer,
  Plus,
} from "tabler-icons-react";
import Image from "next/image";

interface Props {
  children?: React.ReactNode;
  id: string;
}

export const FeatureTile: React.FC<Props> = ({ children, id }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const setInviewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  useEffect(() => {
    if (isInView) setInviewFeature(id);
    if (inViewFeature === "id" && !isInView) setInviewFeature(null);
  }, [isInView, id, setInviewFeature, inViewFeature]);

  return (
    <p
      ref={ref}
      className={classNames(
        "font-heading py-16 text-left text-5xl font-bold transition-colors",
        isInView ? "text-black" : "text-gray-300"
      )}
    >
      {children}
    </p>
  );
};

export const FeatureCard: React.FC<{
  children?: React.ReactNode;
  gradient: string;
  id: string;
}> = ({ children, gradient, id }) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  return (
    <div
      className={classNames(
        "absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br transition-opacity",
        gradient,
        inViewFeature === id ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
};

interface CardProps {
  id: string;
}

export const FirstCard = ({ id }: CardProps) => (
  <FeatureCard id={id} gradient="from-green-50 to-green-100">
    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg p-24 text-left">
      <div className="my-3 flex h-full w-2/4 flex-col rounded-l-lg bg-white py-5 pl-5 pr-3">
        <div className="h-full rounded-lg bg-[#70F8A6] p-2 shadow-md">
          <small>In the flow </small>
        </div>
        <div className="jusitfy-center my-2 flex flex-col items-center">
          <small className="text-xs text-gray-500">Preparation time</small>
          <Button
            variant="secondary"
            className="my-2 flex w-full items-center text-xs text-gray-600"
          >
            <Plus size={16} /> Add Meeting
          </Button>
          <small className="text-xs text-gray-500">Getting into the Flow</small>
        </div>
        <div className="h-full rounded-lg bg-[#70F8A6] p-2 shadow-md">
          <small>In the flow </small>
        </div>
      </div>
      <div className="my-3 flex h-full w-2/4 flex-col rounded-r-lg bg-white py-5 pr-5">
        <div className="h-full rounded-lg bg-[#70F8A6] p-2 shadow-md"></div>
      </div>
    </div>
  </FeatureCard>
);

export const SecondCard = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-blue-50 to-blue-200">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="my-3 w-2/4 rounded-md bg-white p-10 text-left ">
          <h2 className="text-lg">#working-ui</h2>
          <ul>
            <li className="flex items-center justify-center">
              <DiceAvatar
                className="h-8 w-8 border border-green-700"
                name="Taylor"
                size={48}
                alt="Random Avatar created as a preview"
              />
              <div className="flex w-full items-center justify-between">
                <p className="ml-2 ">Taylor</p>
                <p className="ml-12">2h</p>
              </div>
            </li>
            <li className="my-2 flex items-center justify-center">
              <DiceAvatar
                className="h-8 w-8"
                name="Joe"
                size={48}
                alt="Random Avatar created as a preview"
              />

              <div className="flex w-full items-center justify-between">
                <p className="ml-2 w-5">Joe</p>
                <p className="ml-12">1h</p>
              </div>
            </li>

            <li className="my-2 flex items-center justify-center">
              <DiceAvatar
                className="h-8 w-8"
                name="Jake"
                size={48}
                alt="Random Avatar created as a preview"
              />

              <div className="flex w-full items-center justify-between">
                <p className="ml-2 w-5">Jake</p>
                <p className="ml-12">30m</p>
              </div>
            </li>
            <h2 className="text-lg">#focus</h2>
            <li className="flex items-center">
              <DiceAvatar
                className="h-8 w-8"
                name="Jose"
                size={48}
                alt="Random Avatar created as a preview"
              />
              <DiceAvatar
                className="ml-2 h-8 w-8"
                name="Luis"
                size={48}
                alt="Random Avatar created as a preview"
              />
            </li>
          </ul>
        </div>
      </div>
    </FeatureCard>
  );
};

export const ThirdCard = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-purple-50 to-purple-200">
      <div className=" flex h-full w-full items-center justify-center">
        <div className=" flex w-2/4 flex-col items-center justify-center rounded-lg bg-white p-5">
          <p>Who's joining us today!? </p>
          <div className="my-5">
            <div className="mb-2 flex items-center justify-between">
              <Input type="text" placeholder="First name" className="mr-2" />
              <Input type="text" placeholder="Last name" />
            </div>
            <Input type="text" placeholder="Email" />
            <small>Accept terms and conditions</small>
          </div>
          <Button variant="default" className="w-full">
            Invite
          </Button>
        </div>
      </div>
    </FeatureCard>
  );
};

export const FourthCard = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient="from-orange-50 to-orange-200">
      <div className=" flex h-full w-full items-center justify-center">
        <div className="flex w-2/4 flex-col items-center justify-center rounded-lg bg-white p-10 text-left">
          <DiceAvatar
            className="h-16 w-16"
            name="Taylor"
            size={48}
            alt="Random Avatar created as a preview"
          />
          <h1 className="text-lg font-semibold">Taylor</h1>
          <p className="mb-2 text-sm">Changing the world ✨</p>
          <div className="w-full text-left">
            <h1>Role: </h1>
            <Badge> OWNER </Badge>
          </div>
          <Input type="text" placeholder="Message Taylor" className="mt-5" />
        </div>
      </div>
    </FeatureCard>
  );
};
