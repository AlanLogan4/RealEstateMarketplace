document
  .getElementById("createAccountForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("newUsername").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;
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

    if (response.ok) {
      errorMsg.textContent = "Account Created Successful!";
      errorMsg.style.display = "none";
      if (userType === "buyer") {
        window.location.href = "/Pages/BuyerAccount.html";
      } else if (userType === "seller") {
        window.location.href = "Pages/SellerAccount.html";
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
