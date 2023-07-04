import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "@/ui/use-toast";

import { getServerAuthSession } from "@/server/auth";
import { signIn } from "next-auth/react";
import { type GetServerSideProps } from "next";

import * as z from "zod";
import { useZodForm } from "@/utils/zod-form";

import { Form, FormField, FormItem, FormControl } from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

const logInSchema = z.object({
  email: z.string().email(),
});

type LogInData = z.infer<typeof logInSchema>;

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const query = router.query;
  useEffect(() => {
    if (query.msg)
      toast({
        variant: "default",
        title: "Message: ",
        description: query.msg,
      });
  }, [query]);

  const form = useZodForm({
    schema: logInSchema,
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: LogInData) => {
    signIn("email", {
      email: values.email,
      redirect: true,
    });
  };
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Form {...form}>
          <form
            className="flex w-1/3 flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="text-5xl font-extrabold">Log in using your Email</h1>
            <p className="mb-5 text-gray-700">
              For now this is the only safe method we have to authenticate you
              :/
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <small className="mb-5">
              We are going to send you an email, with a link, to authenticate
              your account
            </small>

            <Button>Log in</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: `/@me`,
    },
    props: { session },
  };
};
