const valiDatePhones = (mobNumber) => {
  const mobNumArr = mobNumber.split("");

  if (mobNumber.length !== 10) return false;
  else if (mobNumArr.some((num) => isNaN(num))) return false;

  return true;
};
export default valiDatePhones;
