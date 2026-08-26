import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import {
  getDocFromServer,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { CONFIG as FIREBASE_CONFIG } from "../shared/firebase_util.js";
import { getDocRefOfVocab } from "../shared/repository.js";

const formWord = document.getElementById("formWord");

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getFirestore(app);

formWord.addEventListener("submit", async (event) => {
  event.preventDefault();

  // TODO: Login and available check.
  const word = encodeURIComponent(formWord.word.value.trim()); // TODO: Validate.
  const vocabRef = getDocRefOfVocab(db, auth.currentUser.uid, word);
  const vocabSnap = await getDocFromServer(vocabRef); // TODO: Handle error.
  if (vocabSnap.exists()) {
    location.href = `../vocab-update?word=${word}`;
  } else {
    location.href = `../vocab-create?word=${word}`;
  }
});
