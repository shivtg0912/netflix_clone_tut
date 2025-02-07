const Input = () => {
    return (
        <div>
        <input
            className="block
            rounded-md 
            px-6 
            pt-6 
            pb-1 
            w-full 
            text -md 
            text -red 
            bg-neutral-700 
            appearance-none 
            focus:outline-none 
            focus:ring-0 
            peer
            "
            placeholder=" "
        />
        <label className="
            absolure
            text -md
        " 
            htmlFor="email"></label>
        </div>
    );
}
export default Input;