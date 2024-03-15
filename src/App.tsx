import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Counter } from "./store/feature/counter/Counter";
import Cart1 from "./store/feature/cart/Cart1";
import ProductPage from "./components/ProductPage";
import Fallback from "./components/Fallback";
const LazyStore = React.lazy(() => import("./pages/Store"));
const LazyPrivateRoute = React.lazy(() => import("./PrivateRoute"));
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store/Store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <React.Suspense fallback={<Fallback />}>
                  <LazyPrivateRoute />
                </React.Suspense>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About/>}/>
              <Route
                path="/store"
                element={
                  <React.Suspense fallback={<Fallback />}>
                    <LazyStore />
                  </React.Suspense>
                }
              />
              <Route path="/store/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="/cart1" element={<Cart1 />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
