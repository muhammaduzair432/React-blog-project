import conf from "..conf.js";
import { Client, Databases,ID,Query,Storage } from "appwrite";

 export class Service {
    client = new Client();
    databases;
    bucket ;
    
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
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
    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }
    async getPosts(queries = [ Query.equal("status" , "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }   
    }
    //upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
             await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
                return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }
    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.error("Error getting file preview:", error);
            throw error;
        }
    }

    }
const service = new Service();
export default service;
