import { DogPage } from "@/lib/xstate/machines/dogSearchMachine/DogSearchMachine";
import { DogSearchContext } from "@/lib/xstate/machines/dogSearchMachine/DogSearchMachine";

const getDogPages = async (
  from: number,
  pageSize: number,
  sortBy: DogSearchContext["sortBy"],
  sortDirection: DogSearchContext["sortDirection"],
  breedFilters: string[] = [],
  ageMin: number = 0,
  ageMax: number = 100
): Promise<DogPage> => {
  const params = new URLSearchParams({
    from: `${from}`,
    size: `${pageSize}`,
    sort: `${sortBy}:${sortDirection == "ASCENDING" ? "asc" : "desc"}`,
    ageMin: `${ageMin}`,
    ageMax: `${ageMax}`,
  });

  let url =
    "https://frontend-take-home-service.fetch.com/dogs/search?" +
    new URLSearchParams(params);

  if (breedFilters.length > 0) {
    var myArrayQry = breedFilters.join("&breeds[]=");

    url += `&breeds[]=${myArrayQry}`;
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
