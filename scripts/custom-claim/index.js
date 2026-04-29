import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp();

const auth = getAuth();

const command = process.argv[2];
switch (command) {
  case "show":
    {
      const email = process.argv[3];
      if (email == null) {
        throw new Error("Email is required.");
      }

      const user = await auth.getUserByEmail(email);
      console.log(user.customClaims);
    }
    break;
  case "add":
    {
      const email = process.argv[3];
      if (email == null) {
        throw new Error("Email is required.");
      }
      const claim = process.argv[4];
      if (claim == null) {
        throw new Error("Claim is required.");
      }

      const user = await auth.getUserByEmail(email);
      const claims = user.customClaims || {};
      claims[claim] = true;
      await auth.setCustomUserClaims(user.uid, claims);
      console.log(claims);
    }
    break;
  case "remove":
    {
      const email = process.argv[3];
      if (email == null) {
        throw new Error("Email is required.");
      }
      const claim = process.argv[4];
      if (claim == null) {
        throw new Error("Claim is required.");
      }

      const user = await auth.getUserByEmail(email);
      const claims = user.customClaims || {};
      delete claims[claim];
      await auth.setCustomUserClaims(user.uid, claims);
      console.log(claims);
    }
    break;
  case "delete":
    {
      const email = process.argv[3];
      if (email == null) {
        throw new Error("Email is required.");
      }

      const user = await auth.getUserByEmail(email);
      await auth.setCustomUserClaims(user.uid, null);
      console.log("Deleted.");
    }
    break;
  default:
    throw new Error("Unknown command.");
}
