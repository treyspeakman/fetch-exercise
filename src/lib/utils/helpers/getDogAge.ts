export type DogAgeDescriptions = "Puppy" | "Young" | "Adult" | "Senior";
const dogAges: { [key: number]: DogAgeDescriptions } = {
  1: "Puppy",
  4: "Young",
  8: "Adult",
  100: "Senior",
};

const ageRangeMap: { [key in DogAgeDescriptions]: number[] } = {
  Puppy: [0, 1],
  Young: [2, 4],
  Adult: [5, 8],
  Senior: [9, 100],
};

export const getDogAge = (age: number): DogAgeDescriptions => {
  const descriptiveAge = Object.entries(dogAges).find(
    ([key]) => Number(key) >= age
  )?.[1];
  if (descriptiveAge) return descriptiveAge;
  return "Young" as DogAgeDescriptions;
};

export const getAgeRange = (description: DogAgeDescriptions) => {
  return ageRangeMap[description];
};
