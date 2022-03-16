<template>
  <div class="row">
    <div class="col-7">
      <input class="form-check-input me-3" type="checkbox" value="" />
      {{ task.name }}
    </div>
    <div class="col-3">Difficulty: {{ task.weight }}</div>
    <div class="col-2 d-flex flex-row justify-content-between">
      <i
        class="mdi mdi-note selectable"
        data-bs-toggle="rightoffcanvas"
        data-bs-target="#rightoffcanvas"
      ></i>
      <i
        class="mdi mdi-delete selectable"
        title="Notes"
        data-bs-toggle="rightoffcanvas"
        data-bs-target="#rightoffcanvas"
      ></i>
    </div>
    <RightOffCanvas id="notescanvas">
      <template #rightoffcanvas-header>Notes</template>
      <template #rightoffcanvas-body>Whats up bruh</template>
    </RightOffCanvas>

    <Modal>
      <template #modal-title>New Project</template>
      <template #modal-body><CreateProjectForm /></template>
    </Modal>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },

  },

  setup(props) {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
</style>