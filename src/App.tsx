import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './theme/GlobalStyles';

import { MainLayout } from './layouts/public/MainLayout';
import { InicioPage } from './pages/public/InicioPage';
import { ThemeContextProvider } from './context/ThemeContext';
import { GaleriaPage } from './pages/public/GaleriaPage';
import { ItemPage } from './pages/public/ItemPage';
import { ContactoPage } from './pages/public/ContactoPage';
import { AboutPage } from './pages/public/AboutPage';
import { CartPage } from './pages/public/CartPage';
import { OrdersPage } from './pages/public/OrdersPage';
import { OrderSinglePage } from './pages/public/OrderSinglePage';
import { CheckoutPage } from './pages/public/CheckoutPage';

function App() {
    return (
        <ThemeContextProvider>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<InicioPage />} />
                        <Route path="galeria" element={<GaleriaPage />} />
                        <Route path="galeria/item/:id" element={<ItemPage />} />
                        <Route path="ordenes" element={<OrdersPage />} />
                        <Route path="/ordenes/:id" element={<OrderSinglePage />} />
                        <Route path="contacto" element={<ContactoPage />} />
                        <Route path="acerca" element={<AboutPage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="/finalizar" element={<CheckoutPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeContextProvider>
    );
}

export default App;
