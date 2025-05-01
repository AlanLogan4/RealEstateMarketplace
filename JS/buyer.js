// buyer.js

const JSON_PATH = "../json/houses.json";
let allListings = [];
let currentMode = "all"; // 'all' | 'rent' | 'sell'
let locationTerm = ""; // text filter for location
let maxPrice = NaN;
let searchTerm = ""; // numeric filter for price

LoadEmail()

async function init() {
  try {
    const res = await fetch(JSON_PATH);
    if (!res.ok) throw new Error(`Failed to load ${JSON_PATH}`);
    allListings = await res.json();

    // wireToggles(); // All/Rent/Sell
    // wireSearch(); // Couple/Single/Family
    // wireLocation(); // locationInput
    // wirePrice(); // priceInput
    // wireAccount(); // accountButton

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
  const titles = { all: "YOUR HOMES", rent: "YOUR RENTALS", sell: "FOR SALE" };
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
          <p class="location">📌${item.houseLocation}</p>
          <p class="price"> $${item.housePrice}</p>
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

function wireAccount() {
  document.getElementById("accountButton").addEventListener("click", () => {
    window.location.href = "/Pages/BuyerAccount.html";
  });
}

document.addEventListener("DOMContentLoaded", init);

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token"); // Remove token from local storage
  window.location.href = "/Pages/logIn.html"; // Redirect to login page
});

function LoadEmail() {
  const email = document.getElementById("userEmail");
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(token);
  email.textContent = currentUser.email;
}