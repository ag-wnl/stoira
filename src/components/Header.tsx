import Link from "next/link";
import * as React from 'react';
import { useSession } from "next-auth/react";
import SearchPosts from "./SearchPosts";

export default function Header() {
    const { data: session } = useSession();
    return (
    <header className="w-full z-30">
        <div className="max-w-7xl mx-auto">
            <nav className="flex items-center justify-between h-20">
            
                {/* Site branding */}
                <div className="flex-grow justify-start">
                    {/* Logo */}
                    <Link href="/" className="block tracking-tight font-bold text-[1.75rem] ">
                        Stoira
                    </Link>
                </div>

                <div className="flex-grow max-w-xl mx-4">
                    <SearchPosts />
                </div>

                {/* Desktop navigation */}
                <div className="flex text-sm md:text-lg justify-end">
                    {/* Desktop sign in links */}
                    <div>
                        <Link
                        href="/"
                        className="font-medium text-gray-200 hover:text-[hsl(262,100%,75%)] px-4 py-3 flex items-center transition duration-150 ease-in-out"
                        >
                        Hack    
                        </Link>
                    </div>
                    <div>
                        <Link
                        // href={session ? "/api/auth/signout" : "/api/auth/signin"}
                        href={session ? `/user/${session.user.name}` : "/api/auth/signin"}
                        className="font-medium text-gray-200 hover:text-[hsl(262,100%,75%)] px-4 py-3 flex items-center transition duration-150 ease-in-out"
                        >
                            {session ? `${session?.user?.name}` : "Sign in"}
                        </Link>
                    </div>
                
                </div>
            </nav>
        </div>
    </header>
    )
}