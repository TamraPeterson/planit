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
        data-bs-toggle="modal"
        data-bs-target="#form-modal"
      ></i>
      <i class="mdi mdi-delete selectable"></i>
    </div>
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
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
</style>