// buyer.js
import { LoadHouses, GetHouses } from "./domain.js";

const JSON_PATH = "../json/houses.json";
let allListings = [];
let currentMode = "all"; // 'all' | 'rent' | 'sell'
let locationTerm = ""; // text filter for location
let maxPrice = NaN;
let searchTerm = ""; // numeric filter for price

async function init() {
  try {
    const res = await fetch(JSON_PATH);
    if (!res.ok) throw new Error(`Failed to load ${JSON_PATH}`);
    allListings = await res.json();

    // wireToggles(); // All/Rent/Sell
    // wireSearch(); // Couple/Single/Family
    // wireLocation(); // locationInput
    // wirePrice(); // priceInput
    LoadProfileInfo();

    await LoadHouses();
    const houses = GetHouses();
    const user = JSON.parse(localStorage.getItem("token"));
    const currentUserId = user?.id;
    const grid = document.querySelector(".property-grid");
    grid.replaceChildren();

    houses
      .filter((h) => h.realtorID === currentUserId)
      .forEach((h) => grid.appendChild(BuildCard(h)));

    //render(); // initial display
  } catch (e) {
    console.error(e);
    document.querySelector(".property-grid").textContent =
      "Unable to load listings.";
  }
}

function render() {
  let filtered = allListings
    // 1) filter by mode
    .filter((item) => {
      if (currentMode === "rent") return Number(item.isHouse) === 1;
      if (currentMode === "sell") return Number(item.isHouse) === 0;
      return true; // 'all'
    })
    // 2) filter by location term
    .filter((item) => {
      if (!locationTerm) return true;
      return item.houseLocation
        .toLowerCase()
        .includes(locationTerm.toLowerCase());
    })
    // 3) filter by maxPrice
    .filter((item) => {
      if (isNaN(maxPrice)) return true;
      // strip non-digits, parse number
      const priceNum = parseInt(item.housePrice.replace(/[^0-9]/g, ""), 10);
      return priceNum <= maxPrice;
    });

  // 4) filter by search term
  if (searchTerm.trim()) {
    const term = searchTerm.trim().toLowerCase();
    filtered = filtered.filter((item) =>
      item.houseName.toLowerCase().includes(term)
    );
  }

  // update heading
  const titles = { all: "YOUR HOMES", rent: "RENTALS", sell: "FOR SALE" };
  document.querySelector(".homes-title").textContent = titles[currentMode];

  // render cards
  document.querySelector(".property-grid").innerHTML =
    filtered
      .map((item) => {
        const img = encodeURI(item.HouseImage);
        return `
      <div class="property-card">
        <img src="${img}" alt="${item.houseName}" />
        <div class="property-overlay">
          <h3>${item.houseName}</h3>
          <p class="location">${item.houseLocation}</p>
          <p class="price">${item.housePrice}</p>
        </div>
      </div>`;
      })
      .join("") || '<p style="text-align:center;">No results found.</p>';
}

function wireToggles() {
  document.querySelectorAll(".toggle-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMode = btn.dataset.mode;
      document
        .querySelectorAll(".toggle-option")
        .forEach((b) => b.classList.toggle("active", b === btn));
      render();
    });
  });
}

function wireSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    render(); // re‐render on every keystroke
  });
}

function wireLocation() {
  document.getElementById("locationInput").addEventListener("input", (e) => {
    locationTerm = e.target.value;
    render();
  });
}

function wirePrice() {
  document.getElementById("priceInput").addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    maxPrice = isNaN(val) ? NaN : val;
    render();
  });
}

document.addEventListener("DOMContentLoaded", init);

//build property card
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
  card.addEventListener(
    "mouseenter",
    () => (card.style.transform = "scale(1.02)")
  );
  card.addEventListener(
    "mouseleave",
    () => (card.style.transform = "scale(1)")
  );

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
  bed.textContent = `🛏️ ${house.numberOfRooms || 0}`;

  const bath = document.createElement("span");
  bath.textContent = `🛁 ${house.numberOfBathrooms || 0}`;

  details.append(bed, bath);
  info.append(price, address, details);
  card.append(img, info);

  return card;
}


document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token"); // Remove token from local storage
  window.location.href = "/Pages/logIn.html"; // Redirect to login page
});

function LoadProfileInfo() {
  const email = document.getElementById("userEmail");
  const username = document.getElementById("userName");
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(token);
  console.log(currentUser.username);
  email.textContent = currentUser.email;
  username.textContent = currentUser.username;
}