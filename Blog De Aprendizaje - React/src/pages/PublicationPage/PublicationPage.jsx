import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addComment, deleteComment, getCommentsByPublication, updateComment } from '../../services/api'
import { Link } from 'react-router-dom'
import "./PublicationPage.css"

export const PublicationPage = () => {
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [username, setUsername] = useState('')

  const fetchComments = async () => {
    try {
      const data = await getCommentsByPublication(id)
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  useEffect(()=>{
    fetchComments()
  }, [])


  const handleAddComment = async()=>{
    try {
      if(!newComment.trim() || !username.trim())return alert("fill in all fields")
      await addComment({username: username, description: newComment, publication: id})
      setNewComment('')
      setUsername('')
      fetchComments()
    } catch (error) {
      console.error("Error adding comment", error)
    }
  }

  const handleUpdate = async(commentId)=>{
    try {
      const updateText = prompt('Edit your comment')
      if(!updateText) return
        try {
          await updateComment(commentId, {description: updateText})
          fetchComments()
        } catch (error) {
          
        }
    } catch (error) {
      console.error("Error updating comment", error)
    }
  }

  const handleDelete = async(commentId)=>{
    try {
      await deleteComment(commentId)
      fetchComments()
    } catch (error) {
      console.error("Error updating comment", error)
    }
  }

  return (
    <div>
      <h2>Comments</h2>
      <div className='add-container'>
        <input 
          type="text" 
          value={username}
          placeholder='Write an username'
          onChange={(e)=>setUsername(e.target.value)}
        />
        <br />
        <input
          type='text'
          value={newComment}
          placeholder='Write a comment'
          onChange={(e)=>setNewComment(e.target.value)}
        />
        <br />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div className='comment-container'>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id} className='comment-style'>
              <strong>{comment.username}</strong>: {comment.description} <strong> Date: </strong>{new Date(comment.date).toLocaleDateString()}
              <br />
              <button onClick={()=> handleUpdate(comment._id)}>Edit</button>
              <button onClick={()=> handleDelete(comment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments for this publication.</p>
      )}
      </div>
      <Link to={`/`}>Return</Link>
      <br />
    </div>
  )
}
