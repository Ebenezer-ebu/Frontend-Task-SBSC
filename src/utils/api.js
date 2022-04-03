import { validate } from "./helpers";

export const register = async (input) => {
  const check = validate(input);
  try {
    const fetchResponse = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!check.isValid) {
      return {
        warningEmail: check.warningEmail,
        warningPassword: check.warningPassword,
      };
    }
    const data = await fetchResponse.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const login = async (input) => {
  const check = validate(input);
  try {
    const fetchResponse = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!check.isValid) {
      return {
        warningEmail: check.warningEmail,
        warningPassword: check.warningPassword,
      };
    }
    const data = await fetchResponse.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const fetchResponse = await fetch(
      `https://reqres.in/api/users/${user.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getUsersByPage = async (page) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return err;
  }
};

export const updateUser = async (input, id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const fetchResponse = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(input),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteUser = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const fetchResponse = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await fetchResponse.json();
    return data;
  } catch (err) {
    return err;
  }
};
