const GenerategreetingMsg = () => {
  let newDate = new Date();
  let newHour = newDate.getHours();

  if (newHour >= 0 && newHour < 11) return "Good morning,";
  if (newHour >= 12 && newHour < 16) return "Good afternoon,";
  if (newHour >= 16 && newHour < 23) return "Good evening,";
};

export default GenerategreetingMsg;
