import { DogPage } from "@/lib/xstate/machines/DogSearchMachine";
import { DogSearchContext } from "@/lib/xstate/machines/DogSearchMachine";

const getDogPages = async (
  from: number,
  pageSize: number,
  breedFilters: string[] = [],
  sortBy: DogSearchContext["sortBy"],
  sortDirection: DogSearchContext["sortDirection"]
): Promise<DogPage> => {
  const params = new URLSearchParams({
    from: `${from}`,
    size: `${pageSize}`,
    sort: `${sortBy}:${sortDirection == "ASCENDING" ? "asc" : "desc"}`,
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
