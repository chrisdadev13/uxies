import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Skeleton } from "@/ui/skeleton";
import { Form, FormField, FormItem, FormControl } from "@/ui/form";

import { api } from "@/utils/api";

import { useRouter } from "next/router";
import Link from "next/link";

import { useZodForm } from "@/utils/zod-form";
import * as z from "zod";

type Groups = Array<{
  label: string;
  teams: Array<{
    label: string;
    value: string;
  }>;
}>;

type Team = Groups[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

const teamCreationSchema = z.object({
  name: z.string().trim().toLowerCase(),
  bio: z.string().min(0).max(50),
});

type TeamCreationData = z.infer<typeof teamCreationSchema>;

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const form = useZodForm({
    schema: teamCreationSchema,
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const createTeam = api.teams.create.useMutation({
    onSuccess: (values) => {
      router.push(`/${values.name}`);
      setShowNewTeamDialog(false);
    },
  });

  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = React.useState<Team>();
  const [open, setOpen] = React.useState(false);
  const { data: spaces, isLoading, isError } = api.teams.list.useQuery();

  if (isLoading || isError) return <Skeleton className="h-8 w-[200px]" />;

  const onSubmit = (values: TeamCreationData) => {
    createTeam.mutate(values);
  };

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="border-0 shadow-none">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam?.value}.png`}
                alt={selectedTeam?.label}
              />
              <AvatarFallback>uxie</AvatarFallback>
            </Avatar>
            {selectedTeam?.label ?? spaces[0]?.teams[0]?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {spaces!.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <Link href={`/${team.label}`} key={team.value}>
                      <CommandItem
                        key={team.value}
                        onSelect={() => {
                          setSelectedTeam(team);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${team.value}.png`}
                            alt={team.label}
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {team.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTeam?.value === team.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create team</DialogTitle>
              <DialogDescription>
                Add a new team to manage products and customers.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="name">Team name</Label>
                      <Input
                        id="name"
                        {...field}
                        placeholder="acme"
                        value={field.value.trim().toLowerCase()}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewTeamDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
