import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Pages/Error";
import PageFound from "./Pages/NoPageFound";
import { ToastContainer } from "react-toastify";
import GanttChartPage from "./Pages/GanttChart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      children: [
        { path: "/", element: <GanttChartPage /> },
        { path: "*", element: <PageFound /> },
      ],
    },
  ]);
  // test
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
