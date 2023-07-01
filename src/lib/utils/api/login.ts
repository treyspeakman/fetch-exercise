export interface Credentials {
  name: string;
  email: string;
}

export enum LoginError {
  Unauthorized = "Unauthorized",
  GeneralError = "GeneralError",
}

export const login = async (credentials: Credentials) => {
  try {
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
    } else if (response.status === 401) {
      throw new Error(LoginError.Unauthorized);
    } else {
      throw new Error(LoginError.GeneralError);
    }
  } catch (error) {
    throw new Error(LoginError.GeneralError);
  }
};
