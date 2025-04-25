document
  .getElementById("createAccountForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("newUsername").value;
    const userType = document.querySelector("input[name='userType']:checked").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;
    const errorMsg = document.getElementById("message");

    if (password !== confirmPassword) {
      errorMsg.style.display = "block";
      return; // Stop form submission
    } else {
      errorMsg.style.display = "none";
    }

    fetch("http://localhost:5139/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        Username: username, 
        Role: userType, 
        Password: password }),
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
