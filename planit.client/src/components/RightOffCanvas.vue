//Child of Task.vue
<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <button
      type="button"
      class="btn-close text-reset text-center"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
    <div>
      <h5>Move to a new Sprint</h5>
      <select v-model="state.editable.sprintId" @change="moveTask">
        <option v-for="s in sprints" :key="s.id" :value="s.id">
          {{ s.name }}
        </option>
      </select>
    </div>
    <div class="offcanvas-header p-3">
      <h5 id="rightoffcanvasRightLabel " class="p-3">Notes for {{}}</h5>
    </div>
    <div class="offcanvas-body">
      What is up create a note

      <form @submit.prevent="createNote">
        <div class="mb-3">
          <label for="body" class="form-label">Body</label>
          <input
            v-model="state.editable.body"
            type="body"
            class="form-control"
            id="note-body"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="p-5 text-start">
        <ul>
          <li v-for="n in notes" :key="n.id">
            <Note :note="n" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { notesService } from "../services/NotesService";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { tasksService } from "../services/TasksService";

export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
    // note: {
    //   type: Object,
    //   required: true
    // }
  },
  setup(props) {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Project") {
          await notesService.getNotes(route.params.id)

        }
        state.editable = { ...props.task }
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      };
    })
    const state = reactive({
      editable: {

      }
    })
    return {
      state,
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes),
      sprints: computed(() => AppState.sprints),


      async createNote() {
        try {
          await notesService.createNote(state.editable, route.params.id);
          logger.log('note creation')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async moveTask() {
        try {
          await tasksService.updateTask(state.editable)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}

</script>


<style lang="scss" scoped>
</style>