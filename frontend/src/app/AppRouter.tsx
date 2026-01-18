import { createBrowserRouter } from "react-router";
import { GalleryPage, EditorPage } from "@/pages/text-editor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GalleryPage />,
  },
  {
    path: "/editor/:id",
    element: <EditorPage />,
  },
]);
