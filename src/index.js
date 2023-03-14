import React from "react";
import ReactDOM from "react-dom/client";
import "./style/import.scss";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketContext, socket } from "./context/socket";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GenerateRoom from "./components/GenerateRoom";
import AddUser from "./components/AddUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenerateRoom />,
  },
  {
    path: "/:roomId",
    element: <AddUser />,
  },
  {
    path: "/:userId/:roomId",
    element: (
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    ),
  },
  {
    path: "/:userId/:roomId?admin=true",
    element: (
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
