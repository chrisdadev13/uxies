import React from "react";
import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Avatar, AvatarImage } from "@/ui/avatar";

interface DiceAvatarProps {
  className: string;
  alt: string;
  name: string;
  size: number;
}

export default function DiceAvatar({
  className,
  alt,
  name,
  size,
}: DiceAvatarProps) {
  const avatar = React.useMemo(() => {
    return createAvatar(openPeeps, {
      seed: name,
      size: size,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
    }).toDataUriSync();
  }, []);

  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} alt={alt} />
    </Avatar>
  );
}
