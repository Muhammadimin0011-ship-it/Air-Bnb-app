import { useState } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import Listings from "./components/Listings";
import SingUp from "./components/SingUp";
import Header from "./components/Header";
import Detail from "./components/Detail";
import Favorite from "./components/Favorite";

import { graphqlClient } from "./store/graph-client";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <ApolloProvider client={graphqlClient}>

      <Header
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />

      <ToastContainer />

      <Routes>

        <Route
          path="/"
          element={
            <Listings
              search={search}
              page={page}
              setPage={setPage}
            />
          }
        />

        <Route
          path="/sing-up"
          element={<SingUp />}
        />

        <Route
          path="/listing/:id"
          element={<Detail />}
        />


        <Route
          path="/"
          element={<App />}
        />


        <Route
          path="/favorite"
          element={<Favorite />}
        />
      </Routes>

    </ApolloProvider>
  );
}

export default App;