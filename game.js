const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
let secretCode = [];
let selectedGuess = [];
let attempts = 0;
let maxAttempts = 6;
let codeLength = 6; 

document.getElementById("difficulty").addEventListener("change", setDifficulty);
document.getElementById("submitGuess").addEventListener("click", handleGuess);
document.getElementById("restartGame").addEventListener("click", restartGame);

function setDifficulty() {
    const difficulty = document.getElementById("difficulty").value;
    if (difficulty === "easy") {
        codeLength = 6;  
    } else if (difficulty === "medium") {
        codeLength = 8;  
    } else if (difficulty === "hard") {
        codeLength = 10;  
    }
    restartGame();
}

function generateSecretCode() {
    let code = [];
    while (code.length < codeLength) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        code.push(randomColor);
    }
    return code;
}

function createColorPalette() {
    const palette = document.getElementById("colorPalette");
    palette.innerHTML = ""; // Clear existing palette
    colors.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener("click", () => selectColor(color, colorDiv));
        palette.appendChild(colorDiv);
    });
}

function selectColor(color, element) {
    if (selectedGuess.length < codeLength) {
        selectedGuess.push(color);
        element.classList.add("selected");
        updateSelectedColors();
    }
}

function updateSelectedColors() {
    const selectedContainer = document.getElementById("selectedColors");
    selectedContainer.innerHTML = "";
    selectedGuess.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = color;
        selectedContainer.appendChild(colorDiv);
    });
}

function handleGuess() {
    if (selectedGuess.length !== codeLength) {
        alert(`Please select ${codeLength} colors.`);
        return;
    }

    if (attempts >= maxAttempts) {
        document.getElementById("feedback").innerText = "Game over! Please restart.";
        return;
    }

    attempts++;

    let { blackPins, whitePins } = checkGuess(selectedGuess);

    let feedbackText = `Attempt ${attempts}: 🖤 ${blackPins} ⚪ ${whitePins}`;
    let feedbackElement = document.createElement("p");
    feedbackElement.innerHTML = feedbackText;

    // Display the colors that were selected during this attempt
    let selectedColorsDiv = document.createElement("div");
    selectedColorsDiv.classList.add("attemptColors");
    selectedGuess.forEach(color => {
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("color");
        colorDiv.style.backgroundColor = color;
        selectedColorsDiv.appendChild(colorDiv);
    });

    // Append both feedback text and selected colors
    feedbackElement.appendChild(selectedColorsDiv);
    document.getElementById("attempts").appendChild(feedbackElement);

    if (blackPins === codeLength) {
        document.getElementById("feedback").innerText = "Congratulations! You guessed the correct combination 🎉";
        document.getElementById("submitGuess").disabled = true;
    } else if (attempts >= maxAttempts) {
        document.getElementById("feedback").innerText = `Game over! The correct combination was: ${secretCode.join(", ")}`;
        document.getElementById("submitGuess").disabled = true;
    }

    selectedGuess = [];
    updateSelectedColors();
    document.querySelectorAll(".color.selected").forEach(el => el.classList.remove("selected"));
}

function checkGuess(guess) {
    let blackPins = 0;
    let whitePins = 0;
    let secretCopy = [...secretCode];

    guess.forEach((color, index) => {
        if (color === secretCopy[index]) {
            blackPins++;
            secretCopy[index] = null;
            guess[index] = null;
        }
    });

    guess.forEach((color, index) => {
        if (color && secretCopy.includes(color)) {
            whitePins++;
            secretCopy[secretCopy.indexOf(color)] = null;
        }
    });

    return { blackPins, whitePins };
}

function restartGame() {
    secretCode = generateSecretCode();
    attempts = 0;
    selectedGuess = [];
    document.getElementById("attempts").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("submitGuess").disabled = false;
    document.querySelectorAll(".color.selected").forEach(el => el.classList.remove("selected"));
    updateSelectedColors();
    createColorPalette();
}

createColorPalette();

