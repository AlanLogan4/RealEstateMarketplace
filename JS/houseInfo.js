main();

// Swap the main image when a thumbnail is clicked
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumbnail");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    // Update main image src
    const largeSrc = thumb.getAttribute("src");
    const mainImageSrc = mainImage.getAttribute("src");
    mainImage.src = largeSrc;
    thumb.src = mainImageSrc;

    // Toggle active class
    document.querySelector(".thumbnail.active").classList.remove("active");
    thumb.classList.add("active");
  });
});

async function main() {
  // Get the current URL
  // var currentUrl = window.location.href;

  // Extract the ID from the URL using regex
  var id = localStorage.getItem("selectedHouse");
  console.log(id);
  console.log(`http://localhost:5139/api/properties/${id}`);

  // Use the ID to fetch data from the API
  const house = await GetHouseInfo(id);

  DisplayHouseInfo(house);
}

function DisplayHouseInfo(house) {
  console.log(house)
  for (let key in house) {
    const el = document.getElementById(key);
    if (el) el.textContent = house[key];
    console.log(key, house[key]);
  }

  const price = document.getElementById("price");
  // set price
  if (price) price.textContent = "PRICE: $" + house.Price;
  // Set the main image
  const mainImage = document.getElementById("mainImage");
  if (mainImage)
    mainImage.src = `http://localhost:5139/images/${house.MainImage}`;

  //Set the thumbnails
  const thumbnails = document.querySelectorAll(".thumbnail");
  if (thumbnails) {
    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].src = `http://localhost:5139/images/${house.Images[i]}`;
    }
  }

  const propertyType = document.getElementById("PropertyType");
  if (propertyType) propertyType.textContent = house.Propertytype;

  const propertySize = document.getElementById("PropertySize");
  if (propertySize) propertySize.textContent = house.PropertySize + " ft²";
  
}
async function GetHouseInfo(id) {
  // Use the ID to fetch data from the API
  const response = await fetch(`http://localhost:5139/api/properties/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers you need here
    },
  });

  const property = await response.json();

  console.log(property);
  const house = {
    Location: property.address,
    PropertySize: property.propertySize,
    NumberofRooms: property.numberOfRooms,
    year: property.year,
    NumberofBathrooms: property.numberOfBathrooms,
    Price: property.price,
    Description: property.description,
    Propertytype: property.propertyType,

    MainImage: property.coverImage,
    Price: property.price,
    Images: property.propertyImages,
    // Images: PropertyImages.map(image => image.url), // Assuming images is an array of objects with a url property
  };
  return house;

  // .catch((error) => console.error("Error fetching data:", error));
}
