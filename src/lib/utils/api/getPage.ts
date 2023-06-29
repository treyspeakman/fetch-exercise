import { DogPage } from "@/lib/xstate/machines/DogSearchMachine";

export const getNextPage = async (
  dogPage: DogPage,
  pageSize: number
): Promise<DogPage> => {
  let url = `https://frontend-take-home-service.fetch.com` + dogPage.next;
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

export const getPreviousPage = async (
  dogPage: DogPage,
  pageSize: number
): Promise<DogPage> => {
  let url = `https://frontend-take-home-service.fetch.com` + dogPage.prev;
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
