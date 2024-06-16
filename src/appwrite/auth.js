import {Client,Account,ID} from 'appwrite'
import conf from '../conf/conf'
export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
       try {
        const userAccount = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if(userAccount){
            return this.authLogin({email,password})
        }else{
            return userAccount
        }
       } catch (error) {
        throw error
       }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async authLogin({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }
}

const authservices = new AuthService()
export default authservices;