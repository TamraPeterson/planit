<template>
  <h5 class="selectable p-3" @click="goTo">{{ project.name }}</h5>
  <h5 class="p-3">{{ new Date(project.createdAt).toLocaleString() }}</h5>
  <h5>
    <i class="mdi mdi-delete selectable" @click="deleteProject(project.id)"></i>
  </h5>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { router } from "../router"
import { projectService } from "../services/ProjectService"
import { logger } from "../utils/Logger"
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
      },
      deleteProject(id) {
        logger.log("deleting from deleter", id)
        projectService.deleteProject(id);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>