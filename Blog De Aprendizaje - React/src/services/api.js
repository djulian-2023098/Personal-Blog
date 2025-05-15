import axios from "axios"

const apiPublication = axios.create(
    {
        baseURL: 'http://localhost:2636',
        timeout: 2000
    }
)

export const publicationRequest = async () => {
    try {
        const response = await apiPublication.get('/publication/getAll')
        return response.data
    } catch (error) {
        console.error("Error fetching publications:", error)
        return []
    }
}

export const getCommentsByPublication = async(publicationId)=>{
    try {
        const res = await apiPublication.get(`/comment/getOne/${publicationId}`)
        return res.data
    } catch (error) {
        console.error("Error fetching comments", error)
        return []
    }
}

export const publicationFilter = async(course)=>{
    try {
        const res = await apiPublication.get(`/publication/filter/${course}`)
        return res.data
    } catch (error) {
        
    }
}

export const addComment = async(commentData)=>{
    try {
        const res = await apiPublication.post('/comment/save', commentData)
        return res.data
    } catch (error) {
        console.error("Error fetching comments", error)
        return []
    }
}

export const updateComment = async(id, commentData)=>{
    try {
        const res = await apiPublication.put(`/comment/update/${id}`, commentData)
        return res.data
    } catch (error) {
        console.error("Error fetching comments", error)
        return []
    }
}

export const deleteComment = async(id)=>{
    try {
        const res = await apiPublication.delete(`/comment/delete/${id}`)
        return res.data
    } catch (error) {
        console.error("Error fetching comments", error)
        return []
    }
}