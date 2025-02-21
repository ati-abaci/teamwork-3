document.getElementById("signInForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("All fields are required.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ name: user.name, email: user.email })
  );

  alert("Sign in successful!");

  window.location.href = "../pages/mainpage.html";
});
