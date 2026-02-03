const form = document.getElementById("registrationForm");
const popup = document.getElementById("popup");
const strength = document.getElementById("strength");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const phone = document.getElementById("phone");
  const terms = document.getElementById("terms");
  const gender = document.querySelector('input[name="gender"]:checked');

  const inputs = [name, email, password, confirmPassword, phone];

  // Clear previous errors
  inputs.forEach(input => {
    input.classList.remove("error");
    input.nextElementSibling.textContent = "";
  });

  // Name
  if (name.value.trim() === "") {
    showError(name, "Name is required");
    valid = false;
  }

  // Email
  if (!email.value.includes("@") || !email.value.includes(".")) {
    showError(email, "Enter valid email");
    valid = false;
  }

  // Password rules
  if (password.value.length < 8) {
    showError(password, "Minimum 8 characters required");
    valid = false;
  }

  let hasNumber = false;
  let hasSpecial = false;

  for (let i = 0; i < password.value.length; i++) {
    if (!isNaN(password.value[i])) hasNumber = true;
    if ("!@#$%^&*".includes(password.value[i])) hasSpecial = true;
  }

  if (!hasNumber || !hasSpecial) {
    showError(password, "Include number & special character");
    valid = false;
  }

  // Confirm password
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    valid = false;
  }

  // Phone
  if (phone.value.length !== 10 || isNaN(phone.value)) {
    showError(phone, "Phone must be 10 digits");
    valid = false;
  }

  // Gender
  if (!gender) {
    alert("Please select gender");
    valid = false;
  }

  // Terms
  if (!terms.checked) {
    alert("Accept Terms & Conditions");
    valid = false;
  }

  // Success
  if (valid) {
    popup.classList.add("show");
    form.reset();
    strength.textContent = "";
    strength.className = "";
  }
});

// Password strength meter
password.addEventListener("input", function () {
  strength.className = "";

  if (this.value.length < 8) {
    strength.textContent = "Weak password";
    strength.classList.add("weak");
  } else if (
    /[0-9]/.test(this.value) &&
    /[!@#$%^&*]/.test(this.value)
  ) {
    strength.textContent = "Strong password";
    strength.classList.add("strong");
  } else {
    strength.textContent = "Medium password";
    strength.classList.add("medium");
  }
});

function showError(input, message) {
  input.classList.add("error");
  input.nextElementSibling.textContent = message;
}

function closePopup() {
  popup.classList.remove("show");
}
