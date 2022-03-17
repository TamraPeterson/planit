import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
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


  async deleteSprint(sprint) {
    try {
      if (await Pop.confirm("Are you sure you want to delete this project?", "warning")) {
        await api.delete('api/projects/' + sprint.projectId + '/sprints/' + sprint.id)

        AppState.sprints = AppState.sprints.filter(s => s.id != sprint.id)
        this.getSprints(id)
      }
    } catch (error) {
      logger.log('error in delete')
    }
  }
}

export const sprintsService = new SprintsService()