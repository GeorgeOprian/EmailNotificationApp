import { Button, CircularProgress, Grid, TextareaAutosize, Typography } from "@mui/material";
import { Container, fontFamily } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../mobx/globalState";
import { GlobalStateContext } from "../../mobx/store";
import { createPost, getUser } from "../../requests";
import { UserType } from "../post-cards/post-cards.component.types";
import { CreatePostComponentTypes } from "./create-post.component.types";

const CreatePostComponent = observer(({
}: CreatePostComponentTypes) => {

    const { data: session } = useSession();
    const [user, setUser] = useState<UserType>()
    const [text, setText] = useState<string>()
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const globalState = useContext(GlobalStateContext);

    useEffect(
        () => {
            if(!session?.user?.id) return;

            getUser(session?.user?.email!)
            .then((data) => {
                setUser(data)
            })
            .catch(e => console.log(e))
        },
        [session?.user?.id]
    )

    const createAction = () => {

        if(!user) return;
        if( text && text.length > 0) {
            setIsCreating(true)

            createPost(user?._id, text)
            .then(() => {})
            .catch(e => {
                console.log(e)
                setIsCreating(false)
            })
            .finally(() => {
                setIsCreating(false)
                globalState.setIsOpenModal(false)
                globalState.setRefreshPosts(true)
            })
        }
        
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                }}
            >
                <Typography
                    variant="h5"
                >
                    Create Post
                </Typography>
            </div>
            <TextareaAutosize 
                onChange={(e) => setText(() => e.target.value)}  
                style={{
                    height: '10rem',
                    width: '100%',
                    border: '0.2rem solid black',
                    fontFamily: 'sans-serif',
                    fontSize: '1.5rem',
                    padding: '0.3rem'
                }}
                placeholder="Write here"
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    onClick={createAction}
                    variant="text"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    {
                        isCreating ?
                            <CircularProgress />
                            :
                            'Create'
                    }
                </Button>
                <Button
                    onClick={() => globalState.setIsOpenModal(false)}
                    variant="text"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Close
                </Button>
            </div>
        </div>

        
    )
})

export default CreatePostComponent;