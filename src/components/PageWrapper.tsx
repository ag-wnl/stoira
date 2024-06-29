import { type ReactNode } from "react";
import * as React from 'react';

export default function PageWrapper({ children } : { children: ReactNode }){
    return (
        <div className="bg-[#000000] text-white mx-auto w-full max-h-full max-w-7xl px-2.5 md:px-20">
            {children}
        </div>
    )
}
