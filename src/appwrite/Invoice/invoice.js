import { Databases, Client, ID } from "appwrite";
import conf from "../../conf/conf";

export class AddInvoice {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.database = new Databases(this.client);
  }

  async addInvoice(
    common_post_id,
    invoiceCode,
    Status,
    {
      street,
      city,
      post_code,
      country,
      qyt,
      client_name,
      client_street,
      client_email,
      client_city,
      client_post_code,
      client_country,
      invoice_date,
      project_description,
      item_name,
      item_price,
      total_price,
    }
  ) {
    try {
      const response = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          common_post_id,
          invoiceCode,
          Status,
          street,
          city,
          post_code,
          country,
          qyt,
          client_name,
          client_street,
          client_email,
          client_city,
          client_post_code,
          client_country,
          invoice_date,
          project_description,
          item_name,
          item_price,
          total_price,
        }
      )

      return response;


      
    } catch (error) {
      throw error;
    }
  }

  async getInvoices(queries) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        
        queries
        
      );
    } catch (error) {
      throw error;
    }
  }

  async getInvoice({ invoiceCode }) {
    try {
      const invoice = await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        invoiceCode
      );

      if (invoice) {
        return invoice;
      }
    } catch (error) {
      throw error
    }
  }

  async deleteInvoice(invoiceCode) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        invoiceCode
      );
    } catch (error) {
      console.log(error.message);
      alert(`Can't delete now try again later`);
    }
  }

  async updateInvoice(document_id,
    {
      Status,
    street,
    city,
    post_code,
    country,
    qyt,
    client_name,
    client_street,
    client_email,
    client_city,
    client_post_code,
    client_country,
    invoice_date,
    project_description,
    item_name,
    item_price,
    total_price,}){
    try {
      const  updated_document = await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        document_id,
        {
          Status,
          street,
          city,
          post_code,
          country,
          qyt,
          client_name,
          client_street,
          client_email,
          client_city,
          client_post_code,
          client_country,
          invoice_date,
          project_description,
          item_name,
          item_price,
          total_price,
        }
      )
      return updated_document;

    } catch (error) {
      console.log(`Error occured in :: invoice.js :: updateInvoice`,error.message);
    }
  }

}

const addInvoiceService = new AddInvoice();
export default addInvoiceService;
