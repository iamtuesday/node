// Stop using switch in Js, use object instead

const getDay = () => {
  const dayNumber = new Date().getDay();

  let day;
  switch (dayNumber) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;

    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "Unknown";
  }

  return day;
};


const _getDay = () => {
  const dayNumber = new Date().getDay();

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thurday",
    5: "Friday",
    6: "Saturday",
  };

  return days[dayNumber];
};


const switchCase =
  (obj, defaultValue = "_default") =>
  (value) => {
    return obj[value] || defaultValue;
  };

const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thurday",
  5: "Friday",
  6: "Saturday",
};

const getDay2 = switchCase(days);
console.log(_getDay());
