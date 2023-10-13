import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";
import Favorites from "../pages/Favorites";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/details/:symbol" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    );
}

export default AppRoutes;