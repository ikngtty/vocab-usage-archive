import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { CONFIG as FIREBASE_CONFIG } from "./shared/firebase_util.js";

const spanLoginStatus = document.getElementById("span_login_status");
const buttonLogin = document.getElementById("button_login");

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, (authUser) => {
  renderForLoginStatus(authUser);
});

buttonLogin.addEventListener("click", async () => {
  try {
    const _result = await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
});

function renderForLoginStatus(authUser) {
  if (authUser) {
    spanLoginStatus.textContent = `Logged in as ${authUser.displayName} (${authUser.email})`;
  } else {
    spanLoginStatus.textContent = "Not logged in";
  }
}
