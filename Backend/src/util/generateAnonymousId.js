import { firstNames, lastNames } from "./names.js";


function randomItem(name) {
  return name[Math.floor(Math.random() * name.length)];
}

export default  function generateAnonymousId() {
  const User_Name= randomItem(firstNames) +
    randomItem(lastNames) +
    "-" +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 6)
    console.log(User_Name);
    return User_Name;
}

