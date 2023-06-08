const usernameSignUpEl = document.getElementById("username--signup");
const passwordSignUpEl = document.getElementById("password--signup");
const confirmPassEl = document.getElementById("passwordConfirm");
const emailSignUpEl = document.getElementById("email--signup");
const formSignUpEl = document.getElementById("form--signup");
const btnSignUpEl = document.querySelector(".btn--signup");

const btnLoginEl = document.querySelector(".btn--login");
const emailLoginEl = document.getElementById("email--login");
const passwordLoginEl = document.getElementById("password--login");

// DUMMY DATA
const user1 = {
  email: "vt.huy0000@gmail.com",
  password: "vthuy0000",
};

const user2 = {
  email: "tn.hieu123@gmail.com",
  password: "tnhieu123",
};

const user3 = {
  email: "nq.bao2002@gmail.com",
  password: "nqbao2002",
};

const users = [user1, user2, user3];

/*------------------------ SIGN UP --------------------*/
// Field Required
const isRequired = (value) => {
  return value === "" ? true : false;
};

// Check Input Length
const isBetween = (length, min, max) => {
  return length < min || length > max ? false : true;
};

// Email Validation
const isEmail = (email) => {
  const validate = new RegExp(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  );

  return validate.test(email);
};

// Password Validation
const isPassword = (password) => {
  /*    Minimum eight ,
            at least one uppercase letter,
            one lowercase letter,
            one number and one special character:
        */
  const validate = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  return validate.test(password);
};

// Show Error
const showError = (input, message) => {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector("small");

  formGroup.classList.remove("success");
  formGroup.classList.add("error");
  error.classList.remove("small__success");
  error.classList.add("small__error");

  error.textContent = message;
};

// Show Success
const showSucces = (input, message) => {
  const formGroup = input.parentElement;
  const success = formGroup.querySelector("small");

  formGroup.classList.remove("error");
  formGroup.classList.add("success");
  success.classList.remove("small__error");
  success.classList.add("small__success");

  success.textContent = message;
};

// Debounce
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};
// Check Email Field
const checkEmail = () => {
  let valid = false;

  const email = emailSignUpEl.value.trim();

  if (isRequired(email)) {
    showError(emailSignUpEl, "Email field cannot be blanked");
  } else if (!isEmail(email)) {
    showError(emailSignUpEl, "Email must be all lowercase");
  } else {
    showSucces(emailSignUpEl, "Valid email");
    valid = true;
  }
  return valid;
};

// Check Password Field
const checkPassword = () => {
  let valid = false;
  const err = `Minimum 8 characters,
            at least one uppercase letter,
            one lowercase letter,
            one number and one special character`;

  const password = passwordSignUpEl.value.trim();

  if (isRequired(password)) {
    showError(passwordSignUpEl, "Password field cannot be blanked");
  } else if (!isPassword(password)) {
    showError(passwordSignUpEl, err);
  } else {
    showSucces(passwordSignUpEl, "Valid password");
    valid = true;
  }
  return valid;
};

// Check Password Equal Field
const checkPasswordEqual = () => {
  let valid = false;
  const err = `Password must be the same`;

  const confirmPassword = confirmPassEl.value.trim();
  const password = passwordSignUpEl.value.trim();

  if (isRequired(confirmPassword)) {
    showError(confirmPassEl, "Password confirm field cannot be blanked");
  } else if (password !== confirmPassword) {
    showError(confirmPassEl, err);
  } else {
    showSucces(confirmPassEl, "Valid confirmation");
    valid = true;
  }
  return valid;
};

// Check Username Field
const checkUsername = () => {
  let valid = false;
  const err = `Username must be the more than 4 characters`;

  const username = usernameSignUpEl.value.trim();

  if (isRequired(username)) {
    showError(usernameSignUpEl, "Username field cannot be blanked");
  } else if (username.length < 4) {
    showError(usernameSignUpEl, err);
  } else {
    showSucces(usernameSignUpEl, "Valid username");
    valid = true;
  }
  return valid;
};

// Apply the each fields debounce check

if (btnSignUpEl) {
  formSignUpEl.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "email--signup":
          checkEmail();
          break;
        case "password--signup":
          checkPassword();
          break;
        case "passwordConfirm":
          checkPasswordEqual();
          break;
        case "username--signup":
          checkUsername();
          break;
      }
    })
  );

  // Apply the submit
  btnSignUpEl.addEventListener("click", function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPasswordValid = checkPassword(),
      isConfirmPasswordValid = checkPasswordEqual();

    let isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
      alert("Will be updated with database soon");
      window.location.href = "../../index.html";
    } else {
      alert("Invalid");
    }
  });
}

/*------------------------ LOG IN --------------------*/
let currentUser;

if (btnLoginEl) {
  btnLoginEl.addEventListener("click", () => {
    currentUser = users.find((u) => {
      return emailLoginEl.value === u.email;
    });

    console.log(currentUser);

    if (
      currentUser &&
      currentUser.email === emailLoginEl.value &&
      currentUser.password === passwordLoginEl.value
    ) {
      const url = "./table.html";
      btnLoginEl.setAttribute("href", url);
    } else {
      alert("Invalid input or Account doesn't exist");
      emailLoginEl.value = passwordLoginEl.value = "";
    }
  });
}
