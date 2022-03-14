import { Auth0Provider } from "@bcwdev/auth0provider"
import { projectsService } from "../services/ProjectsService"
import BaseController from '../utils/BaseController'


export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get('/:id', this.getOne)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const project = await projectsService.getAll({ creatorId: req.userInfo.id })
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await projectsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }


}