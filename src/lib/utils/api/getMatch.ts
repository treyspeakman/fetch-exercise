import { DogSearchContext } from "@/lib/xstate/machines/DogSearchMachine";
import { Dog } from "@/lib/xstate/machines/DogSearchMachine";
import getDogsFromIds from "./getDogsFromIds";
const getMatch = async (
  ids: DogSearchContext["searchedDogIdsList"]
): Promise<Dog> => {
  let url = "https://frontend-take-home-service.fetch.com/dogs/match";

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids.splice(0, 101)),
  });

  if (response.ok) {
    const matchingId = await response.json();
    const matchingDog = await getDogsFromIds([matchingId.match]);
    return matchingDog[0];
  } else {
    throw new Error(`Failed to fetch dog pages: ${response.status}`);
  }
};
export default getMatch;
