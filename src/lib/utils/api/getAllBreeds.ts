const getAllBreeds = async (): Promise<string[]> => {
  let url = "https://frontend-take-home-service.fetch.com/dogs/breeds";

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

export default getAllBreeds;
