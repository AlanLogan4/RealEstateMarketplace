const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const preview = document.getElementById("preview");

dropZone.addEventListener("click", () => fileInput.click());

["dragenter", "dragover"].forEach((event) =>
  dropZone.addEventListener(event, (e) => {
    e.preventDefault();
    dropZone.classList.add("hover");
  })
);

["dragleave", "drop"].forEach((event) =>
  dropZone.addEventListener(event, (e) => {
    e.preventDefault();
    dropZone.classList.remove("hover");
  })
);

dropZone.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener("change", () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  [...files].forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

const coverImageInput = document.getElementById("coverImage");
const coverPreview = document.getElementById("coverPreview");

coverImageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      coverPreview.src = e.target.result;
      coverPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    coverPreview.style.display = "none";
    coverPreview.src = "";
  }
});

// Form submission
document.getElementById("propertyPost").addEventListener("submit", async function (e) {
  e.preventDefault();


  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(token);
  const formData = new FormData();

  // Collect all property data
  const property = {
    Price: parseFloat(document.getElementById("propertyPrice").value),
    Address: document.getElementById("propertyAddress").value,
    Year: parseInt(document.getElementById("year").value),
    RealtorID: currentUser.id,
    NumberOfRooms: parseInt(document.getElementById("numRooms").value),
    NumberOfBathrooms: parseInt(document.getElementById("numBaths").value),
    Description: document.getElementById("description").value,
    PropertySize: parseInt(document.getElementById("propertyTerrain").value),
    PropertyType: document.querySelector("input[name='typeOfProperty']:checked").value,
    PropertyImages: [] // server will fill this
  };

  // Add the cover image
  const coverImage = document.getElementById("coverImage").files[0];
  if (coverImage) {
    formData.append("coverImage", coverImage);
  }

  // Add other dropped images
  const additionalImages = document.getElementById("file-input").files;
  for (const file of additionalImages) {
    formData.append("images", file); // append each image as 'images'
  }

  // Add the full property object as JSON string
  formData.append("propertyJson", JSON.stringify(property));

  // 🔥 Send it to the API
  try {
    const response = await fetch("http://localhost:5139/api/properties/add", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert("Property added successfully!");
      console.log(result);
      // Optionally redirect or reset form
    } else {
      alert(result.message || "Failed to add property.");
    }
  } catch (err) {
    console.error("Error submitting property:", err);
    alert("Server error.");
  }
});
