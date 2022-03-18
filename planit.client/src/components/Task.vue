<template>
  <div class="row">
    <div class="col-7">
      <input class="form-check-input me-3" type="checkbox" value="" />
      {{ task.name }}
      <i class="mdi mdi-pencil selectable" @click="updateTask"></i>
    </div>
    <div class="col-3">Difficulty: {{ task.weight }}</div>
    <div class="col-2 d-flex flex-row justify-content-between">
      <i
        class="mdi mdi-note selectable"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#notes-canvas-' + task.id"
      ></i>
      <i
        class="mdi mdi-delete selectable"
        @click="deleteTask"
        title="Notes"
      ></i>
    </div>
    <RightOffCanvas :task="task" :id="'notes-canvas-' + task.id">
      <template #offcanvas-header></template>
      <template #offcanvas-body></template>
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
import { tasksService } from "../services/TasksService"
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {

      async deleteTask() {
        await tasksService.deleteTask(props.task)
      },

      async updateTask() {
        await tasksService.updateTask(props.task.id, props.task.sprintId)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>