import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { io } from 'socket.io-client'
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const socket = io('https://mern-chat-app-zmxn.onrender.com')

export const currentTime = () => new Date().toISOString().replace('Z', '+00:00');


export const axiosInstance = axios.create({
  baseURL: 'https://mern-chat-app-zmxn.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
