import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from 'next-auth/react';
const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');
    const toggleVariant = useCallback(() => {
        setVariant((curr) => curr === 'login' ? 'register' : 'login'); 
    },[]); // Add the setVariant dependency
    const login = useCallback(async()=> {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect:false,
                callbackUrl:'/'
            });
            router.push('/');
        } catch (err) {
            console.log(err);
        }
    },[email,password,router])    
    const register = useCallback(async() => {
        try {
            await axios.post('/api/register',{
                email,
                name,
                password
            });
            login()
        } catch (err) {
            console.log(err);
        }
    },[email,name,password,login])
   
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-40"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Login' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                            <Input
                                label="Username"
                                onChange={(e:any) => setName(e.target.value)}
                                id="name"
                                type="name"
                                value={name}
                            />
                            )}
                            <Input
                                label="Email"
                                onChange={(e:any) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(e:any) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 text-white rounded-md px-6 py-3 mt-4 w-full hover:bg-red-700">
                        {variant === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <p className="ml-5 text-neutral-500 mt-12 text-center">
                            {variant === 'login' ? "Don't have an account?" : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-5 mr-7 hover:underline cursor-pointer">
                                {variant === 'login' ? "Create one" : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Auth;
