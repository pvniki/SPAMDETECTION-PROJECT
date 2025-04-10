const defaultSpamWords = [
  "lottery", "win", "free", "prize", "congratulations", "click here",
  "money", "urgent", "credit card", "bitcoin", "subscribe now",
  "buy now", "offer", "guaranteed"
];

let customSpamWords = [];

window.onload = () => {
  const inputsContainer = document.getElementById("inputsContainer");
  for (let i = 0; i < 10; i++) {
    const textarea = document.createElement("textarea");
    textarea.className = "emailInput";
    textarea.placeholder = `Enter email #${i + 1}`;
    inputsContainer.appendChild(textarea);
  }
};

function predictSpam() {
  showLoader();

  setTimeout(() => {
    const inputs = document.querySelectorAll(".emailInput");
    const resultContainer = document.getElementById("summaryResult");
    const spamFill = document.getElementById("spamScoreFill");
    const spamPercentText = document.getElementById("spamPercentage");
    const popup = document.getElementById("popup");
    const sound = document.getElementById("spamSound");

    const allSpamWords = [...defaultSpamWords, ...customSpamWords];

    let spamCount = 0;
    let hamCount = 0;

    inputs.forEach((input) => {
      const text = input.value.toLowerCase().trim();
      if (text) {
        const isSpam = allSpamWords.some(word => text.includes(word));
        isSpam ? spamCount++ : hamCount++;
      }
    });

    const total = spamCount + hamCount;
    const spamPercent = total > 0 ? Math.round((spamCount / total) * 100) : 0;

    resultContainer.innerText = `🚨 Spam Mails: ${spamCount}\n✅ Ham Mails: ${hamCount}`;
    spamFill.style.width = `${spamPercent}%`;
    spamPercentText.innerText = `${spamPercent}%`;

    if (spamCount > 0) {
      popup.classList.add("show");
      sound.play();
      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }

    hideLoader();
  }, 1000); // Simulate processing delay
}

function resetInputs() {
  const inputs = document.querySelectorAll(".emailInput");
  inputs.forEach(input => input.value = "");
  document.getElementById("summaryResult").innerText = "";
  document.getElementById("spamScoreFill").style.width = "0%";
  document.getElementById("spamPercentage").innerText = "0%";
}

function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("loader").style.display = "none";
}

function addCustomWords() {
  const inputField = document.getElementById("customWords");
  const newWords = inputField.value.split(",").map(word => word.trim().toLowerCase()).filter(Boolean);
  customSpamWords = [...new Set([...customSpamWords, ...newWords])];
  inputField.value = "";
  displayCustomWords();
}

function displayCustomWords() {
  const display = document.getElementById("customListDisplay");
  if (customSpamWords.length > 0) {
    display.textContent = `Custom Spam Words: ${customSpamWords.join(", ")}`;
  } else {
    display.textContent = "";
  }
}
