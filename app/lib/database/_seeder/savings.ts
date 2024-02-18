import { faker } from "@faker-js/faker";
import { adminDB } from "~/lib/firebase/admin.server";
import type { Savings } from "../types";

export const seederSavings = async () => {
  const batch = adminDB.batch();

  Array(10)
    .fill(true)
    .map(() => {
      const savings: Savings = {
        customer: faker.person.fullName(),
        withdrawable: 0,
        total: 0,
      };

      return savings;
    })
    .forEach((savings) => {
      batch.set(adminDB.collection("savings").doc(), savings);
      console.log(`Transaction set for: ${savings.customer}`);
    });

  console.log("Running transaction...");
  const result = await batch.commit();

  console.log(`Transaction complete. Generated ${result.length} documents.`);
};
