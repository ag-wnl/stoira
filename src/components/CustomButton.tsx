import { signIn } from "next-auth/react";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import * as React from 'react';

type ButtonProps = {
    small?: boolean,
    gray?: boolean,
    className?: string,
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


export default function CustomButton({ small = false, gray = false, className = "", ...props }: ButtonProps) {
    const sizeClasses = small ? "px-2 py-1 text-sm" : "px-4 py-2 font-bold";
    const colorClasses = gray ? "bg-gray-600 text-white hover:bg-gray-500 focus-visible:bg-gray-500" : "bg-purple-800 text-white hover:bg-purple-700 focus-visible:bg-purple-700";
    
    return (
        <button className={`rounded-sm bg-opacity-70 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-white ${sizeClasses} ${colorClasses} ${className}`} {...props}></button>
    )
}


export function ToolTipButton({className = "", ...props }: ButtonProps) {
    
    return (
        <button className={`rounded-full px-2 py-1 transition-colors duration-200 text-sm disabled:cursor-not-allowed disabled:opacity-50 text-gray-300 bg-gray-600 text-white hover:bg-gray-500 focus-visible:bg-gray-500 ${className}`} {...props}></button>
    )
}

export function GoogleSignInButton() {
    const handleClick = async() => {
        try {
            await signIn("google")
        } catch (err) {
            console.error("google auth error - ", err)
        }
    }
    return (
        <CustomButton onClick={handleClick}>Sign in using Google</CustomButton>
    )
}

export function Discord() {
    const handleClick = async() => {
        try {
            await signIn("discord")
        } catch (err) {
            console.error("google auth error - ", err)
        }
    }
    return (
        <CustomButton onClick={handleClick}>Sign in using Discord</CustomButton>
    )
}