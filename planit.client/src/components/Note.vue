<template>
  <!-- TODO Style me bro -->
  {{ note.body }}
  <img class="img-fluid rounded" :src="note.creator.picture" alt="" />
  {{ note.creator.name }}
  <i class="mdi mdi-delete selectable" @click="deleteNote"></i>
</template>


<script>
import { computed } from "@vue/reactivity"
import { notesService } from "../services/NotesService"
import { logger } from "../utils/Logger"
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      notes: computed(() => AppState.notes.filter(n => n.projectId == props.note.id)),
      async deleteNote(id) {
        logger.log("deleting note", id)
        await notesService.deleteNote(props.note);

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>