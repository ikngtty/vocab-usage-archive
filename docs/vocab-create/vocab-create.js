import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { CONFIG as FIREBASE_CONFIG } from "../shared/firebase_util.js";
import { createDocWithTs } from "../shared/firestore_util.js";
import { getDocRefOfVocab } from "../shared/repository.js";

const formVocab = document.getElementById("formVocab");
const buttonCreate = document.getElementById("buttonCreate");

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

buttonCreate.addEventListener("click", async () => {
  const [word, vocab] = getVocabFromForm();
  const vocabRef = getDocRefOfVocab(db, auth.currentUser.uid, word);
  // TODO: Check if the vocab already exists.
  await createDocWithTs(vocabRef, vocab); // TODO: Handle error.
  alert("Created!");
  // TODO: Clear the form?
});

function getVocabFromForm() {
  const word = encodeURIComponent(formVocab.word.value.trim()); // TODO: Is this valid for firestore document ID?
  const sentence = formVocab.sentence.value.trim();
  const url = formVocab.url.value.trim();

  return [word, { usages: [{ sentence, url }] }];
}
