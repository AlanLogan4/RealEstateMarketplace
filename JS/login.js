// app.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5139/users/id", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    
    if (response.ok) {
      document.getElementById("message").textContent = "Login successful!";
      // Redirect or store token/session if needed
    } else {
      document.getElementById("message").textContent = data.message || "Login failed.";
    }
  });
  
  