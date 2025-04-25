// main.js
import { resolveAccountPage } from "./domain.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("accountButton");
  btn.addEventListener("click", async () => {
    const target = await resolveAccountPage();
    window.location.href = target;
  });
});
