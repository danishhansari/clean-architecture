export const compareDateTime = (dateStr1: string, dateStr2: string) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  return date1 < date2;
};
