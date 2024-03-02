const valiDateName = (name) => {
  const nameArr = name.split(" ");
  if (nameArr.length !== 2) return false;
  else if (nameArr[0]?.length < 3) return false;
  else if (nameArr[1]?.length < 3) return false;
  else if (!nameArr[0].split("").every((char) => isNaN(char))) return false;
  else if (!nameArr[1].split("").every((char) => isNaN(char))) return false;

  return true;
};

export default valiDateName;
