function loadLeaderboard() {
  const leaderboardTable = document.getElementById("leaderboard-table");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.sort((a, b) => (b.score || 0) - (a.score || 0));
  leaderboardTable.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.score || 0}</td>
      `;
    leaderboardTable.appendChild(row);
  });
  if (users.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML =
      '<td colspan="3" style="text-align: center;">No scores available.</td>';
    leaderboardTable.appendChild(row);
  }
}

function navigateTo(page) {
  if (page) {
    window.location.href = page;
  } else {
    alert("Page not found!");
  }
}

window.onload = loadLeaderboard;
