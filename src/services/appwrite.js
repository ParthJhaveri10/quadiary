import { Client, Account, Databases, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('6862698e00345f18c415'); // Your Appwrite Project ID

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Configuration
export const appwriteConfig = {
    projectId: '6862698e00345f18c415',
    databaseId: '68626a58000925218dd0',
    userCollectionId: '68626ca9001f1e45a5d3',
    ratingsCollectionId: 'YOUR_RATINGS_COLLECTION_ID',
    listsCollectionId: 'YOUR_LISTS_COLLECTION_ID'
};

export { Query };
export default client;