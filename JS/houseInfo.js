


function main()
{
    const house = GetHouseInfo()

    BuildHouseCard()

    

}

function BuildHouseCard(house) {
    // Create main section
    const section = document.querySelector(".house-detail")
    section.classList.add("house-detail");
  
    // Create house-image div
    const houseImageDiv = document.createElement("div");
    houseImageDiv.classList.add("house-image");
  
    const img = document.createElement("img");
    img.src = house.image; // <--- dynamic image
    img.alt = "House";
    img.style.width = "100%";
    img.style.borderRadius = "10px";
    img.style.objectFit = "cover";
  
    houseImageDiv.appendChild(img);
  
    // Create house-info div
    const houseInfoDiv = document.createElement("div");
    houseInfoDiv.classList.add("house-info");
    houseInfoDiv.style.flex = "1";
  
    const h2 = document.createElement("h2");
    h2.textContent = house.name; // <--- dynamic house name
    houseInfoDiv.appendChild(h2);
  
    // Realtor
    const realtorP = document.createElement("p");
    realtorP.innerHTML = `<strong>Realtor:</strong> ${house.realtor}`;
    houseInfoDiv.appendChild(realtorP);
  
    // Location
    const locationP = document.createElement("p");
    locationP.innerHTML = `<strong>Location:</strong> ${house.location}`;
    houseInfoDiv.appendChild(locationP);
  
    // Description
    const descriptionP = document.createElement("p");
    descriptionP.innerHTML = `<strong>Description:</strong> ${house.description}`;
    houseInfoDiv.appendChild(descriptionP);
  
    // Price
    const priceP = document.createElement("p");
    priceP.style.fontWeight = "bold";
    priceP.style.marginTop = "20px";
    priceP.innerHTML = `<strong>Price:</strong> $${house.price.toLocaleString()}`;
    houseInfoDiv.appendChild(priceP);
  
    // Assemble everything
    section.appendChild(houseImageDiv);
    section.appendChild(houseInfoDiv);
  
  }
  
      




function GetHouseInfo()
{

}