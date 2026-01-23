import { createBrowserRouter } from "react-router";
import { AppLayout } from "./ui/AppLayout";
import { GalleryPage } from "@/pages/gallery";
import { EditorPage } from "@/pages/editor";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <GalleryPage />,
      },
      {
        path: "/editor/:id",
        element: <EditorPage />,
      },
    ],
  },
]);
