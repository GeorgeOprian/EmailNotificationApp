import { Box, Card, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { GlobalStateContext } from "../../mobx/store";
import { fetchEmails, getUser } from "../../requests";
import { DisplayEmailsComponentTypes } from "./display-emails.component.types";
import globalStyles from "../../../styles/globals.module.css"
import styles from "../post-cards/post-cards.component.styled.module.css";
import { useSession } from "next-auth/react";
import { UserType } from "../post-cards/post-cards.component.types";

const DisplayEmailsComponent = observer(() => {

    const globalState = useContext(GlobalStateContext);
    const [userEmails, setUserEmails] = useState<DisplayEmailsComponentTypes[]>()
    const { data: session } = useSession();
    const [loggedUser, setLoggedUser] = useState<UserType>()

    useEffect(
        () => {
            if(!session?.user?.id) return;

            getUser(session?.user?.email!)
            .then((data) => {
                setLoggedUser(data)
            })
            .catch(e => console.log(e))
        },
        [session?.user?.id]
    )

    useEffect(
        () => {
          if(loggedUser === undefined) return
          if(loggedUser.userRefId === undefined) return
      
          fetchEmails(loggedUser.userRefId)
          .then((data) => setUserEmails(data))
        },
        [loggedUser]
      )

    return(
        <div>
            {
                userEmails ?
                    userEmails.map((m, index) => (
                        <div
                            className={`${globalStyles.centerOnLine} ${styles.card}`}
                            key={index}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {m.subject}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        component="div"
                                    >
                                        {m.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                :
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
                                Nu sunteti logat!
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            }
        </div>
    )
})

export default DisplayEmailsComponent;