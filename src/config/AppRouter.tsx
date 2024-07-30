import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import WalletCo from "../pages/WalletCo.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WalletCo />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;