import { DogPage } from "@/lib/xstate/machines/DogSearchMachine";

const getDogPages = async (breedFilters: string[] = []): Promise<DogPage> => {
  let url = "https://frontend-take-home-service.fetch.com/dogs/search";

  // Add breed filters as query parameters if the list is not empty
  if (breedFilters.length > 0) {
    const breedQuery = breedFilters.join(",");
    url += `?breeds=${encodeURIComponent(breedQuery)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch dog pages: ${response.status}`);
  }
};

export default getDogPages;
