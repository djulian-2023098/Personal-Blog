import { Router } from "express";
import { addComment, deleteComment, getAll, getCommentsByPublication, updateComment } from "./comment.controller.js";

const api = Router()

api.get('/getAll', getAll)
api.get('/getOne/:publicationId', getCommentsByPublication)
api.post('/save', addComment)
api.put('/update/:id', updateComment)
api.delete('/delete/:id', deleteComment)

export default api