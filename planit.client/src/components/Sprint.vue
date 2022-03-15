<template>
  <div class="text-primary">
    <div class="row">
      <div class="col-8"><h5>I'm a sprint</h5></div>
      <div class="col-4"><p>Weight</p></div>
    </div>
    <div class="list-group">
      <label class="list-group-item" v-for="t in tasks" :key="t.id">
        <Task :task="t" />
      </label>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      task: computed(() => AppState.tasks)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>