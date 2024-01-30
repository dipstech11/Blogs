import conf from "../../conf/conf"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    acccount;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call login directly
                this.login(email, password)
            }
            else {
                return false
            }
        } catch (e) {
            console.log("Error creating account: ", e.message)
            return false
        }
    }

    async login(email, password) {
        try {
            return await this.acccount.createEmailSession(email, password)
        } catch (e) {
            console.log("Error login: ", e.message)
            return false
        }
    }

    async currentUser() {
        try {
            return await this.account.get()

        } catch (e) {
            console.log("Error currentUser:", e.message)
        }

        return false
    }

    // logout
    async logout() {
        try {
            return await this.account.deleteSessions()

        } catch (e) {
            console.log("Error logout: ", e.message)
        }
    }

}

const AuthService = new AuthService();

export default AuthService;