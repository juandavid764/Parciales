import { Routes, Route } from "react-router-dom";

import {NotFoundPage} from "../pages/NotFoundPage";
import {HomePage} from "../pages/HomePage";
import {CityNetworkPage} from "../pages/CityNetworkPage";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/CityNetworkPage" element={<CityNetworkPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
