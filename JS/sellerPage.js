LoadEmail();

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


