import React from "react";
import { CTX } from "./Store";
import { makeStyles } from "@material-ui/core/styles";
import {
    CardHeader,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Chip,
    Button,
    TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5),
    },
    flex: {
        display: "flex",
        alignItems: "center"
    },
    topicsWindow: {
        width: "30%",
        height: 300,
        borderRight: "1px solid grey"
    },
    chatWindow: {
        width: "70%",
        height: 300,
        padding: theme.spacing(2)
    },
    chatbox: {
        width: "85%",
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1)
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [message, setMessage] = React.useState("");
    const {allChats, sendChat, user} = React.useContext(CTX);

    const topics = Object.keys(allChats); 

    const [activeTopic, setActiveTopic] = React.useState(topics[0]);

    const handleClick = () => {
        sendChat({from: user, text: message, topic: activeTopic});
        setMessage("");
    }

    return (
        <Paper className={classes.root}>
            <CardHeader
                title="Chat App" 
                subheader={activeTopic}
            />

            <div className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <List>
                        {
                            topics.map((topic, i) => (
                                <ListItem key={i} button onClick={e => setActiveTopic(e.target.innerText)}>
                                    <ListItemText primary={topic} />
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
                <div className={classes.chatWindow}>
                    {
                        allChats[activeTopic].map((msg, i) => (
                            <div key={i} className={classes.flex}>
                                <Chip label={msg.from} className={classes.chip} />
                                <Typography variant="body1">{msg.text}</Typography>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={classes.flex}>
                <TextField
                    variant="outlined"
                    label="Message"
                    placeholder="Message"
                    value={message}
                    className={classes.chatbox}
                    onChange={e => {
                        e.preventDefault();
                        setMessage(e.target.value);
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleClick}
                >
                    Send
                </Button>
            </div>
        </Paper>
    );
}