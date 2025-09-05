import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { AdminLayout } from './layouts/admin/AdminLayout';
import { MainLayout } from './layouts/public/MainLayout';

import {
    InicioPage,
    GaleriaPage,
    ItemPage,
    OrdersPage,
    OrderSinglePage,
    ContactoPage,
    AboutPage,
    CartPage,
    CheckoutPage,
} from './pages/public';

import {
    LoginPage,
    RegisterPage,
    AdminDashboardPage,
    ItemsPage,
    NewItemPage,
    EditItemPage,
    UsersPage,
    NewUserPage,
    EditUserPage,
} from './pages/admin';

import { GlobalStyles } from './theme';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
    return (
        <ThemeContextProvider>
            <GlobalStyles />
            <Router>
                <Routes>
                    {/* Public Layout */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<InicioPage />} />
                        <Route path="galeria" element={<GaleriaPage />} />
                        <Route path="galeria/item/:id" element={<ItemPage />} />
                        <Route path="ordenes" element={<OrdersPage />} />
                        <Route path="ordenes/:id" element={<OrderSinglePage />} />
                        <Route path="contacto" element={<ContactoPage />} />
                        <Route path="acerca" element={<AboutPage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="finalizar" element={<CheckoutPage />} />
                    </Route>

                    {/* Admin Layout */}
                    <Route path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<AdminDashboardPage />} />
                        <Route path='/admin/items' element={<ItemsPage />} />
                        <Route path='/admin/items/new' element={<NewItemPage />} />
                        <Route path='/admin/items/:id/edit' element={<EditItemPage />} />
                        <Route path='/admin/users' element={<UsersPage />} />
                        <Route path='/admin/users/new' element={<NewUserPage />} />
                        <Route path='/admin/users/:id/edit' element={<EditUserPage />} />
                    </Route>

                    {/* Auth Routes (no layout) */}
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route path="/admin/register" element={<RegisterPage />} />
                </Routes>
            </Router>
        </ThemeContextProvider>
    );
}

export default App;
