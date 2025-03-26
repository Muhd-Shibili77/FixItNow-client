import { io } from "socket.io-client";
const SOCKET_URL = 'https://api.fixitnow.cfd'

export const socket = io(SOCKET_URL,{
    transports:['websocket'],
    withCredentials:true
})