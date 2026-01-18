import { RouterProvider } from "react-router";
import { router } from "./AppRouter";
import "./App.css";

export function App() {
  return <RouterProvider router={router} />;
}
