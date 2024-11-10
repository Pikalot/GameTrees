"use client";
import React from 'react'
import Signin from '@/app/ui/components/auth/signin'

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}


const Page = (props: Props) => {

    return (
        <div className='flex justify-center items-center mt-[20em]'>
            <div className='w-full w-3/4 sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg'>
                <Signin
                    error={props.searchParams?.error}
                    callbackUrl={props.searchParams?.callbackUrl}
                />
            </div>
        </div>
    )
}

export default Page