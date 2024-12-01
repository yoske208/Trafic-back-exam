import fs from "fs";
import bcrypt from "bcrypt";
import Router from "../Models/RoutesModel"; // Your User model

/**
 * Encrypts passwords for all users in the provided data array.
 * @param routerData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
// async function encryptPasswords(routerData: any[]) {
//   return Promise.all(
//     routerData.map(async (puzzele) => {
//       if (puzzele.password) {
//         // Hash the password using bcrypt
//         puzzele.password = await bcrypt.hash(puzzele.password, 10);
//       }
//       return puzzele;
//     })
//   );
// }

/**
 * Loads initial user data into the database if no users exist.
 * Reads user data from a JSON file, encrypts passwords, and inserts data into the database.
 */
async function loadInitialData() {
  // Read user data from a JSON file
  const routerData = JSON.parse(fs.readFileSync("./data/Router.json", "utf8"));

  // Check if the database is empty
  if ((await Router.countDocuments()) === 0) {
    // Encrypt passwords before inserting into the database
    // const encryptedPuzzeleData = await encryptPasswords(routerData);
    // await Router.insertMany(encryptedPuzzeleData);
    console.log("Initial users have been added to the database.");
  } else {
    console.log("Users already exist in the database.");
  }
}

export default loadInitialData;
