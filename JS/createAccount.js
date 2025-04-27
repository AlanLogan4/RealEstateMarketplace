const storedData = localStorage.getItem("token");
if (storedData) {
  const currentUser = JSON.parse(storedData);
  console.log(currentUser.user.role);

  if (currentUser.user.role === "buyer") {
    window.location.href = "/Pages/BuyerAccount.html";
  } else if (currentUser.user.role === "seller") {
    window.location.href = "/Pages/SellerAccount.html";
  }
} 

else {
  document
    .getElementById("createAccountForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("newUsername").value;
      const email = document.getElementById("newEmail").value;
      const password = document.getElementById("newPassword").value;
      const confirmPassword =
        document.getElementById("confirmNewPassword").value;
      const userType = document.querySelector(
        "input[name='userType']:checked"
      ).id;
      const errorMsg = document.getElementById("message");

      console.log("User Type:", userType);

      if (password !== confirmPassword) {
        errorMsg.style.display = "block";
        return; // Stop form submission
      } else {
        errorMsg.style.display = "none";
      }

      const response = await fetch("http://localhost:5139/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Role: userType,
          Password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        errorMsg.textContent = "Account Created Successful!";
        console.log(userType);
        localStorage.setItem("token", JSON.stringify(data)); // Store token in local storage
        // Store token in local storage

        if (userType === "buyer") {
          window.location.href = "/Pages/BuyerAccount.html";
        } else if (userType === "seller") {
          window.location.href = "/Pages/SellerAccount.html";
        }
      } else {
        errorMsg.textContent = "Login failed.";
        errorMsg.style.display = "block";
      }

      // .then((res) => res.json())
      // .then((data) => {
      //   alert("Account created successfully!");
      //   // Optional: redirect or clear form
      // })
      // .catch((err) => {
      //   alert("Something went wrong.");
      //   console.error(err);
      // });
    });
}
