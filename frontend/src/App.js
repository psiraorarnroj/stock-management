// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout";
import PortfolioPage from "./pages/PortfolioPage";
import StockPage from "./pages/StockPage";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
