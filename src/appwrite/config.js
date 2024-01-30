import conf from "../../conf/conf"
import { Client, Databases, Storage, Query, ID } from "appwrite";


export class Service {
    client = new Client()
    databases
    storage

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Databases Service
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.datadases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, // unique ID
                {
                    title, content, featuredImage, status, userId
                }
            )

        } catch (e) {
            console.log("Error creating post: ", e.message)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.datadases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, // unique ID
                {
                    title, content, featuredImage, status, userId
                }
            )

        } catch (e) {
            console.log("Error updating post: ", e.message)
        }
    }

    async deletePost(slug) {
        try {
            await this.datadases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug // unique ID
            )
            return true

        } catch (e) {
            console.log("Error deleting post: ", e.message)
        }
        return false
    }

    async getPost(slug) {
        try {
            return await this.datadases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug // unique ID
            )
        } catch (e) {
            console.log("Error getting post: ", e.message)
        }
        return false
    }

    // get all documents where status is active
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.datadases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (e) {
            console.log("Error getting post: ", e.message)
        }
        return false
    }

    // Storage Service
    async uploadFile(file) { // file is the blob here not just the file name.
        try {
            return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )

        } catch (e) {
            console.log("Error uploading file", e.message)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true

        } catch (e) {
            console.log("Error deleting file", e.message)
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )

        } catch (e) {
            console.log("Error getting file preview: ", e.message)
            return false
        }

    }


}

const service = new Service()

export default service