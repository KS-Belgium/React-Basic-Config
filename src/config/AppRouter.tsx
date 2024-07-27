import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;