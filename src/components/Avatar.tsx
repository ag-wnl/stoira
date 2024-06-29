import Image from "next/image"
import Link from "next/link";
import * as React from 'react';

type ProfileImageProps = {
    src?: string | null,
    username?: string | null,
    className?: string,
}

export default function Avatar({src, username, className=""} : ProfileImageProps) {
    return (
        <Link
        href={username ? `/user/${username}` : `#`}>
            <div className={`relative h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full ${className}`}>
                {(src == null) ? null : <Image src={src} alt={"Profile Image"} quality={100} fill/>}
            </div>
        </Link>
    )
}

export function AvatarSmaller({src, username, className=""} : ProfileImageProps) {
    return (
        <Link
        href={`/user/${username}`}>
            <div className={`relative h-6 w-6 md:h-8 md:w-8 overflow-hidden rounded-full ${className}`}>
                {(src == null) ? null : <Image src={src} alt={"Profile Image"} quality={100} fill/>}
            </div>
        </Link>
    )
}