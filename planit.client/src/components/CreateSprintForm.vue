<template>
  <div>
    <form @submit.prevent="createSprint">
      <div class="mb-3">
        <label for="title" class="form-label">Sprint Name:</label>
        <input
          v-model="state.editable.name"
          type="name"
          class="form-control"
          id="sprint-name"
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
import { sprintsService } from "../services/SprintsService";
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      editable: {}
    })
    return {
      state,
      async createSprint() {
        try {
          await sprintsService.create(state.editable, route.params.id);
          state.editable = {};
          Modal.getOrCreateInstance(
            document.getElementById("sprint-modal")
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