import conf from "/conf/conf.js";
import { Client, Databases,ID } from "appwrite";

 export class Service {
    client = new Client();
    databases;
    bucket ;
    
    constructor() {
        this.client.setEndpoint(conf.appwriteEndpoint).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, content, image, slug, status, userID}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                image,
               
                status,
                userID
            });
        }
            catch (error) {
                console.error("Error creating post:", error);
                throw error;
            }
    }
    async updatePost(slug, {title, content, image,  status, }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                image,
                status,
            });
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }
    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
                return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
            return false;   
        }
    }
    async getPosts(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }
}
const service = new Service();
export default service;
