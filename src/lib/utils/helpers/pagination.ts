export const calculateCurrentPage = (
  itemsPerPage: number,
  cursorPosition: number
) => {
  return Math.floor(cursorPosition / itemsPerPage) + 1;
};

export const createNumberArray = (num: number, finalPage: number) => {
  let numArray = [];
  let step = -2;
  for (let i = 0; i < 5 && num + step <= finalPage; i++) {
    numArray.push(num + step++);
  }
  return numArray;
};
