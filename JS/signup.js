document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((u) => u.email === email)) {
    alert("Email already exists. Please use a different email.");
    return;
  }

  users.push({ name, email, password, score: 0 });

  localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));

  alert("Sign up successful!");

  window.location.href = "../pages/mainpage.html";
});
