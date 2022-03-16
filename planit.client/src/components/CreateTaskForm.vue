<template>
  <div class="component">
    <form @submit.prevent="createTask">
      <div class="mb-3">
        <label for="title" class="form-label">Task Name:</label>
        <input
          v-model="state.editable.name"
          type="name"
          class="form-control"
          id="project-name"
        />
      </div>
      <div class="mb-3">
        <label for="description 1" class="form-label">Task Weight:</label>
        <input
          v-model="state.editable.weight"
          type="description"
          class="form-control"
          id="project-description"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { tasksService } from "../services/TasksService";
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const state = reactive({
      editable: {
        projectId: props.sprint.projectId,
        sprintId: props.sprint.id
      }
    })
    return {
      state,
      async createTask() {
        try {
          await tasksService.create(state.editable, route.params.id);
          Modal.getOrCreateInstance(
            document.getElementById(`task-modal-${props.sprint.id}`)
          ).hide();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    }
  },
}
</script>


<style lang="scss" scoped>
</style>