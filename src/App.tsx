import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { VariantProvider } from "./utils/hooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <VariantProvider>
      <RouterProvider router={router} />
    </VariantProvider>
  );
}

export default App;
