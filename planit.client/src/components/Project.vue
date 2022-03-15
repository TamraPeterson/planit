<template>
  <h5 class="selectable p-3" @click="goTo">{{ project.name }}</h5>
  <h5 class="p-3">{{ new Date(project.createdAt).toLocaleString() }}</h5>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { router } from "../router"
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      goTo() {
        router.push({ name: "Project", params: { id: props.project.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>