import { Dog, DogPage } from "@/lib/xstate/machines/DogSearchMachine";

const getDogsFromPage = async (dogPage: DogPage): Promise<Dog[]> => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogPage.resultIds),
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch dogs: ${response.status}`);
  }
};

export default getDogsFromPage;
