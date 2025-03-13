import React from "react";
interface MobileMenuProps {
    visible?: boolean
}
const MobileMenu: React.FC<MobileMenuProps>= ({visible}) => {
    if(!visible)return null;
    return (
        <div className="bg-black bg-opacity-40 w-56 absolute flex flex-col top-8 px-2 py-2.5 border-2 border-gray-800">
            <div className="flex flex-col gap-4">
                <div className="text-white text-center hover:underline">
                    Home
                </div>
                <div className="text-white text-center hover:underline">
                    TV Shows
                </div>
                <div className="text-white text-center hover:underline">
                    Movies
                </div>
                <div className="text-white text-center hover:underline">
                    New and Popular
                </div>
                <div className="text-white text-center hover:underline">
                    My List
                </div>
                <div className="text-white text-center hover:underline">
                    Browse by Languages
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;