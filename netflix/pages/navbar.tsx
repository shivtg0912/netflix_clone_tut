import { useState, useCallback } from "react";
import NavbarItem from "./navbarItem";
import { BsSearch,BsChevronDown } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";
const Navbar = () => {
    const [isMobileMenuVisible, setVisible] = useState(false);
    const toggleMobileMenu = useCallback(() => {
        setVisible((prev) => !prev);
    }, []);
    const [isAccountMenuVisible, setAccountMenuVisible] = useState(false);
    const toggleAccountMenu = useCallback(() => {
        setAccountMenuVisible((prev) => !prev);
    }, []);
    return (
        <nav className="w-full fixed z-40">
            <div className="
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                bg-zinc-900
                bg-opacity-90            
            ">
                <img className="h-14 lg:h-15" src="/images/logo.png" alt="logo" />
                <div className="
                    flex-row
                    ml-7
                    mr-2
                    gap-7
                    lg:flex
                    hidden
                ">
                    <NavbarItem label="Home"/>
                    <NavbarItem label="TV Shows"/>
                    <NavbarItem label="Movies"/>
                    <NavbarItem label="New and Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by Languages"/>
                </div>
                <div className="lg:hidden flex flex-row items-center cursor-pointer gap-2 ml-8 relative" onClick={toggleMobileMenu}>
                    <p className="font-bold text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${isMobileMenuVisible ? 'rotate-180' : ''}`}/>
                    <MobileMenu visible={isMobileMenuVisible}/>
                </div> 
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-100 hover:text-gray-400 cursor-pointer text-2xl transition">
                        <BsSearch/>
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-10 h-10rounded-md overflow-hidden">
                            <img src="/images/icon1.jpg" alt="" />
                        </div>
                        <BsChevronDown className={`text-white transition ${isAccountMenuVisible ? 'rotate-180' : ''}`}/>
                        <AccountMenu visible={isAccountMenuVisible}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
