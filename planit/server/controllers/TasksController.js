import { Auth0Provider } from "@bcwdev/auth0provider"
import { tasksService } from "../services/TasksService"
import BaseController from '../utils/BaseController'


export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.remove)
      .put('/:id', this.update)
  }

  async getAll(req, res, next) {
    try {
      const tasks = await tasksService.getAll(req.params.projectId)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const task = await tasksService.getOne(req.params.id)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const create = await tasksService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await tasksService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.update(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

}