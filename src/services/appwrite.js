import { Client, Account, Databases, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

// Use environment variables for configuration
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || '6862698e00345f18c415';

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint (can be custom domain)
    .setProject(projectId); // Your Appwrite Project ID

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Configuration
export const appwriteConfig = {
    projectId: projectId,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '68626a58000925218dd0',
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID || '68626ca9001f1e45a5d3',
    ratingsCollectionId: 'YOUR_RATINGS_COLLECTION_ID',
    listsCollectionId: 'YOUR_LISTS_COLLECTION_ID'
};

export { Query };
export default client;