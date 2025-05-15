'use strict'

import Publication from './publication.model.js'

export const test = async(req,res)=>{
    return res.send('The publication route is running')
}

export const getAll = async(req,res)=>{
    try {
        const publication = await Publication.find()
        return res.send(publication)
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error getting publications'})
    }
}

export const addPublication = async(req,res)=>{
    try {
        let data = req.body
        let publication = new Publication(data)
        await publication.save()
        return res.status(200).send({message: 'Publication added successfuly'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error adding a publication'})
    }
}

export const updatePublication = async(req, res)=>{
    try {
        let data = req.body
        let {id} = req.params
        let update = (data, id)

        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing'})

        let updatePublication = await Publication.updateOne(
            {_id: id},
            data,
            {new: true}   
        )

        if(!updatePublication) return res.status(404).send({message:'Publication not found'})

        return res.status(200).send({message: 'Publication updated successfully'})
    } catch (error) {
        console.error(error)
        return res.status(200).send({message: 'Error updating publication'})
    }
}

export const deletePublication = async(req,res)=>{
    try {
        let {id} = req.params

        let publication = await Publication.findById(id)

        if(!publication) return res.status(404).send({message:'Publication not found'})

        await Publication.deleteOne({_id: id})

        return res.status(200).send({ message: 'Publication deleted successfully.' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting the Publication'})
    }
}

export const getPublicationsbyCourse = async (req, res) => {
    try {
      const { course } = req.params
      const publications = await Publication.find({course}).sort({ createdAt: -1 })
      res.send(publications)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }