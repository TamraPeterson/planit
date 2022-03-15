import { Auth0Provider } from "@bcwdev/auth0provider"
import { notesService } from "../services/NotesService"

import BaseController from '../utils/BaseController'


export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.getAll(req.params.projectId)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const note = await notesService.getOne(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const create = await notesService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await notesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }

}