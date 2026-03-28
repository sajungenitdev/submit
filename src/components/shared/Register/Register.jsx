import Link from 'next/link';
import React from 'react';

const Register = () => {
    return (
        <div className="min-h-screen flex fle-col items-center justify-center p-6 bg-white">
            <div className="grid lg:grid-cols-2 items-center gap-8 max-w-6xl max-lg:max-w-lg w-full">
                <form className="lg:max-w-md w-full">
                    <h1 className="text-slate-900 text-3xl font-semibold mb-8">Create an account</h1>
                    <div className="space-y-6">
                        <div>
                            <label className="text-slate-900 text-sm mb-2 block">Name</label>
                            <input name="name" type="text" className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all" placeholder="Enter name" />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm mb-2 block">Email</label>
                            <input name="email" type="text" className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all" placeholder="Enter email" />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm mb-2 block">Password</label>
                            <input name="password" type="password" className="bg-gray-100 w-full text-slate-900 text-sm px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all" placeholder="Enter password" />
                        </div>
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 rounded" />
                            <label className="ml-3 block text-sm text-slate-600">
                                I accept the <Link href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</Link>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6">
                        {/* <button type="button" className="py-3 px-6 text-sm text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                            Register
                        </button> */}
                        <Link href="/dashboard" type="button" className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                            Sign Up
                        </Link>
                    </div>
                    <p className="text-sm text-slate-600 mt-6">Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login here</Link></p>
                </form>

                <div className="h-full">
                    <img src="https://readymadeui.com/login-image.webp" className="w-full h-full object-contain aspect-[628/516]" alt="login img" />
                </div>
            </div>
        </div>
    );
};

export default Register;