import { Card } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./post-cards.component.styled.module.css";
import globalStyles from "../../../styles/globals.module.css"
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../requests";
import { PostCardComponentTypes, PostType } from "./post-cards.component.types";
import { observer } from "mobx-react-lite";
import { GlobalState } from "../../mobx/globalState";
import { GlobalStateContext } from "../../mobx/store";

const PostCardsComponent = observer(({
}: PostCardComponentTypes) => {

    const [posts, setPosts] = useState<PostType[]>([])
    const globalState = useContext(GlobalStateContext);

    useEffect(
        () => {

            if(globalState.refreshPosts === true){
                getPosts()
                .then(data => setPosts(data))
                .catch(e => console.log(e))
                .finally(() => globalState.setRefreshPosts(false))
            }

        },
        [globalState.refreshPosts]
    )

    useEffect(
        () => {
            getPosts()
            .then(data => setPosts(data))
            .catch(e => console.log(e))
        },
        []
    )

    return (
        <div className={styles.main}>
            {
                posts ?
                <>
                    {
                        posts.map((m, index) => {
                            return(
                                <div
                                    className={`${globalStyles.centerOnLine} ${styles.card}`}
                                    key={index}
                                >
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {m.userRef.name}
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    component="div"
                                                >
                                                    {m.text}
                                                </Typography>
                                            </CardContent>
                                            <div
                                                style={{
                                                    borderBottom: '1px solid black'
                                                }}
                                            />
                                            <CardContent>
                                                <Typography 
                                                    variant="body2" 
                                                    color="primary"
                                                    component="div"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end'
                                                    }}
                                                >
                                                    Created at: {`${new Date(m.updatedAt).getDate()}/${new Date(m.updatedAt).getUTCMonth() + 1}/${new Date(m.updatedAt).getFullYear()} ${new Date(m.updatedAt).getHours()}:${new Date(m.updatedAt).getMinutes()}:${new Date(m.updatedAt).getSeconds()}`}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        {/* <CardActions>
                                            <Button size="small" color="primary">
                                                Share
                                            </Button>
                                        </CardActions> */}
                                    </Card>
                                </div>
                            )
                        })
                    }
                </>
                :
                <></>

            }
        </div>
    )
})

export default PostCardsComponent;