import { LoadHouses, GetHouses } from "./domain.js";

let selectedTab = "all";
let filterLocation = "";
let filterMinPrice = NaN;
let filterMaxPrice = NaN;
let filterTerrain = "";
let filterYearMin = NaN;
let filterYearMax = NaN;
let filterRooms = "";

async function main() {
  await LoadHouses();
  const houses = GetHouses();

  const grid = document.querySelector(".property-grid");
  grid.replaceChildren();
  houses.forEach((h) => grid.appendChild(BuildCard(h)));

  wireTabs();
  wireSearch();
  wireDropdowns();
  wireReset();

  applyFilters();
}

function BuildCard(house) {
  const card = document.createElement("div");
  card.className = "property-card";
  card.style.width = "300px";
  card.style.borderRadius = "12px";
  card.style.overflow = "hidden";
  card.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
  card.style.backgroundColor = "#fff";
  card.style.cursor = "pointer";
  card.style.transition = "transform 0.2s";
  card.addEventListener("mouseenter", () => card.style.transform = "scale(1.02)");
  card.addEventListener("mouseleave", () => card.style.transform = "scale(1)");

  card.dataset.type = house.isHouse == 1 ? "rent" : "sell";
  card.dataset.location = house.address?.toLowerCase() || "";
  card.dataset.price = house.price;
  card.dataset.terrain = house.terrain || "";
  card.dataset.year = house.year || "";
  card.dataset.rooms = house.numberOfRooms || "";
  card.dataset.name = house.houseName?.toLowerCase() || "";

  card.addEventListener("click", () => {
    localStorage.setItem("selectedHouse", JSON.stringify(house.id));
    window.location.href = "/Pages/Houseinfo.html";
  });

  const imageUrl = `http://localhost:5139/images/${house.coverImage}`;
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = house.houseName || "Property";
  img.style.width = "100%";
  img.style.height = "200px";
  img.style.objectFit = "cover";

  const info = document.createElement("div");
  info.style.padding = "15px";

  const price = document.createElement("h3");
  price.textContent = `$${house.price.toLocaleString()}`;
  price.style.margin = "0";
  price.style.color = "#0077cc";

  const address = document.createElement("p");
  address.textContent = house.address || house.houseLocation;
  address.style.color = "#555";
  address.style.margin = "5px 0 10px";

  const details = document.createElement("div");
  details.style.display = "flex";
  details.style.gap = "10px";
  details.style.fontSize = "0.95em";
  details.style.color = "#333";

  const bed = document.createElement("span");
  bed.textContent = `🏯 ${house.numberOfRooms || 0}`;

  const bath = document.createElement("span");
  bath.textContent = `🛁 ${house.numberOfBathrooms || 0}`;

  details.append(bed, bath);
  info.append(price, address, details);
  card.append(img, info);

  return card;
}

function applyFilters() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();

  document.querySelectorAll(".property-card").forEach((card) => {
    const matchTab = selectedTab === "all" || card.dataset.type === selectedTab;
    const matchSearch = !q || card.dataset.name.includes(q);
    const matchLocation = !filterLocation || card.dataset.location.includes(filterLocation);
    const priceNum = Number(card.dataset.price);
    const matchPrice =
      (isNaN(filterMinPrice) || priceNum >= filterMinPrice) &&
      (isNaN(filterMaxPrice) || priceNum <= filterMaxPrice);
    const matchTerrain = !filterTerrain || card.dataset.terrain === filterTerrain;
    const yearNum = Number(card.dataset.year);
    const matchYear =
      (isNaN(filterYearMin) || yearNum >= filterYearMin) &&
      (isNaN(filterYearMax) || yearNum <= filterYearMax);
    const matchRooms = !filterRooms || card.dataset.rooms === filterRooms;

    const visible =
      matchTab &&
      matchSearch &&
      matchLocation &&
      matchPrice &&
      matchTerrain &&
      matchYear &&
      matchRooms;

    card.style.display = visible ? "block" : "none";
  });
}

function RefreshCardRent() {
  const cards = document.querySelectorAll(".property-card");
  cards.forEach((card) => {
    card.style.display = card.dataset.type === "rent" ? "block" : "none";
  });
}

function wireTabs() {
  document.querySelectorAll(".toggle-option").forEach((btn) =>
    btn.addEventListener("click", () => {
      selectedTab = btn.dataset.mode;
      document
        .querySelectorAll(".toggle-option")
        .forEach((b) => b.classList.toggle("active", b === btn));
      applyFilters();
    })
  );
}

function wireSearch() {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchButton");
  if (!input) return console.error("No #searchInput in DOM");
  input.addEventListener("input", applyFilters);
  if (button) button.addEventListener("click", applyFilters);
}

function wireDropdowns() {
  document.querySelectorAll(".dropdown").forEach((dd) => {
    const btn = dd.querySelector(".filter-button");
    const menu = dd.querySelector(".dropdown-menu");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".dropdown.open").forEach((other) => {
        if (other !== dd) other.classList.remove("open");
      });
      dd.classList.toggle("open");
    });

    menu.querySelectorAll("p").forEach((item) =>
      item.addEventListener("click", () => {
        dd.classList.remove("open");
        btn.textContent = item.textContent + " ⌄";

        if (item.dataset.location !== undefined) {
          filterLocation = item.dataset.location.toLowerCase();
        }
        if (item.dataset.min !== undefined) {
          filterMinPrice = parseInt(item.dataset.min, 10);
          filterMaxPrice = parseInt(item.dataset.max, 10);
        }
        if (item.dataset.terrain !== undefined) {
          filterTerrain = item.dataset.terrain;
        }
        if (item.dataset.yearMin !== undefined) {
          filterYearMin = parseInt(item.dataset.yearMin, 10);
          filterYearMax = parseInt(item.dataset.yearMax, 10);
        }
        if (item.dataset.rooms !== undefined) {
          filterRooms = item.dataset.rooms;
        }

        applyFilters();
      })
    );
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown.open").forEach((dd) => dd.classList.remove("open"));
    }
  });
}

function wireReset() {
  const btn = document.getElementById("resetFilters");
  if (!btn) return;

  btn.addEventListener("click", () => {
    selectedTab = "all";
    filterLocation = "";
    filterMinPrice = NaN;
    filterMaxPrice = NaN;
    filterTerrain = "";
    filterYearMin = NaN;
    filterYearMax = NaN;
    filterRooms = "";

    document
      .querySelectorAll(".toggle-option")
      .forEach((b) => b.classList.toggle("active", b.dataset.mode === "all"));

    const si = document.getElementById("searchInput");
    if (si) si.value = "";

    document.querySelectorAll(".dropdown").forEach((dd) => {
      const button = dd.querySelector(".filter-button");
      const def = button.dataset.default;
      button.textContent = def + " ⌄";
    });

    applyFilters();
  });
}

document.addEventListener("DOMContentLoaded", main);
