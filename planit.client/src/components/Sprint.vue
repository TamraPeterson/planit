<template>
  <div class="text-primary">
    <div class="row p-3">
      <div class="col-8">
        <h5>
          {{ sprint.name }}
        </h5>
      </div>
      <div class="col-3">
        <h5>
          <i title="weight" class="mdi mdi-weight-lifter p-2"></i
          >{{ totalWeight }}
        </h5>
      </div>
      <div class="col-1">
        <h5>
          <i
            v-if="account.id == sprint.creatorId"
            class="mdi mdi-delete selectable p-2"
            title="delete-sprint"
            @click="deleteSprint()"
          ></i>
        </h5>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-center"></div>
      </div>
    </div>
    <div class="list-group text-center" v-for="t in tasks" :key="t.id">
      <Task :task="t" />
    </div>
    <button
      title="add"
      class="btn btn-success"
      data-bs-toggle="modal"
      :data-bs-target="`#task-modal-${sprint.id}`"
    >
      +
    </button>
    <Modal :id="`task-modal-${sprint.id}`">
      <template #modal-title>Add task to: {{ sprint.name }}</template>
      <template #modal-body><CreateTaskForm :sprint="sprint" /></template>
    </Modal>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { sprintsService } from "../services/SprintsService"
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      totalWeight: computed(() => {

        let total = 0

        AppState.tasks.filter(t => t.sprintId == props.sprint.id).forEach(t => total += t.weight)

        return total

      }),
      async deleteSprint() {
        await sprintsService.deleteSprint(props.sprint)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
// input[type="checkbox"]:checked {
//   text-decoration: line-through;
// }
</style>