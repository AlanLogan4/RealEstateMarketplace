import { LoadHouses, GetHouses } from "./domain.js";

let selectedTab = "all";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
searchInput.addEventListener("input", applyFilters);
searchButton.addEventListener("click", applyFilters);

async function main() {
  await LoadHouses();
  const houses = GetHouses();

  const grid = document.querySelector(".property-grid");
  grid.replaceChildren();
  houses.forEach((house) => grid.appendChild(BuildCard(house)));

  wireTabs();
  wireSearch();
  applyFilters();
}

function BuildCard(house) {
  const card = document.createElement("div");
  card.className = "property-card";
  card.dataset.type = house.isHouse == 1 ? "rent" : "sell";
  card.dataset.name = house.houseName.toLowerCase();

  const img = document.createElement("img");
  img.src = house.HouseImage;
  img.alt = house.houseName;

  const overlay = document.createElement("div");
  overlay.className = "property-overlay";
  overlay.innerHTML = `
    <h3>${house.houseName}</h3>
    <p class="location">📍 ${house.houseLocation}</p>
    <p class="price">${house.housePrice}</p>
  `;

  card.append(img, overlay);
  return card;
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".property-card").forEach((card) => {
    const typeOk = selectedTab === "all" || card.dataset.type === selectedTab;
    const searchOk = !q || card.dataset.name.includes(q);
    card.style.display = typeOk && searchOk ? "block" : "none";
  });
}

function debounce(fn, ms = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

const debouncedFilter = debounce(applyFilters, 150);
searchInput.addEventListener("input", debouncedFilter);

function wireTabs() {
  document.querySelectorAll(".toggle-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedTab = btn.dataset.mode;
      document
        .querySelectorAll(".toggle-option")
        .forEach((b) => b.classList.toggle("active", b === btn));
      applyFilters();
    });
  });
}

function wireSearch() {
  searchInput.addEventListener("input", applyFilters);
  searchButton.addEventListener("click", applyFilters);
}

document.addEventListener("DOMContentLoaded", main);
