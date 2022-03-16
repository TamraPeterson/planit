<template>
  <div class="text-primary">
    <div class="row">
      <div class="col-10">
        <h5>
          {{ sprint.name }}
        </h5>
      </div>
      <div class="col-4"><p>Total Weight:</p></div>
    </div>
    <div class="list-group" v-for="t in tasks" :key="t.id">
      <Task :task="t" />
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
// input[type="checkbox"]:checked {
//   text-decoration: line-through;
// }
</style>