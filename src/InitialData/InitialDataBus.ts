import fs from "fs";
import bcrypt from "bcrypt";
import Bus from "../Models/BusModel"; // Your User model

/**
 * Encrypts passwords for all users in the provided data array.
 * @param busData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
async function encryptPasswords(busData: any[]) {
  return Promise.all(
    busData.map(async (bus) => {
      if (bus.password) {
        // Hash the password using bcrypt
        bus.password = await bcrypt.hash(bus.password, 10);
      }
      return bus;
    })
  );
}

/**
 * Loads initial user data into the database if no users exist.
 * Reads user data from a JSON file, encrypts passwords, and inserts data into the database.
 */
async function loadInitialData() {
  // Read user data from a JSON file
  const busData = JSON.parse(fs.readFileSync("./data/Bus.json", "utf8"));

  // Check if the database is empty
  if ((await Bus.countDocuments()) === 0) {
    // Encrypt passwords before inserting into the database
    const encryptedBusData = await encryptPasswords(busData);
    await Bus.insertMany(encryptedBusData);
    console.log("Initial users have been added to the database.");
  } else {
    console.log("Users already exist in the database.");
  }
}

export default loadInitialData;
