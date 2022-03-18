import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
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
  async deleteTask(task) {
    if (await Pop.confirm("are you sure?")) {
      await api.delete('api/projects/' + task.projectId + '/tasks/' + task.id)
      AppState.tasks = AppState.tasks.filter(t => t.id != task.id)
      this.getTasks(task.projectId)
    }
  }

  async updateTask(task) {
    const res = await api.put('api/projects/' + task.sprintId + '/tasks/' + task.id, task)
    logger.log('assignTask', res.data)
    const index = AppState.tasks.findIndex(t => t.id == task.id)
    AppState.tasks.splice(index, 1, res.data)
    // TODO SPLICE
  }
}

export const tasksService = new TasksService()