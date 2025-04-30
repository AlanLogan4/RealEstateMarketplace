
fetch("http://localhost:5139/api/properties")
  .then((res) => res.json())
  .then((properties) => {
    properties.forEach((property) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${property.address}</h3>
        <p>Price: $${property.price}</p>
        <div class="property-images">
          ${property.imageFileNames
            .map(
              (fileName) =>
                `<img src="http://localhost:5139/images/${fileName}" width="200">`
            )
            .join("")}
        </div>
        <hr/>
      `;

      document.getElementById("propertyList").appendChild(div);
    });
  })
  .catch((err) => console.error("Failed to load properties:", err));