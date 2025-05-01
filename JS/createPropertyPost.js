const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const previewContainer = document.getElementById("preview");

let selectedFiles = [];

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.border = "2px dashed #007bff";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.border = "2px dashed #ccc";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.border = "2px dashed #ccc";
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener("change", () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  Array.from(files).forEach((file) => {
    selectedFiles.push(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.margin = "10px";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "150px";
      img.style.borderRadius = "8px";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "✖";
      removeBtn.style.position = "absolute";
      removeBtn.style.top = "0px";
      removeBtn.style.right = "5px";
      removeBtn.style.background = "rgba(0,0,0,0.6)";
      removeBtn.style.color = "white";
      removeBtn.style.border = "none";
      removeBtn.style.borderRadius = "50%";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.width = "50px";
      removeBtn.style.margin = "0px";
      removeBtn.onclick = () => {
        selectedFiles = selectedFiles.filter((f) => f !== file);
        wrapper.remove();
      };

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      previewContainer.appendChild(wrapper);
    };

    reader.readAsDataURL(file);
  });

  fileInput.value = ""; // allow re-selection of same files
}


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
  if (selectedFiles.length > 3) {
    alert("You can only upload up to 3 additional images.");
    return;
  }
  else if(selectedFiles.length < 1) {
    alert("You must upload at least 1 additional image.");
    return;
  }
  for (const file of selectedFiles) {
    formData.append("images", file);
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
