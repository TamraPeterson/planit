import { Auth0Provider } from "@bcwdev/auth0provider"
import { sprintsService } from "../services/SprintsService"
import BaseController from '../utils/BaseController'


export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('', this.getAll)
      // .get('/:id', this.getOne)
      .post('', this.create)
    // .delete('/:id', this.remove)
  }

  // async getAll(req, res, next) {
  //   try {
  //     const sprints = await sprintsService.getAll({ creatorId: req.userInfo.id })
  //     return res.send(sprints)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  // async getOne(req, res, next) {
  //   try {
  //     const sprint = await sprintsService.getOne(req.params.id)
  //     return res.send(sprint)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await sprintsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  // async remove(req, res, next) {
  //   try {
  //     await sprintsService.remove(req.params.id, req.userInfo.id)
  //     return res.send('deleted')
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}