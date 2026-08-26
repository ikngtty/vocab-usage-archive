import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { CONFIG as FIREBASE_CONFIG } from "../shared/firebase_util.js";
import { createDocWithTs } from "../shared/firestore_util.js";
import { getDocRefOfVocab } from "../shared/repository.js";

const formVocab = document.getElementById("formVocab");

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

// Init.
{
  const urlParams = new URLSearchParams(location.search);
  const word = urlParams.get("word");
  if (word == null) {
    // TODO
  }
  formVocab.word.value = decodeURIComponent(word);
}

formVocab.addEventListener("submit", async (event) => {
  event.preventDefault();

  const [word, vocab] = getVocabFromForm();
  const vocabRef = getDocRefOfVocab(db, auth.currentUser.uid, word);
  // TODO: Check if the vocab already exists.
  await createDocWithTs(vocabRef, vocab); // TODO: Handle error.
  alert("Created!");
  // TODO: Clear the form?
});

function getVocabFromForm() {
  // TODO: Make this valid for firestore document ID.
  // - Less than or equal to 1500 bytes.
  // - Cannot be `.` or `..`.
  // - Cannot be `__.*__`.
  const word = encodeURIComponent(formVocab.word.value.trim());
  const sentence = formVocab.sentence.value.trim();
  const url = formVocab.url.value.trim();

  return [word, { usages: [{ sentence, url }] }];
}
