// app.js
const storedData = localStorage.getItem("token");
console.log(storedData);
console.log(storedData === null);
if (storedData || storedData !== null) {
  const currentUser = JSON.parse(storedData);

  if (currentUser.role === "buyer") {
    window.location.href = "/Pages/BuyerAccount.html";
  } else if (currentUser.role === "seller") {
    window.location.href = "/Pages/SellerAccount.html";
  } 
  else if (currentUser.user.role === "buyer") {
    window.location.href = "/Pages/BuyerAccount.html";
  } else if (currentUser.user.role === "seller") {
    window.location.href = "/Pages/SellerAccount.html";
  }
} else {
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
      console.log(data.role);
      localStorage.setItem("token", JSON.stringify(data));
       // Store token in local storage
      if (data.role === "buyer") {
        window.location.href = "/Pages/BuyerAccount.html";
      } else if (data.role === "seller") {
        window.location.href = "/Pages/SellerAccount.html";
      }
      // Redirect or store token/session if needed
    } else {
      document.getElementById("message").textContent =
        data.message || "Login failed.";
    }
  });
}
