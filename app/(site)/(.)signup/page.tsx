"use client";
import React from 'react'
import SignUp from '@/app/ui/components/auth/SignupPage'
import Modal from '@/app/ui/components/structural/Modal';

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}


const SignInModal = (props: Props) => {

    return (
        <div className="min-h-screen">
            <Modal>
                <SignUp error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl} />
            </Modal>
        </div>
    )
}

export default SignInModal