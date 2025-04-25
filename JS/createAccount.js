document
  .getElementById("createAccountForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const userType = document.querySelector("input[name='userType']:checked").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMsg = document.getElementById("passwordError");

    if (password !== confirmPassword) {
      errorMsg.style.display = "block";
      return; // Stop form submission
    } else {
      errorMsg.style.display = "none";
    }

    fetch("https://your-api.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userType, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Account created successfully!");
        // Optional: redirect or clear form
      })
      .catch((err) => {
        alert("Something went wrong.");
        console.error(err);
      });
  });
