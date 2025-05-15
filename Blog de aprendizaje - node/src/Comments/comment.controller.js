'use strict'

import Comments from './comment.model.js'

export const getAll = async(req, res)=>{
    try {
        const comments = await Comments.find()
        return res.send(comments)
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error getting comments'})
    }
}

export const getCommentsByPublication = async (req, res) => {
  try {
    const { publicationId } = req.params
    const comments = await Comments.find({ publication: publicationId })
    return res.status(200).send(comments)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error getting comments by publication' })
  }
}


export const addComment = async(req,res)=>{
    try {
        let data = req.body
        let comments = new Comments(data)
        await comments.save()
        return res.status(200).send({message: 'Comment added successfuly'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error adding a comment'})
    }
}

export const updateComment = async(req, res)=>{
    try {
        let data = req.body
        let {id} = req.params
        let update = (data, id)

        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing'})

        let updateComment = await Comments.updateOne(
            {_id: id},
            data,
            {new: true}   
        )

        if(!updateComment) return res.status(404).send({message:'Comment not found'})

        return res.status(200).send({message: 'Comment updated successfully'})
    } catch (error) {
        console.error(error)
        return res.status(200).send({message: 'Error updating publication'})
    }
}

export const deleteComment = async(req,res)=>{
    try {
        let {id} = req.params

        let comments = await Comments.findById(id)

        if(!comments) return res.status(404).send({message:'Comment not found'})

        await Comments.deleteOne({_id: id})

        return res.status(200).send({ message: 'Comment deleted successfully.' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting the comment'})
    }
}
