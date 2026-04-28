/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharSchema } from "./CharSchema";
export type DocumentResponse = {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  allowed_to_modify: Array<number>;
  version: number;
  content: Array<CharSchema>;
};
