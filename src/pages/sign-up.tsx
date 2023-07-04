import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

import { useZodForm } from "@/utils/zod-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import * as z from "zod";
import { toast } from "@/ui/use-toast";
import { Label } from "@/ui/label";

const signUpSchema = z.object({
  username: z.string().min(2).max(18),
  email: z.string().email(),
  teamName: z.string().min(2).max(50),
  teamLimit: z.number(),
});

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const form = useZodForm({
    schema: signUpSchema,
    defaultValues: {
      username: "",
      email: "",
      teamName: "",
      teamLimit: 5,
    },
  });

  const { mutate } = useMutation(async (values: SignUpData) => {
    const res = await fetch("/api/auth/sign-up", {
      body: JSON.stringify({
        ...values,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const api = await res.json();

    if (!res.ok) throw api.message;
  });

  const onSubmit = (values: SignUpData) => {
    mutate(values, {
      onSuccess: () => {
        router.push({
          pathname: "/auth/login",
        });
      },
      onError: (err: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong",
          description: err,
        });
      },
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
            <h1 className="text-5xl font-extrabold">Create your account</h1>
            <p className="mb-8 text-gray-700">
              Choose your team name, you can always change it later...
            </p>
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <Label>Team Name:</Label>
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <span
                        className="  
          border-r-none flex h-9 items-center justify-center rounded-l-md border border-r-0 bg-background py-5 pl-3 text-sm shadow-sm"
                      >
                        uxies.io/
                      </span>
                      <Input
                        placeholder="acme"
                        {...field}
                        className="rounded-l-none border-l-0 py-5 pl-1 lowercase focus:outline-none focus:ring-0 focus-visible:ring-0"
                        value={field.value.trim().toLowerCase()}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label>Username: </Label>
                  <FormControl>
                    <Input
                      placeholder="chrisdadev"
                      {...field}
                      className="py-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label>Email: </Label>
                  <FormControl>
                    <Input
                      placeholder="example@direction.com"
                      {...field}
                      className="py-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <small className="mb-8">
              You have nothing to worry about, all your personal information is
              encrypted and safe in our database... You don't believe us? Check
              our{" "}
              <a
                className="text-blue-500"
                href="https://github.com/chrisdadev13/uxies"
              >
                source code
              </a>
            </small>

            <Button>Create account</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
