import { use } from "react";
import conf from "/conf/conf.js";
import { Client, Account,ID } from "appwrite";

export class Authservice {
    client = new Client();
    constructor() {
        this.client.setEndpoint(conf.appwriteEndpoint).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //use another method
            }
            else {
                return userAccount;
        }
     } catch (error) {
            throw error;
        }
    }
    
    
