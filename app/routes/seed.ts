import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { seederMutations } from "~/lib/database/_seeder/mutations";
import { seederSavings } from "~/lib/database/_seeder/savings";

export const loader = (async ({ request, context }) => {
  if (process.env.NODE_ENV !== "development") {
    return json({ message: "Not allowed" });
  }

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  if (!searchParams.has("type")) {
    return json("No seed types");
  }

  const type = searchParams.get("type");

  switch (type) {
    case "savings":
      await seederSavings();
      return json({ message: "Implanted the savings seeds boss!" });
    case "mutations":
      await seederMutations();
      return json({ message: "Implanted the mutations seeds boss!" });
    default:
      return json("Invalid seed types");
  }
}) satisfies LoaderFunction;
