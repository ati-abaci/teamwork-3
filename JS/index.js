function navigateTo(page) {
  if (!page || page.trim() === "") {
    alert("Invalid page specified.");
    return;
  }
  const validPages = [
    "mainpage.html",
    "signup.html",
    "signin.html",
    "leaderboard.html",
  ];
  if (!validPages.includes(page)) {
    alert("Page not found!");
    return;
  }
  window.location.href = `/pages/${page}`;
}
