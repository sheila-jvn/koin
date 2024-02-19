import type { QuerySnapshot } from "firebase-admin/firestore";

export const docsWithId = <T>(snapshot: QuerySnapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
