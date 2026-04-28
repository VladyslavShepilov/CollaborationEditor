/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharIdSchema } from "./CharIdSchema";
export type InsertCharPayload = {
  owner_id: number;
  value: string;
  local_counter: number;
  parent_id?: CharIdSchema | null;
};
