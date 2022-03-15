import { dbContext } from '../db/DbContext'
import { BadRequest } from "../utils/Errors"
class ProjectsService {

  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator')
    return projects
  }

  async getOne(id) {
    const project = await dbContext.Projects.findById(id).populate('creator')
    return project
  }
  async create(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator')
    return project
  }


  async remove(id, userId) {
    const project = await this.getOne(id)
    if (project.creatorId.toString() !== userId) {
      throw new BadRequest('not your project!')
    }
    await dbContext.Projects.findOneAndRemove({ _id: id })
  }
}
export const projectsService = new ProjectsService()