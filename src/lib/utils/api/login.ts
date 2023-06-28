export interface Credentials {
  name: string;
  email: string;
}

const login = async (credentials: Credentials) => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/auth/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (response.ok) {
    return true;
  } else {
    console.error("Failed to login: ", response.status);
    return false;
  }
};

export default login;
