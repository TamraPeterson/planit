import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async getSprints(id) {
    const res = await api.get('api/projects/' + id + '/sprints')
    logger.log('get sprints', res.data)
    AppState.sprints = res.data
  }
  async create(sprintData, projectId) {
    const res = await api.post('api/projects/' + projectId + '/sprints', sprintData)
    logger.log('creating sprint', res.data)
    AppState.sprints.push(res.data)
    return res.data
  }
}

export const sprintsService = new SprintsService()