import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



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
}

export const projectService = new ProjectService()