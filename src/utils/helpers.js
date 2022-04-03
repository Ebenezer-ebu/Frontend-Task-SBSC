
export const validate = (input) => {
  let isValid = false;
  let warningEmail = { status: false, message: "" };
  let warningPassword = { status: false, message: "" };
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordformat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (input.email === "" || !input.email.match(mailformat)) {
    warningEmail.status = true;
    warningEmail.message = "Invalid Email Address";
  }
  if (input.password === "" || !input.password.match(passwordformat)) {
    warningPassword.status = true;
    warningPassword.message =
      "minimum password length (8); a mixture of alphanumeric and a special character";
  }
  if (!warningEmail.status && !warningPassword.status) {
    isValid = true;
  }
  return {
    isValid,
    warningEmail,
    warningPassword,
  };
};

export const getLocation = () => {
  const result = { status: null, lat: null, lng: null };
  if (!navigator.geolocation) {
    result.status = "Geolocation is not supported by your browser";
  } else {
    result.status = "Locating...";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        result.status = null;
        result.lat = position.coords.latitude;
        result.lng = position.coords.longitude;
        if (result.lat && result.lng) return result;
      },
      () => {
        result.status = "Unable to retrieve your location";
        return result;
      }
    );
    return result;
  }
};

