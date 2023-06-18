// https://stackoverflow.com/a/32108184/1098564
export const isEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const computeRating = (nReviews, cumRating) =>
  nReviews > 0 ? cumRating / nReviews : null;

export const parseDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
