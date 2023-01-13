import styles from "./navbar.component.styled.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LoginComponent from "../login/login.component";
import { useContext } from "react";
import { NavbarComponentType } from "./navbar.component.types";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { GlobalStateContext } from "../../mobx/store";
import { useSession } from "next-auth/react";

const NavbarComponent = observer(({
    
}: NavbarComponentType) => {

    const { data: session } = useSession();

    const globalState = useContext(GlobalStateContext);

    return (
        <Paper 
            elevation={3} 
            className={`${styles.navbarWidth} `}
        >   
            <div className={`${styles.navbarStyle}`}>
                <div>
                    <Button
                        color="primary"
                    >
                        <Link href='/'>
                            <Typography
                                fontWeight="bold"
                                component="div"
                            >
                                Home
                            </Typography>
                        </Link>
                    </Button>
                    {
                        session ?
                            <Button  
                                onClick={() => globalState.setIsOpenModal(true)}
                                color="primary">
                                <Typography
                                    fontWeight="bold"
                                    component="div"
                                >
                                    Create Post
                                </Typography>
                            </Button>
                            :
                            ''
                    }
                </div>
                <div>
                    {
                        session ?
                            <Button  color="primary">
                                <Link href={`/profile`}>
                                    <Typography
                                        fontWeight="bold"
                                        component="div"
                                    >
                                        Profile
                                    </Typography>
                                </Link>
                            </Button>
                            :
                            ''
                    }
                    <Button  color="primary">
                        <LoginComponent />
                    </Button>
                </div>
            </div>
        </Paper>
    )
})

export default NavbarComponent;