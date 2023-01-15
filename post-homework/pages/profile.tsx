import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UserType } from "../web/components/post-cards/post-cards.component.types";
import { getUser, updateUser } from "../web/requests";

const UserPage = () => {

    const { data: session } = useSession();
    const [user, setUser] = useState<UserType>()
    const [editUser, setEditUser] = useState<boolean>(false)
    const [editUserInfo, setEditUserInfo] = useState<UserType>({
        _id: user?._id ?? '',
        name: user?.name ?? '',
        email: user?._id ?? '',
        
    })
    const [editDone, setEditDone] = useState<boolean>(true)
    
    useEffect(
        () => {
            if(!session?.user?.id) return;
            if(!editDone) return

            setEditDone(false)

            getUser(session?.user?.email!)
            .then((data) => {
                setUser(data)
                setEditUserInfo(data)
            })
            .catch(e => console.log(e))
        },
        [
            session?.user?.id,
            editDone
        ]
    )

    useEffect(
        () => {
            if(!user) return

            if(editUser === true){
                setEditUserInfo(user)
            }
        },
        [
            editUser,
            user
        ]
    )

    const creatAction = () => {

        updateUser(editUserInfo.name, editUserInfo.email)
        .then(() => {
            setEditUser(false)
        })
        .catch(e => console.log(e))
        .finally(() => setEditDone(true))

    }

    return (
        <div>
            <Box
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    
                }}
            >
                <Card 
                    variant="outlined" 
                    sx={{
                        width: '25vw',
                        height: '40vh',
                    }}
                >
                    <CardContent>
                        <Typography
                            sx={{ 
                                fontSize: 25,
                                textAlign: 'center'
                             }} 
                            color="text.primary" 
                        >
                            User Info:
                        </Typography>
                        <div>
                            <Typography 
                                sx={{ 
                                    fontSize: 25,
                                    textAlign: 'center',
                                    paddingY: '2rem'
                                }} 
                                color="text.secondary" 
                                component='div'
                                gutterBottom
                            >
                                <div>Name:</div>
                                <div>
                                {
                                    editUser ?
                                        <TextField
                                            value={editUserInfo.name}
                                            onChange={(e => setEditUserInfo((state) => ({
                                                ...state,
                                                name: e.target.value
                                            })))}
                                            sx={{
                                                width: '80%'
                                            }}
                                        />
                                        :
                                        <div>{user?.name}</div>
                                }    
                                </div>    
                            </Typography>
                            <Typography 
                                sx={{ 
                                    mb: 1.5,
                                    fontSize: 25,
                                    textAlign: 'center'
                                }} 
                                color="text.secondary"
                                component='div'
                            >
                                <div>Email:</div>
                                <div>
                                    {/* {
                                        editUser ?
                                            <TextField
                                                value={editUserInfo.email}
                                                onChange={(e => setEditUserInfo((state) => ({
                                                    ...state,
                                                    email: e.target.value
                                                })))}
                                                sx={{
                                                    width: '80%'
                                                }}
                                            />
                                            :
                                            <div>{user?.email}</div>
                                    } */}
                                    <div>{user?.email}</div>
                                </div>
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }}
                    >
                        {
                            editUser ?
                            <Button
                                onClick={creatAction}
                                style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    paddingRight: '1rem',
                                }}
                            >
                                Edit
                            </Button>
                            :
                            ''
                        }
                        <Button
                            onClick={() => setEditUser(!editUser)}
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                paddingRight: '1rem',
                            }}
                        >
                            {
                                editUser ?
                                    'Undo'
                                    :
                                    'Edit'
                            }
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    )
}

export default UserPage;