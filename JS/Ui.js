import { LoadHouses, GetHouses } from '../JS/domain.js';

async function main() {
  console.log("start testing");
  await LoadHouses()
  const houses = GetHouses()

  const propertyGrid = document.querySelector(".property-grid");
  propertyGrid.replaceChildren();

  console.log("before foreach")
  houses.forEach((house) => {
    const card = BuildCard(house);
    propertyGrid.appendChild(card);

    console.log(house)
  });

}


// Build Card
  
function BuildCard(house) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "property-card";
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

function RefreshCardBuy()
{
    const cards = document.querySelectorAll(".property-card")

    cards.forEach((card) =>{
        card.style.display = "block";
    })
}


// Event for Filters
const locationButton = document.querySelector(".Location");
locationButton.addEventListener("click", () => {
  console.log("Location clicked");
});

const priceRangeButton = document.querySelector(".PriceRange");
priceRangeButton.addEventListener("click", () => {
  console.log("Price Range clicked");
});

const terrainSizeButton = document.querySelector(".TerrainSize");
terrainSizeButton.addEventListener("click", () => {
  console.log("Terrain Size clicked");
});

const yearRangeButton = document.querySelector(".YearRange");
yearRangeButton.addEventListener("click", () => {
  console.log("Year Range clicked");
});

const roomCountButton = document.querySelector(".RoomCount");
roomCountButton.addEventListener("click", () => {
  console.log("Room Count clicked");
});

// Switch tabs Events
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");
    if (tab.textContent == "Rent")
    {
      RefreshCardRent()
    }
    else if (tab.textContent == "Buy")
    {
      RefreshCardBuy()
    }
    console.log(`${tab.textContent} tab selected`);
  });
});

//filter Search Button Event
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchButton");

searchBtn.addEventListener("click", ()=>{
    const query = searchInput.value.trim().toLowerCase();
    console.log("Look up:", query);
})


main();
