import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const generateAvatar = (name: string) => {
  createAvatar(thumbs, {
    seed: name,
  });
};
