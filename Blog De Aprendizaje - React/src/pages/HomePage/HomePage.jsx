import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import { publicationRequest } from '../../services/api';

export const HomePage = () => {
  const [publications, setPublications] = useState([])

  useEffect(() => {
    const fetchPublications = async () => {
      const data = await publicationRequest()
      console.log('Received publications:', data)
      setPublications(data)
    }

    fetchPublications()
  }, [])

  return (
    <div className='page-container'>
      <center><h1>Personal Blog</h1></center>
      <div className='publications-containter'>
        {publications.length > 0 ? (
          <ul>
            {publications.map((pub) => (
              <li key={pub._id} className='publication-style'>
                <strong>{pub.title}</strong>: {pub.description}. <strong>course:</strong> ({pub.course})
                <br />
                <Link to={`/publication/${pub._id}`}>Comments</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No publications found.</p>
        )}
      </div>
    </div>
  )
}
