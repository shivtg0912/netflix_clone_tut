import React from "react";
interface InputProps {
    // placeholder: string;
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

const Input:React.FC<InputProps> = (
    {id, onChange, value, label, type = "text"}
) => {
    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}

                className="
                    block
                    rounded-md 
                    px-6 
                    pt-6 
                    pb-3 
                    w-full 
                    text-md 
                    text-white 
                    bg-neutral-700 
                    appearance-none 
                    focus:outline-none 
                    focus:ring-0 
                    peer
                "
                placeholder=" "
            />
            <label className="
                absolute
                text-md
                text-zinc-200
                duration-150
                transform
                -translate-y-3
                scale-75
                top-4
                z-10
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:-translate-y-3
                peer-focus:scale-75
            " 
            htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
export default Input;