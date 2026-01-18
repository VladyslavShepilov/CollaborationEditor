import { createBrowserRouter } from "react-router";
import { TextEditorPage } from "@/pages/TextEditorPages/TextEditorPage";
import { GalleryPage } from "@/pages/TextEditorPages/GalleryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GalleryPage />,
  },
  {
    path: "/editor/:id",
    element: <TextEditorPage />,
  },
]);
