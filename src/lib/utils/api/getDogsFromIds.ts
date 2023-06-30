import { Dog } from "@/lib/xstate/machines/DogSearchMachine";

const getDogsFromIds = async (ids: string[]): Promise<Dog[]> => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch dogs: ${response.status}`);
  }
};

export default getDogsFromIds;
