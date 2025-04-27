// app.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  

  const response = await fetch("http://localhost:5139/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Username: username, Password: password }),
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById("message").textContent =
      "Login successful!, Wellcome back " + username;
    // Redirect or store token/session if needed
  } else {
    document.getElementById("message").textContent =
      data.message || "Login failed.";
  }
  if (data.userType == "Buyer") {

    window.location.href = "/index.html";
  } else if (data.userType == "Seller") {
    window.location.href = "/Pages/SellerAccount.html";
  }
});
