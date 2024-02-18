import type { DocumentReference } from "firebase-admin/firestore";
import { adminDB } from "../firebase/admin.server";

export const savingsCollection = () => adminDB.collection("savings");

export const mutationCollection = (doc: DocumentReference) =>
  doc.collection("mutations");

export const metdataCollection = () => adminDB.collection("metadata");
export const aggregationsDoc = () => metdataCollection().doc("aggregations");
export const authDoc = () => metdataCollection().doc("auth");
