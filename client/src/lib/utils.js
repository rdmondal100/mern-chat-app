import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { io } from 'socket.io-client'
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const socket = io('http://localhost:5000')

export const currentTime = () => new Date().toISOString().replace('Z', '+00:00');


export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
