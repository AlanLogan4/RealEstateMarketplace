// service.js
export async function fetchCurrentUser() {
    // Adjust this URL to your real endpoint
    const res = await fetch('/api/me', { credentials: 'include' });
    if (!res.ok) throw new Error('Not logged in');
    return res.json(); // e.g. { accountType: "seller", email: "...", phone: "..." }
  }

  