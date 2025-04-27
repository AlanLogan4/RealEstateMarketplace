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

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default form submission

  const form = e.target;
  const formData = new FormData(form);

  fetch("/your-api-endpoint", {
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
