import useridModel from "../models/user.id.js";
async function Storagedb() {
  try {
    return await useridModel.findOne({});
  }
  catch (error) {
    console.log(error.message);

  }
}

function randomItem(arr) {
  if (arr.length === 0) {
    return "";
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

export default async function generateAnonymousId() {
  let data = await Storagedb();
  if (!data) {
    return "Username source document not found";
  }
  const { firstNames, lastNames } = data;
  const user_id = `@${randomItem(firstNames)}${randomItem(lastNames)}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 4)}`;

  console.log(user_id);
  return user_id;
}

