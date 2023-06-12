import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = req.query.cat ?  "SELECT * FROM posts where cat=?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err,data)=>{
        if (err) return res.status(500).send(err)

        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
}

export const addPost = (req, res) => {
    // check for token
    const  token = req.cookies.access_token
    if (!token) return res.status(401).json("You need to Login")

    // verify token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if (err) return res.status(403).json("Invalid Token")

        const q = "INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data)=>{
            if (err) return res.status(500).json(err)

            return res.json("Post added")
        })

    })
}

export const deletePost = (req, res) => {
    // check for token
    const  token = req.cookies.access_token
    if (!token) return res.status(401).json("You need to Login")

    console.log("Hello")
    // verify token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if (err) return res.status(403).json("Invalid Token")

        const postId = req.params.id
        
        // delete post
        const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?"

        db.query(q, [postId, userInfo.id], (err, data)=>{
            if (err)    return res.status(403).json("You can delete only your posts")

            return res.json("post deleted")
        })
    })
}

export const updatePost = (req, res) => {
    // check for token
    const  token = req.cookies.access_token
    if (!token) return res.status(401).json("You need to Login")

    // verify token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if (err) return res.status(403).json("Invalid Token")

        const postId = req.params.id
        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data)=>{
            if (err) return res.status(500).json(err)

            return res.json("Post updated")
        })

    })
}