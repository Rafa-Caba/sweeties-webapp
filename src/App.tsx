import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './theme/GlobalStyles';

import { MainLayout } from './layouts/public/MainLayout';
import { InicioPage } from './pages/public/InicioPage';
import { ThemeContextProvider } from './context/ThemeContext';
import { GaleriaPage } from './pages/public/GaleriaPage';
import { OrdenarPage } from './pages/public/OrdenarPage';
import { ContactoPage } from './pages/public/ContactoPage';
import { CarritoPage } from './pages/public/CarritoPage';
import { NosotrosPage } from './pages/public/NosotrosPage';

function App() {
    return (
        <ThemeContextProvider>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<InicioPage />} />
                        <Route path="galeria" element={<GaleriaPage />} />
                        <Route path="ordenar" element={<OrdenarPage />} />
                        <Route path="contacto" element={<ContactoPage />} />
                        <Route path="conocenos" element={<NosotrosPage />} />
                        <Route path="carrito" element={<CarritoPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeContextProvider>
    );
}

export default App;
