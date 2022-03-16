import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getTasks(id) {
    const res = await api.get('api/projects/' + id + '/tasks')
    logger.log('get tasks', res.data)
    AppState.tasks = res.data
  }
}

export const tasksService = new TasksService()