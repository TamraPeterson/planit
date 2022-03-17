import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import Pop from "../utils/Pop"




class ProjectService {

  async getAllProjects() {
    const res = await api.get('api/projects')
    logger.log('get all projects', res.data)
    AppState.projects = res.data
  }
  async getProject(id) {
    const res = await api.get('api/projects/' + id)
    logger.log('getproject by id', res.data)
    AppState.project = res.data

  }

  async create(projectData) {
    const res = await api.post('api/projects', projectData)
    logger.log('creating project', res.data)
    AppState.projects.push(res.data)
    return res.data
  }

  async deleteProject(id) {
    try {
      if (await Pop.confirm("Are you sure you want to delete this project?", "warning", "yes"))
        await api.delete('api/projects/' + id)
      AppState.projects = AppState.projects.filter(p => p.id === id)
      this.getAllProjects()
    } catch (error) {
      logger.log('deleted')
    }
  }
}

export const projectService = new ProjectService()