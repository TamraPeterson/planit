import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async getSprints(id) {
    const res = await api.get('api/projects/' + id + '/sprints')
    logger.log('get sprints', res.data)
    AppState.sprints = res.data
  }
}

export const sprintsService = new SprintsService()