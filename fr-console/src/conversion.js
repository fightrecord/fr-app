export const asFeetAndInches = metres => {
  const cm = metres * 100.0;
  const inches = cm / 2.54;
  const feet = Math.floor(inches / 12.0);
  const remains = Math.floor(inches % 12);

  return `${feet}'${remains}"`;
};