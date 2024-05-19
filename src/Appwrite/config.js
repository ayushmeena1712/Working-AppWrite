import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  bucket;
  database;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error: CreateDocument Error" + error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionID, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error: UpdateDocument Error" + error);
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service Error: GetDocument Error" + error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service Error: ListDocuments Error" + error);
      return false;
    }
  }

  async deletePost({ slug }) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service Error: DeleteDocument Error" + error);
      return false;
    }
  }

  // file upload service
  async uploadFile(file) {
    try {
      await this.storage.getFileDownload(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service Error: UploadFile Error" + error);
    }
  }

  async deleteFile(fileId) {
    try {
      this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service Error: DeleteFile Error" + error);
      return false;
    }
  }

  async downloadFile(fileId) {
    try {
      this.bucket.downloadFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service Error: DownloadFile Error" + error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}
const service = new Service();
export default service;