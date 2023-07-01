export const logout = async () => {
  try {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      throw new Error("LOGOUT_ERROR");
    }
  } catch (error) {
    throw new Error("LOGOUT_ERROR");
  }
};
