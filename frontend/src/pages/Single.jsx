import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState([]);

  // setting categories
  const location = useLocation()

  // getting postID from url
  const postID = location.pathname.split("/")[2]

  // get current user
  const {currentUser} = useContext(AuthContext)

  // navifate hook
  const navigate = useNavigate()

  // console.log(cat)

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await axios.get(`/api/posts/${postID}`);
        setPost(res.data);
      }catch(err) {
         console.log(err)
      }
    }
    fetchData();
  }, [postID])

  const handleDelete = async () => {
    try{
      await axios.delete(`/api/posts/${postID}`);
      navigate("/")
    }catch(err) {
       console.log(err)
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username  }</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post} >
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h1>{post.title}</h1>

          {post.desc}

      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single