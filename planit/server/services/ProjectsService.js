import { dbContext } from '../db/DbContext'
class ProjectsService {

  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator')
    return projects
  }
  async create(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator')
    return project
  }
}

export const projectsService = new ProjectsService()