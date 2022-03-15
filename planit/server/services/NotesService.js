import { dbContext } from '../db/DbContext'
import { BadRequest } from "../utils/Errors"
class NotesService {

  async getAll(projectId) {
    const notes = await dbContext.Notes.find({ projectId }).populate('creator')

    return notes
  }

  async getOne(id) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id Yo')
    }
    return note
  }
  async create(newNote) {
    const project = await dbContext.Projects.findById(newNote.projectId)
    if (project.creatorId.toString() !== newNote.creatorId) {
      throw new BadRequest('not your project')
    }
    const note = await dbContext.Notes.create(newNote)
    await note.populate('creator', 'name picture')
    return note
  }


  async remove(id, userId) {
    const note = await this.getOne(id)
    if (note.creatorId.toString() !== userId) {
      throw new BadRequest('not your note!')
    }
    await dbContext.Notes.findOneAndRemove({ _id: id })
  }
}
export const notesService = new NotesService()