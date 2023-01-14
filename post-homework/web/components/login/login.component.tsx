"use client"
import { Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginComponent = ({

}) => {

    const { data: session } = useSession();

    if(session) {
        return (
            <div>
                <Typography
                    fontWeight="bold"
                    component="div"
                    onClick={() => signOut()}
    
                >
                    LogOut
                </Typography>
                {/* <UserCardComponent user={session.user} /> */}
            </div>
        )
    } else {
        return (
            <div>
                <Typography
                    fontWeight="bold"
                    component="div"
                    onClick={() => signIn()}
    
                >
                    LogIn
                </Typography>
            </div>
        )
    }
}

export default LoginComponent;