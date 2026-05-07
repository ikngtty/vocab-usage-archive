import { doc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

export function getDocRefOfVocab(db, userId, word) {
  return doc(db, "users", userId, "vocabs", word);
}
