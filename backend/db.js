import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "webDev",
    password: "Pass@123",
    database: "writeUP",
})