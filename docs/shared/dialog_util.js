let initAlertPromise;
function initAlert() {
  const htmlUrl = new URL("./dialog-util/alert.partial.html", import.meta.url);
  // NOTE: Fetching is asynchronous but caching is synchronous for thread safety.
  initAlertPromise ??= fetch(htmlUrl)
    .then((res) => res.text())
    .then((html) => document.body.insertAdjacentHTML("beforeend", html));
  return initAlertPromise;
}

export async function customAlert(message) {
  await initAlert();

  const messageElement = document.getElementById("dialogAlertMessage");
  messageElement.textContent = message;

  const dialog = document.getElementById("dialogAlert");
  dialog.showModal();
  return new Promise((resolve) =>
    dialog.addEventListener("close", (_e) => resolve(), { once: true }),
  );
}

let initConfirmPromise;
function initConfirm() {
  const htmlUrl = new URL(
    "./dialog-util/confirm.partial.html",
    import.meta.url,
  );
  // NOTE: Fetching is asynchronous but caching is synchronous for thread safety.
  initConfirmPromise ??= fetch(htmlUrl)
    .then((res) => res.text())
    .then((html) => document.body.insertAdjacentHTML("beforeend", html));
  return initConfirmPromise;
}

export async function customConfirm(message) {
  await initConfirm();

  const messageElement = document.getElementById("dialogConfirmMessage");
  messageElement.textContent = message;

  const dialog = document.getElementById("dialogConfirm");
  dialog.showModal();
  return new Promise((resolve) =>
    dialog.addEventListener(
      "close",
      (e) => resolve(e.target.returnValue === "ok"),
      { once: true },
    ),
  );
}
