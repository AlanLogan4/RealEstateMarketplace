function handleSearch() {
  const query = document.getElementById("searchInput").value;
  alert("Searching for: " + query); // Replace with real search logic
}

// domain.js
import { fetchCurrentUser } from "./service.js";

/**
 * Returns a URL string based on user.accountType
 */
export async function resolveAccountPage() {
  try {
    const user = await fetchCurrentUser();
    switch (user.accountType) {
      case "seller":
        return "/SellerAccount.html";
      case "buyer":
        return "/BuyerAccount.html";
      // add more cases if you have admins, guests, etc.
      default:
        return "/login.html";
    }
  } catch (err) {
    return "/login.html";
  }
}
