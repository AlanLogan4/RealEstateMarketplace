import { LoadHouses, GetHouses } from "./domain.js";

let selectedTab = "all"; // 'all' | 'rent' | 'sell'
let filterLocation = ""; // e.g. "ca", "il"
let filterMinPrice = NaN;
let filterMaxPrice = NaN;
let filterTerrain = ""; // e.g. "small", "medium", "large"
let filterYearMin = NaN;
let filterYearMax = NaN;
let filterRooms = ""; // e.g. "1", "2", "3+"

async function main() {
  await LoadHouses();
  const houses = GetHouses();

  // build all cards
  const grid = document.querySelector(".property-grid");
  grid.replaceChildren();
  houses.forEach((h) => grid.appendChild(BuildCard(h)));

  // wire up all the UI
  wireTabs();
  wireSearch();
  wireDropdowns();
  wireReset();

  // initial filter pass
  applyFilters();
}

function BuildCard(house) {
  const card = document.createElement("div");
  card.className = "property-card";

  // DATA ATTRIBUTES for filtering
  card.dataset.type = house.isHouse == 1 ? "rent" : "sell";
  card.dataset.name = house.houseName.toLowerCase();
  card.dataset.location = house.houseLocation.toLowerCase();
  // parse price into a number
  card.dataset.price = parseInt(house.housePrice.replace(/[^0-9]/g, ""), 10);
  // (If you add terrain/year/rooms fields to your JSON, set them here:)
  // card.dataset.terrain = house.terrainSize;
  // card.dataset.year    = house.yearBuilt;
  // card.dataset.rooms   = house.roomCount;

  // IMAGE
  const img = document.createElement("img");
  img.src = house.HouseImage;
  img.alt = house.houseName;

  // OVERLAY
  const overlay = document.createElement("div");
  overlay.className = "property-overlay";
  overlay.innerHTML = `
    <h3>${house.houseName}</h3>
    <p class="location">📌${house.houseLocation}</p>
    <p class="price">$${house.housePrice}</p>
  `;

  card.append(img, overlay);
  return card;
}

function applyFilters() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();

  document.querySelectorAll(".property-card").forEach((card) => {
    const matchTab = selectedTab === "all" || card.dataset.type === selectedTab;
    const matchSearch = !q || card.dataset.name.includes(q);
    const matchLocation =
      !filterLocation || card.dataset.location.includes(filterLocation);

    const priceNum = Number(card.dataset.price);
    const matchPrice =
      (isNaN(filterMinPrice) || priceNum >= filterMinPrice) &&
      (isNaN(filterMaxPrice) || priceNum <= filterMaxPrice);

    const matchTerrain =
      !filterTerrain || card.dataset.terrain === filterTerrain;
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
    const cardDiv = document.createElement("div");

    cardDiv.className = "property-card";

    cardDiv.addEventListener("click", ()=> {

      window.location.assign("Houseinfo.html");


    })

    if (house.isHouse == 0)
    {
      cardDiv.setAttribute("data-type", "rent");
    }
  
    const imgHouse = document.createElement("img");
    imgHouse.src = house.HouseImage; // example: "images/modern_home.jpg"
    imgHouse.alt = "House";
  
    const propertyInfo = document.createElement("div");
    propertyInfo.className = "property-info";
  
    const title = document.createElement("h3");
    title.textContent = house.houseName;
  
    const location = document.createElement("p");
    location.textContent = `📍 ${house.houseLocation}`;
  
    const divider = document.createElement("div");
    divider.className = "divider";
  
    const price = document.createElement("p");
    price.className = "price";
    price.textContent = house.housePrice;
  
    const bookmark = document.createElement("span");
    bookmark.className = "favorite";
    bookmark.textContent = "❤️";
  
    // Assemble structure
    propertyInfo.appendChild(title);
    propertyInfo.appendChild(location);
    propertyInfo.appendChild(divider);
    propertyInfo.appendChild(price);
    propertyInfo.appendChild(bookmark);
  
    cardDiv.appendChild(imgHouse);
    cardDiv.appendChild(propertyInfo);
  
    return cardDiv;
  }


// Refresh Cards
function RefreshCardRent()
{
    const cards = document.querySelectorAll(".property-card")

    cards.forEach((card) =>{
      if(card.dataset.type == "rent")
      {
        card.style.display = "block";
        console.log("this card has rental")
      }
      else {
        card.style.display = "none";
      }
      


    })
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

    // open/close menu
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(".dropdown.open")
        .forEach((other) => other !== dd && other.classList.remove("open"));
      dd.classList.toggle("open");
    });

    // handle selection
    menu.querySelectorAll("p").forEach((item) =>
      item.addEventListener("click", (e) => {
        dd.classList.remove("open");
        btn.textContent = item.textContent + " ⌄";

        // Location filter
        if (item.dataset.location !== undefined) {
          filterLocation = item.dataset.location.toLowerCase();
        }
        // Price Range filter
        if (item.dataset.min !== undefined) {
          filterMinPrice = parseInt(item.dataset.min, 10);
          filterMaxPrice = parseInt(item.dataset.max, 10);
        }
        // Terrain Size filter
        if (item.dataset.terrain !== undefined) {
          filterTerrain = item.dataset.terrain;
        }
        // Year Range filter
        if (item.dataset.yearMin !== undefined) {
          filterYearMin = parseInt(item.dataset.yearMin, 10);
          filterYearMax = parseInt(item.dataset.yearMax, 10);
        }
        // Room Count filter
        if (item.dataset.rooms !== undefined) {
          filterRooms = item.dataset.rooms;
        }

        applyFilters();
      })
    );
  });

  // close any open dropdown if clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document
        .querySelectorAll(".dropdown.open")
        .forEach((dd) => dd.classList.remove("open"));
    }
  });
}

function wireReset() {
  const btn = document.getElementById("resetFilters");
  if (!btn) return;

  btn.addEventListener("click", () => {
    // 1) Reset all state variables
    selectedTab = "all";
    filterLocation = "";
    filterMinPrice = NaN;
    filterMaxPrice = NaN;
    filterTerrain = "";
    filterYearMin = NaN;
    filterYearMax = NaN;
    filterRooms = "";

    // 2) Reset the tab UI
    document
      .querySelectorAll(".toggle-option")
      .forEach((b) => b.classList.toggle("active", b.dataset.mode === "all"));

    // 3) Clear the search box
    const si = document.getElementById("searchInput");
    if (si) si.value = "";

    // 4) Reset each dropdown’s label to its data-default
    document.querySelectorAll(".dropdown").forEach((dd) => {
      const button = dd.querySelector(".filter-button");
      const def = button.dataset.default;
      button.textContent = def + " ⌄";
    });

    // 5) Re‐apply filters
    applyFilters();
  });
}

// kick it off
document.addEventListener("DOMContentLoaded", main);
