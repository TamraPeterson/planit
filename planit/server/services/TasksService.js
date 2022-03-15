import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from "../utils/Errors"
class TasksService {

  async getAll(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId }).populate('creator')
    return tasks
  }

  async getOne(id) {
    const task = await dbContext.Tasks.findById(id).populate('creator')
    if (!task) {
      throw new BadRequest('Invalid Id Yo')
    }
    return task
  }
  async create(newTask) {
    const project = await dbContext.Projects.findById(newTask.projectId)
    if (project.creatorId.toString() !== newTask.creatorId) {
      throw new BadRequest('not your project')
    }
    const task = await dbContext.Tasks.create(newTask)

    await task.populate('creator', 'name picture')
    return task
  }


  async remove(id, userId) {
    const task = await this.getOne(id)
    if (task.creatorId.toString() !== userId) {
      throw new BadRequest('not your task!')
    }
    await dbContext.Tasks.findOneAndRemove({ _id: id })
  }

  async update(body) {
    const originalTask = await this.getOne(body.id)
    if (originalTask.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('Get outta town')
    }
    originalTask.isComplete = body.isComplete ? body.isComplete : originalTask.isComplete
    originalTask.sprintId = body.sprintId ? body.sprintId : originalTask.sprintId
    await originalTask.save()
    return originalTask
  }
}
export const tasksService = new TasksService()