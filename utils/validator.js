module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  // * username
  if (username.trim() == "") {
    errors.username = "Username must not be empty";
  }

  // * email
  if (email.trim() == "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  // * password
  if (!password) {
    errors.password = "Password must not be empty";
  } else {
    if (password.length < 5 || password.length > 9) {
      errors.password = "Password must be 6 to 9";
    }
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password must not be empty";
  }
  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Password must be match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// ! Login user
module.exports.loginValidation = (username, password) => {
  const errors = {};
  if (username.trim() == "") {
    errors.username = "Username must be";
  }
  if (!password) {
    errors.password = "password must be";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
