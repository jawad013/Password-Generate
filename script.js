function updateLengthLabel() {
  document.getElementById("lengthValue").textContent = document.getElementById("length").value;
}

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const useUpper = document.getElementById("includeUppercase").checked;
  const useNums = document.getElementById("includeNumbers").checked;
  const useSyms = document.getElementById("includeSymbols").checked;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]=<>?,.";

  let charset = lower;
  if (useUpper) charset += upper;
  if (useNums) charset += numbers;
  if (useSyms) charset += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById("password").value = password;
  evaluateStrength(password);
}

function evaluateStrength(password) {
  const strengthBar = document.querySelector("#strengthBar .bar-fill");
  const strengthLabel = document.getElementById("strengthLabel");
  const suggestionList = document.getElementById("suggestionList");

  let strength = 0;
  const suggestions = [];

  if (password.length >= 8) strength++;
  else suggestions.push("Use at least 8 characters");

  if (/[A-Z]/.test(password)) strength++;
  else suggestions.push("Include at least one uppercase letter");

  if (/\d/.test(password)) strength++;
  else suggestions.push("Include at least one number");

  if (/[^A-Za-z0-9]/.test(password)) strength++;
  else suggestions.push("Include special characters (e.g. @, #, $)");

  // Bar styling
  const width = strength * 25;
  let color = "#d1d5db";
  let label = "Very Weak";

  if (strength === 1) {
    color = "#f97316"; label = "Weak";
  } else if (strength === 2) {
    color = "#facc15"; label = "Medium";
  } else if (strength === 3) {
    color = "#22c55e"; label = "Strong";
  } else if (strength === 4) {
    color = "#10b981"; label = "Very Strong";
  }

  strengthBar.style.width = `${width}%`;
  strengthBar.style.backgroundColor = color;
  strengthLabel.textContent = label;

  // Suggestion logic
  suggestionList.innerHTML = "";
  if (suggestions.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Your password looks great!";
    li.style.color = "#10b981";
    suggestionList.appendChild(li);
  } else {
    suggestions.forEach(suggestion => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      suggestionList.appendChild(li);
    });
  }
}

function copyPassword() {
  const input = document.getElementById("password");
  if (!input.value) return;
  input.select();
  document.execCommand("copy");
  alert("Password copied!");
}
