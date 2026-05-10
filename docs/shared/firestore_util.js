import {
  serverTimestamp,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

export function withCreatTimestamp(data) {
  return {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export function withUpdateTimestamp(data) {
  return {
    ...data,
    updatedAt: serverTimestamp(),
  };
}

// WARN: This function overwrites existing data, so use it when you are sure that the document is new.
export async function createDocWithTs(docRef, data) {
  await setDoc(docRef, withCreatTimestamp(data));
}

export async function updateDocWithTs(docRef, data) {
  await updateDoc(docRef, withUpdateTimestamp(data));
}
