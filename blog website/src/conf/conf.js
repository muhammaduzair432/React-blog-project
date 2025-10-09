const conf = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECTID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASEID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKETID),
}
export default conf;