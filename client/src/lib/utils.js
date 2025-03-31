import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { io } from 'socket.io-client'
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const socket = io('https://mern-quick-chat-app-server.vercel.app')

export const currentTime = () => new Date().toISOString().replace('Z', '+00:00');


export const axiosInstance = axios.create({
  baseURL: 'https://mern-quick-chat-app-server.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
