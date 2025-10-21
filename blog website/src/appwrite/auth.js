import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  /**
   * Create an account and immediately sign in.
   * @param {{email: string, password: string, name?: string}} param0
   */
  async createAccount({ email, password, name }) {
    // Validate input early to avoid weird runtime errors
    if (!email || !password) {
      throw new Error("email and password are required to create an account");
    }

    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      // If account creation succeeded, create a session (login).
      if (userAccount) {
        return await this.login(email, password);
      }

      // Should rarely happen, but return whatever the SDK returned.
      return userAccount;
    } catch (error) {
      // Now the catch is meaningful (logs + rethrow)
      // ESLint won't flag this as "useless"
      console.error("AuthService.createAccount failed:", error);
      throw error;
    }
  }

  /**
   * Sign in with email and password.
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    if (!email || !password) {
      throw new Error("email and password are required to login");
    }
    // No try/catch here — let caller handle errors. This avoids useless rethrow.
    return await this.account.createEmailPasswordSession(email, password);
  }

  /**
   * Get current authenticated user's account data.
   */
  async getCurrentUser() {
    // Simple and clear — no unnecessary try/catch
    return await this.account.get();
  }

  /**
   * Delete all sessions (log out).
   */
  async logout() {
    // No try/catch required unless you want custom handling/logging
    return await this.account.deleteSessions();
  }
}

const authService = new AuthService();
export default authService;
