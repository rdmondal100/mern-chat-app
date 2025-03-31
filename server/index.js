import 'dotenv/config'
import server from "./app.js"
import connectDb from './config/connectDb.js'
import dotenv from "dotenv";
dotenv.config();


connectDb()
    .then(() => {

        server.on("error", (error) => {
            console.log("Error on server:: ", error)
            process.exit(1)
        })
        const port = process.env.PORT || 5000

        server.listen(port, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    })
    .catch((error) => {
        console.log("Failed to connect db on server::", error)
        process.exit(1)
    })