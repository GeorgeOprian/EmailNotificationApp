import { DefaultSession } from "next-auth";

export function UserCardComponent ({
    user
}: {
    user: DefaultSession["user"]
}) {

    return (
        <>
            <div>Current Logged In User</div>
            <div>
                <div>Name: {user?.name}</div>
                <div>Email {user?.email}</div>
            </div>
        </>
    )

}