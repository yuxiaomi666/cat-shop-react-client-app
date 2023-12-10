import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import Details from "./components/CatAPIDetails";
import Search from "./components/CatAPISearch";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:search" element={<Search />} />
        <Route path="details/:catId" element={<Details />} />
        {/* ... other routes ... */}
      </Routes>
    </>
  );
};

export default App;
