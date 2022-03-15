import { dbContext } from '../db/DbContext'
import { BadRequest } from "../utils/Errors"
class SprintsService {

  async getAll(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId }).populate('creator')

    return sprints
  }

  async getOne(id) {
    const sprint = await dbContext.Sprints.findById(id).populate('creator')
    if (!sprint) {
      throw new BadRequest('Invalid Id Yo')
    }
    return sprint
  }
  async create(newSprint) {
    const project = await dbContext.Projects.findById(newSprint.projectId)
    if (project.creatorId.toString() !== newSprint.creatorId) {
      throw new BadRequest('not your project')
    }
    const sprint = await dbContext.Sprints.create(newSprint)

    await sprint.populate('creator', 'name picture')
    return sprint
  }


  async remove(id, userId) {
    const sprint = await this.getOne(id)
    if (sprint.creatorId.toString() !== userId) {
      throw new BadRequest('not your sprint!')
    }
    await dbContext.Sprints.findOneAndRemove({ _id: id })
  }
}
export const sprintsService = new SprintsService()