import React from "react";
import { signOut } from "next-auth/react";
interface AccountMenuProps {
    visible?: boolean
}
const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
    if(!visible)return null;
    return (
        <div className="bg-black bg-opacity-60 w-56 absolute flex flex-col top-14 py-5 right-0 border-2 border-gray-700">
            <div className="flex flex-col gap=3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-10 rounded-md" src="/images/icon2.png" alt="" />
                    <p className="text-white  text-sm group-hover/item:underline">Pablo</p>
                </div>
                <div className="px-3 group/item flex flex-row mt-3 gap-3 items-center w-full">
                    <img className="w-10 rounded-md" src="/images/icon3.png" alt="" />
                    <p className="text-white  text-sm group-hover/item:underline">Juan</p>
                </div>
                <div className="px-3 group/item flex flex-row mt-3 gap-3 items-center w-full">
                    <img className="w-10 rounded-md" src="/images/icon4.png" alt="" />
                    <p className="text-white  text-sm group-hover/item:underline">Pedro</p>
                </div>
                <hr className="bg-gray-600 my-6 border-0 h-px"/>
                <div onClick={()=>signOut()} className="px-3 text-center text-white text-sm">
                    Sign out of Netflix
                </div>
            </div> 
        </div>
    )
}

export default AccountMenu;