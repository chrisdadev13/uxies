import { Button } from "@/ui/button";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="h-auto">
        <div className="mx-auto max-w-7xl px-10 py-16 sm:px-6 sm:py-24 sm:text-center lg:px-8">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            uxies app
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Build your next idea together
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-xl text-gray-500">
            Are you ready to start organizing and building your next great idea
            side by side with your team? No matter where they are, we have free
            solution for you and your group
          </p>

          <div className="flex items-center justify-center">
            <div className="my-10 flex h-[48vh] w-[48vw] items-center justify-center rounded-lg bg-stone-900 text-white"></div>
          </div>
          <div className="flex items-center justify-center">
            <Button variant="secondary" asChild>
              <Link href="https://github.com/chrisdadev13/calypso">
                Source Code
              </Link>
            </Button>
            <Button className="ml-3" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
