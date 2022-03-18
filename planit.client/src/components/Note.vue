<template>
  <!-- TODO Style me bro -->
  {{ note.body }}
  <img class="img-fluid rounded" :src="note.creator.picture" alt="" />
  {{ note.creator.name }}
  <i
    v-if="account.id == note.creatorId"
    class="mdi mdi-delete selectable"
    @click="deleteNote"
    title="delete"
  ></i>
</template>


<script>
import { computed } from "@vue/reactivity"
import { notesService } from "../services/NotesService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),

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