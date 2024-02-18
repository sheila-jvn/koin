import { faker } from "@faker-js/faker";
import { adminDB } from "~/lib/firebase/admin.server";
import {
  getPercentage,
  roundToNearestMultiplierOf500,
} from "~/lib/utils/calculation";
import { mutationCollection, savingsCollection } from "../collections";
import type { Mutation, Savings } from "../types";

const generateMutations = (count: number) => {
  const mutations: Array<Mutation> = [];

  for (let i = 0; i < count; i++) {
    const type: Mutation["type"] = Math.random() < 0.9 ? "deposit" : "withdraw";
    let amount = roundToNearestMultiplierOf500(
      faker.number.int({ min: 5000, max: 100_000 })
    );

    if (type === "withdraw") {
      amount = -amount;
    }

    const totalBefore = i === 0 ? 0 : mutations[i - 1].totalAfter;
    const totalAfter = type === "deposit" ? totalBefore + amount : totalBefore;

    const withdrawableBefore = i === 0 ? 0 : mutations[i - 1].withdrawableAfter;
    const withdrawableAfter =
      withdrawableBefore + amount - getPercentage(5, totalAfter);

    const mutation: Mutation = {
      type,
      amount,
      withdrawableAfter,
      withdrawableBefore,
      totalAfter,
      totalBefore,
      date: faker.date.recent({ days: 7 }).getTime(),
    };

    mutations.push(mutation);
  }

  return mutations.sort((a, b) => a.date - b.date);
};

export const seederMutations = async () => {
  await adminDB.runTransaction(async (transaction) => {
    const savingsSnapshot = await transaction.get(savingsCollection());
    savingsSnapshot.forEach((doc) => {
      console.log(`Adding mutations for: ${(doc.data() as Savings).customer}`);
      const mutationsColl = mutationCollection(doc.ref);
      const mutations = generateMutations(faker.number.int({ min: 2, max: 6 }));

      mutations.forEach((mutation) => {
        console.log(
          `Adding mutation: ${mutation.type}-${mutation.amount}-${new Date(
            mutation.date
          ).toISOString()}`
        );
        transaction.set(mutationsColl.doc(), mutation);
      });
    });
  });

  console.log(`Adding mutations complete. Updating savings....`);

  const savingsSnapshot = await savingsCollection().get();
  savingsSnapshot.forEach(async (doc) => {
    const mutationsColl = mutationCollection(doc.ref);

    const lastMutation = await mutationsColl
      .orderBy("date", "desc")
      .limit(1)
      .get();

    lastMutation.forEach((mutationDoc) => {
      const data = mutationDoc.data() as Mutation;

      console.log(`Updating savings for: ${(doc.data() as Savings).customer}`);
      doc.ref.update({
        total: data.totalAfter,
        withdrawable: data.withdrawableAfter,
      } as Partial<Savings>);
    });

    // Gonna be used when editing mutation that's placed in the middle of the list
    // (Also gonna be used for app wide aggregation)
    // because the changes cascades to the upper (newer) mutation
    // For now we can use the latest mutation

    // const inCashAggregate = mutationsColl.aggregate({
    //   currentBalance: AggregateField.sum("amount"),
    // });
    // const lifetimeAggregate = mutationsColl
    //   .where("type", "==", "deposit")
    //   .aggregate({
    //     lifetimeBalance: AggregateField.sum("amount"),
    //   });

    // const inCashSnapshot = await transaction.get(inCashAggregate);
    // const lifetimeSnapshot = await transaction.get(lifetimeAggregate);
  });
};
