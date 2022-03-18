<template>
  <div class="row">
    <div class="col-7">
      <input
        class="form-check-input me-3"
        type="checkbox"
        :checked="task.isComplete"
        value=""
        @click="completeTask()"
      />
      {{ task.name }}
    </div>
    <div class="col-3">Difficulty: {{ task.weight }}</div>
    <div class="col-2 d-flex flex-row justify-content-between">
      <i
        class="mdi mdi-note selectable"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#notes-canvas-' + task.id"
      ></i>
      <i
        v-if="account.id == task.creatorId"
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
      account: computed(() => AppState.account),
      async deleteTask() {
        await tasksService.deleteTask(props.task)
      },

      // async completeTask() {
      //   let task = AppState.tasks.find(t => t.id == props.task.id)
      //   task.isComplete != task.isComplete

      // } 
      // try {
      //     tasksService.completeTask(props.task.id)
      //   } catch (error) {
      //     console.error(error)
      //   }
      completeTask() {
        tasksService.completeTask(props.task)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>