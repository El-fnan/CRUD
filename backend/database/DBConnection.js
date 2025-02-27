import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const query = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connectToDB=()=>{
    query.connect((error) => {
        if (error) {
            console.error("Error Connecting: ", error);
            setTimeout(connectToDB, 5000);
        }
        else {
            console.log("Connected TO DataBase");
        }
    });

    query.on("error", (err) => {
        console.error("Database Error:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("Reconnecting...");
            connectToDB();
        } else {
            throw err;
        }
    });
}

connectToDB();

export default query;