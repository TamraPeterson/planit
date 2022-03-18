import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import Pop from "../utils/Pop"

class NotesService {

  async createNote(body, projectId) {
    logger.log('create notes in service', body, projectId)
    const res = await api.post('api/projects/' + projectId + '/notes', body)
    logger.log('create note', res.data)
    this.getNotes(projectId)
  }

  async getNotes(id) {
    const res = await api.get('api/projects/' + id + '/notes')
    logger.log('get notes', res.data)
    AppState.notes = res.data
  }
  async deleteNote(note) {
    if (await Pop.confirm("are you sure?")) {
      await api.delete('api/projects/' + note.projectId + '/notes/' + note.id)
      AppState.notes = AppState.notes.filter(n => n.id != note.id)
      this.getNotes(note.projectId)
    }
  }

}

export const notesService = new NotesService()