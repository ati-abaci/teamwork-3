function updateUserDisplay() {
  const userInfoInput = document.getElementById("user-info");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && loggedInUser.name) {
    userInfoInput.value = `Hello, ${loggedInUser.name}!`;
  } else {
    userInfoInput.value = "Please log in to play.";
  }
}

function checkLoginStatus() {
  const isLoggedIn = !!JSON.parse(localStorage.getItem("loggedInUser"));
  const startButton = document.querySelector(".btn-primary");
  const leaderboardButton = document.querySelector(".btn-success");

  if (!isLoggedIn) {
    startButton.disabled = true;
    leaderboardButton.disabled = true;
  }
}

function startGame() {
  const difficulty = document.querySelector(".form-select").value;
  if (!difficulty) {
    alert("Please select a difficulty level.");
    return;
  }
  window.location.href = `../pages/game.html?difficulty=${difficulty}`;
}

function navigateTo(page) {
  if (page) {
    window.location.href = page;
  } else {
    alert("Page not found!");
  }
}

window.onload = () => {
  updateUserDisplay();
  checkLoginStatus();
};
