import { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import {
    NavbarWrapper,
    NavbarItem,
    CartIcon,
    HamburgerIcon,
    MobileMenu,
    MobileMenuItem,
    MobileMenuBackdrop
} from '../../styles/public/NavbarStyles';
import { useNavigate } from 'react-router-dom';

export const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavigate = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <NavbarWrapper $scrolled={scrolled}>
                <HamburgerIcon onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </HamburgerIcon>

                <div className="desktop-links">
                    <NavbarItem onClick={() => handleNavigate('/')}>Inicio</NavbarItem>
                    <NavbarItem onClick={() => handleNavigate('/galeria')}>Galeria</NavbarItem>
                    <NavbarItem onClick={() => handleNavigate('/ordenes')}>Órdenes</NavbarItem>
                    <NavbarItem onClick={() => handleNavigate('/contacto')}>Contacto / Ayuda</NavbarItem>
                    <NavbarItem onClick={() => handleNavigate('/acerca')}>Conócenos</NavbarItem>
                    <CartIcon onClick={() => handleNavigate('/cart')}>
                        <FaShoppingCart />
                    </CartIcon>
                </div>
            </NavbarWrapper>

            {isOpen && (
                <>
                    <MobileMenuBackdrop onClick={toggleMenu} />
                    <MobileMenu>
                        <MobileMenuItem onClick={() => handleNavigate('/')}>Inicio</MobileMenuItem>
                        <MobileMenuItem onClick={() => handleNavigate('/ordenes')}>Órdenes</MobileMenuItem>
                        <MobileMenuItem onClick={() => handleNavigate('/contacto')}>Contacto / Ayuda</MobileMenuItem>
                        <MobileMenuItem onClick={() => handleNavigate('/acerca')}>Conócenos</MobileMenuItem>
                        <MobileMenuItem onClick={() => handleNavigate('/cart')}>
                            <FaShoppingCart /> Carrito
                        </MobileMenuItem>
                    </MobileMenu>
                </>
            )}
        </>
    );
};
