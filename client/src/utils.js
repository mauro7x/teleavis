// https://stackoverflow.com/a/32108184/1098564
export const isEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const computeRating = (nReviews, cumRating) =>
  nReviews > 0 ? cumRating / nReviews : null;
