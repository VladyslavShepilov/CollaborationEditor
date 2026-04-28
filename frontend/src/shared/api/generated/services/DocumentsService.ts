/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharSchema } from "../models/CharSchema";
import type { CreateDocumentPayload } from "../models/CreateDocumentPayload";
import type { CreateDocumentResponse } from "../models/CreateDocumentResponse";
import type { DeleteCharPayload } from "../models/DeleteCharPayload";
import type { DocumentResponse } from "../models/DocumentResponse";
import type { InsertCharPayload } from "../models/InsertCharPayload";
import type { SaveDocumentPayload } from "../models/SaveDocumentPayload";
import type { SaveDocumentResponse } from "../models/SaveDocumentResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DocumentsService {
  /**
   * Create Document
   * @param requestBody
   * @returns CreateDocumentResponse Successful Response
   * @throws ApiError
   */
  public static createDocumentDocumentsPost(
    requestBody: CreateDocumentPayload,
  ): CancelablePromise<CreateDocumentResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/documents",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Save Document
   * @param documentId
   * @param requestBody
   * @returns SaveDocumentResponse Successful Response
   * @throws ApiError
   */
  public static saveDocumentDocumentsDocumentIdPut(
    documentId: number,
    requestBody: SaveDocumentPayload,
  ): CancelablePromise<SaveDocumentResponse> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/documents/{document_id}",
      path: {
        document_id: documentId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get Document
   * @param documentId
   * @returns DocumentResponse Successful Response
   * @throws ApiError
   */
  public static getDocumentDocumentsDocumentIdGet(
    documentId: number,
  ): CancelablePromise<DocumentResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/documents/{document_id}",
      path: {
        document_id: documentId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Insert Char
   * @param documentId
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static insertCharDocumentsDocumentIdCharsPost(
    documentId: number,
    requestBody: InsertCharPayload,
  ): CancelablePromise<CharSchema | null> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/documents/{document_id}/chars",
      path: {
        document_id: documentId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Delete Char
   * @param documentId
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteCharDocumentsDocumentIdCharsDelete(
    documentId: number,
    requestBody: DeleteCharPayload,
  ): CancelablePromise<CharSchema | null> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/documents/{document_id}/chars",
      path: {
        document_id: documentId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get User Documents
   * @param userId
   * @returns DocumentResponse Successful Response
   * @throws ApiError
   */
  public static getUserDocumentsUsersUserIdDocumentsGet(
    userId: number,
  ): CancelablePromise<Array<DocumentResponse>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{user_id}/documents",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
