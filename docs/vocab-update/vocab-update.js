import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import {
  getDocFromServer,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { CONFIG as FIREBASE_CONFIG } from "../shared/firebase_util.js";
import { updateDocWithTs } from "../shared/firestore_util.js";
import { getDocRefOfVocab } from "../shared/repository.js";

const formVocab = document.getElementById("formVocab");
const templateFieldsetUsage = document.getElementById("templateFieldsetUsage");
const listUsage = document.getElementById("listUsage");
const buttonAddUsage = document.getElementById("buttonAddUsage");
const buttonUpdate = document.getElementById("buttonUpdate");

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

init: {
  const urlParams = new URLSearchParams(location.search);
  const word = urlParams.get("word");
  if (word == null) {
    // TODO
  }
  formVocab.word.value = decodeURIComponent(word);

  await auth.authStateReady();
  const vocabRef = getDocRefOfVocab(db, auth.currentUser.uid, word);
  const vocabSnap = await getDocFromServer(vocabRef); // TODO: Handle error.
  if (!vocabSnap.exists()) {
    alert("The vocab does not exist.");
    // TODO
    break init;
  }
  const vocab = vocabSnap.data();
  vocab.usages.forEach((usage) => {
    const fieldset = addUsageFieldset();
    fieldset.querySelector("textarea[name='sentence']").value = usage.sentence;
    fieldset.querySelector("input[name='url']").value = usage.url;
  });
}

formVocab.addEventListener("submit", (event) => {
  event.preventDefault();
});

buttonAddUsage.addEventListener("click", () => {
  addUsageFieldset();
});

buttonUpdate.addEventListener("click", async () => {
  const [word, vocab] = getVocabFromForm();
  const vocabRef = getDocRefOfVocab(db, auth.currentUser.uid, word);
  // TODO: Check if the vocab already exists.
  await updateDocWithTs(vocabRef, vocab); // TODO: Handle error.
  alert("Updated!");
});

function addUsageFieldset() {
  const fieldset =
    templateFieldsetUsage.content.firstElementChild.cloneNode(true);
  fieldset.querySelector(".buttonRemoveUsage").addEventListener("click", () => {
    if (confirm("Remove this usage?")) {
      fieldset.remove();
    }
  });
  listUsage.appendChild(fieldset);
  return fieldset;
}

function getVocabFromForm() {
  const word = encodeURIComponent(formVocab.word.value.trim());
  const usages = [...listUsage.querySelectorAll(".fieldsetUsage")].map(
    (entry) => ({
      sentence: entry.querySelector("textarea[name='sentence']").value.trim(),
      url: entry.querySelector("input[name='url']").value.trim(),
    }),
  );

  return [word, { usages }];
}
