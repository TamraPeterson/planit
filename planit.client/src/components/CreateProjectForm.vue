<template>
  <div class="">
    <form @submit.prevent="createProject">
      <div class="mb-3">
        <label for="title" class="form-label">Project Name:</label>
        <input
          v-model="state.editable.name"
          type="name"
          class="form-control"
          id="project-name"
        />
      </div>
      <div class="mb-3">
        <label for="description 1" class="form-label"
          >Project Description:</label
        >
        <input
          v-model="state.editable.description"
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
import { reactive } from "@vue/reactivity";
import { projectService } from "../services/ProjectService"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";

export default {
  setup() {
    const state = reactive({
      editable: {}
    })
    return {
      state,
      async createProject() {
        try {
          await projectService.create(state.editable);
          state.editable = {};
          Modal.getOrCreateInstance(
            document.getElementById("project-modal")
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