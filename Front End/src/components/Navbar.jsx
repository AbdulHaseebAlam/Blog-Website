// import React, { Fragment } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// const navigation = [
//     { name: 'Home', href: '#', current: true },
//     { name: 'Blogs', href: '#', current: false },
//     { name: 'About', href: '#', current: false },
//     { name: 'Contact', href: '#', current: false },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Navbar() {
//     return (
//         <Disclosure as="nav" className="bg-gray-800">
//             {({ open }) => (
//                 <>
//                     <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                         <div className="relative flex h-16 items-center justify-between">
//                             <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                                 {/* Mobile menu button*/}
//                                 <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                                     <span className="absolute -inset-0.5" />
//                                     <span className="sr-only">Open main menu</span>
//                                     {open ? (
//                                         <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                                     ) : (
//                                         <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                                     )}
//                                 </Disclosure.Button>
//                             </div>
//                             <div className="flex flex-1 items-center justify-between sm:items-stretch">
//                                 <div className="flex flex-shrink-0 items-center">
//                                     <h1 className='text-white font-bold hover:cursor-pointer'><NavLink to="#">Write-Blog</NavLink></h1>
//                                 </div>
//                                 <div className="hidden sm:ml-6 sm:block">
//                                     <div className="flex space-x-4">
//                                         {navigation.map((item) => (
//                                             <a
//                                                 key={item.name}
//                                                 href={item.href}
//                                                 className={classNames(
//                                                     item.current ? 'bg-gray-900 text-yellow-500' : 'text-gray-300 hover:text-yellow-500',
//                                                     'rounded-md px-3 py-2 text-sm font-medium'
//                                                 )}
//                                                 aria-current={item.current ? 'page' : undefined}
//                                             >
//                                                 {item.name}
//                                             </NavLink>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <Disclosure.Panel className="sm:hidden">
//                         <div className="space-y-1 px-2 pb-3 pt-2">
//                             {navigation.map((item) => (
//                                 <Disclosure.Button
//                                     key={item.name}
//                                     as="a"
//                                     href={item.href}
//                                     className={classNames(
//                                         item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                         'block rounded-md px-3 py-2 text-base font-medium'
//                                     )}
//                                     aria-current={item.current ? 'page' : undefined}
//                                 >
//                                     {item.name}
//                                 </Disclosure.Button>
//                             ))}
//                         </div>
//                     </Disclosure.Panel>
//                 </>
//             )}
//         </Disclosure>
//     )
// }

import React, { useContext, useEffect, useState } from 'react'
import './navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { userContext } from './UserContext';

export default function Navbar() {

    // const [email, setEmail] = useState(null);
    const { setUserInfo, userInfo } = useContext(userContext);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('http://localhost:4000/profile', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    alert('Failed to fetch profile data, Login Again!');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        fetchProfile();
    }, [])

    function logOut() {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        setUserInfo(null);
    }

    const email = userInfo?.email;
    return (
        <>
            <header>
                <main className=' flex justify-between'>
                    <div className=" font-bold logo"><NavLink to="/">Write-Blog</NavLink></div>
                    <nav>
                        <ul className='flex'>
                            <li><NavLink to={"/"}
                                className={({ isActive }) => {
                                    return isActive ? 'text-yellow-400' : "";
                                }}>Home</NavLink></li>
                            <li><NavLink to={"/blogs"}
                                className={({ isActive }) => {
                                    return isActive ? 'text-yellow-400' : "";
                                }}>Blogs</NavLink></li>
                            <li><NavLink to={"/about"}
                                className={({ isActive }) => {
                                    return isActive ? 'text-yellow-400' : "";
                                }}>About</NavLink></li>

                            {!email && (
                                <>
                                    <li><NavLink to={"/login"}
                                        className={({ isActive }) => {
                                            return isActive ? 'text-yellow-400' : "";
                                        }}>Login</NavLink></li>
                                    <li><NavLink to={"/signup"}
                                        className={({ isActive }) => {
                                            return isActive ? 'text-yellow-400' : "";
                                        }}>Register</NavLink></li>
                                </>
                            )}
                            {email && (
                                <>
                                    <li><NavLink to={"/compose"}
                                        className={({ isActive }) => {
                                            return isActive ? 'text-yellow-400' : "";
                                        }}>Create Post</NavLink></li>
                                    <li><Link onClick={logOut}>Logout</Link></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </main>
            </header>
        </>
    )
}
