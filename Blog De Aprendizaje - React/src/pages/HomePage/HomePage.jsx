import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css';
import { publicationFilter, publicationRequest } from '../../services/api';

export const HomePage = () => {
  const [publications, setPublications] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('all')

    const fetchPublications = async () => {
      const data = await publicationRequest()
      setPublications(data)
    }

     const handleFilterChange = async (e) => {
    const course = e.target.value
    setSelectedCourse(course)

    if (course === 'all') {
      fetchPublications()
    } else {
      const data = await publicationFilter(course)
      setPublications(data)
    }
  }
    useEffect(()=>{
      fetchPublications()
    }, [])

  return (
    <div className='page-container'>
      <center><h1>Personal Blog</h1></center>

      <div className="filter-bar">
        <label htmlFor="course">Filter by course:</label>
        <select id="course" value={selectedCourse} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="TALLER">Taller</option>
          <option value="TECNOLOGÍA">Tecnología</option>
          <option value="PRÁCTICA SUPERVISADA">Práctica Supervisada</option>
        </select>
      </div>
      <div className='publications-containter'>
        {publications.length > 0 ? (
          <ul>
            {publications.map((pub) => (
              <li key={pub._id} className='publication-style'>
                <strong>Title: </strong>{pub.title} <strong>Description: </strong> {pub.description}. <strong>Course:</strong> ({pub.course}) <strong>Date:</strong> {new Date(pub.date).toLocaleDateString()}
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
