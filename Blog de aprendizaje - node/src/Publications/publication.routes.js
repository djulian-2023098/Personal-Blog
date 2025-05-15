import { Router } from "express";
import { addPublication, deletePublication, getAll, getPublicationsbyCourse, test, updatePublication } from "./publication.controller.js";

const api = Router()

api.get('/test', test)
api.get('/getAll', getAll)
api.get('/filter/:course', getPublicationsbyCourse)
api.post('/save', addPublication)
api.put('/update/:id', updatePublication)
api.delete('/delete/:id', deletePublication)

export default api