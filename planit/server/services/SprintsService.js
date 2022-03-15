import { dbContext } from '../db/DbContext'
import { BadRequest } from "../utils/Errors"
class SprintsService {

  // async getAll(query = {}) {
  //   const sprints = await dbContext.Sprints.find(query).populate('creator')
  //   return sprints
  // }

  // async getOne(id) {
  //   const sprint = await dbContext.Sprints.findById(id).populate('creator')
  //   return sprint
  // }
  async create(newSprint) {
    const sprint = await dbContext.Sprints.create(newSprint)
    await sprint.populate('project', 'name')
    return sprint
  }


  // async remove(id, userId) {
  //   const sprint = await this.getOne(id)
  //   if (sprint.creatorId.toString() !== userId) {
  //     throw new BadRequest('not your sprint!')
  //   }
  //   await dbContext.Projects.findOneAndRemove({ _id: id })
  // }
}
export const sprintsService = new SprintsService()