import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * Creates a new document in the database.
   *
   * @param {Omit<TDocument, '_id'>} document - The document data to be created, excluding the '_id' field.
   * @return {Promise<TDocument>} The created document.
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   * Finds and returns a single document based on the provided filter query.
   *
   * @param {FilterQuery<TDocument>} filterQuery - The filter query to search for the document.
   * @return {Promise<TDocument>} The found document.
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  /**
   * Finds and updates a single document based on the provided filter query, and returns the updated document.
   *
   * @param {FilterQuery<TDocument>} filterQuery - The filter query to search for the document.
   * @param {UpdateQuery<TDocument>} update - The update query to apply to the found document.
   * @return {Promise<TDocument>} The updated document.
   * @throws {NotFoundException} If the document is not found.
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  /**
   * Finds and returns a list of documents based on the provided filter query.
   *
   * @param {FilterQuery<TDocument>} filterQuery - The filter query to search for the documents.
   * @return {Promise<TDocument[]>} The list of found documents.
   */
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  /**
   * Finds and deletes a single document based on the provided filter query.
   *
   * @param {FilterQuery<TDocument>} filterQuery - The filter query to search for the document to delete.
   * @return {Promise<TDocument>} The deleted document.
   */
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }
}
