import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getTasks(id) {
    const res = await api.get('api/projects/' + id + '/tasks')
    logger.log('get tasks', res.data)
    AppState.tasks = res.data
  }
  async create(taskData) {
    const res = await api.post('api/projects/' + taskData.projectId + '/tasks', taskData)
    logger.log('creating task', res.data)
    AppState.tasks.push(res.data)
    return res.data
  }
}

export const tasksService = new TasksService()