"use client"

import { SessionProvider } from "next-auth/react";

export default function ProviderWrapper({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <SessionProvider>
            {children} {/* Our entire app has access to NextAuth */}
        </SessionProvider>
    )
}