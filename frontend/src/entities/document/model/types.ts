export interface Document {
  id: string;
  title: string;
  description: string;
  previewImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
