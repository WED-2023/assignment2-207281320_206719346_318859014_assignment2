export const YEARS = Array.from(
  { length: new Date().getFullYear() - 1939 },
  (_, i) => 1940 + i
);

export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};
