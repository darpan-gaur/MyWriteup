import mysql from "mysql";

export const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "webDev",
    password: "Pass@123",
    database: "writeUP",
})