import { Client, Account } from "appwrite";

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67d2e9c500349f0575ba"); // Replace with your project ID

export const account = new Account(client);
