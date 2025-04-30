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
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  // Create property object from form fields
  const property = {
    address: document.getElementById("propertyAddress").value,
    price: parseFloat(document.getElementById("propertyPrice").value),
    // Add other fields as needed
  };

  // Append property JSON
  formData.append("propertyJson", JSON.stringify(property));


  // Append selected files
  const fileInput = document.getElementById("file-input"); // your file input id
  for (const file of fileInput.files) {
    console.log(file.name);
    formData.append("images", file); // "images" must match your C# parameter name
  }
  console.log("FormData:", formData);
  // Send it
  fetch("http://localhost:5139/api/properties/add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Property submitted successfully!");
      console.log(data);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});
