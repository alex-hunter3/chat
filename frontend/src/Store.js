import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
    general: [],
    python: [],
    javascript: []
}

function reducer(state, action) {
    const { from, text, topic } = action.payload

    switch(action.type) {
        case "RECEIVE MESSAGE": 
            return {
                ...state,
                [topic]: [
                    ...state[action.payload.topic],
                    { from, text }
                ]
            }
        default:
            return state;
    }
}

let socket;
const user = Math.random(100).toFixed(2);

function sendChat(value) {
    socket.emit("message", value);
}

export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(":3001");
        
        socket.on("message", data => dispatch({type: "RECEIVE MESSAGE", payload: data})); 
    }

    return (
        <CTX.Provider value={{allChats, sendChat, user}}>
            {props.children}
        </CTX.Provider>
    );
}