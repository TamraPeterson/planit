<template>
  <div class="container-fluid">
    <div class="row justify-content-center p-5">
      <div class="col-md-8 shadow text-primary">
        <h3 class="text-center p-2">{{ project.name }}</h3>
        <p class="text-center">{{ project.description }}</p>
      </div>
      <div class="row justify-content-center">
        <div class="col-3 text-center p-3">
          <button class="btn btn-primary">Add Sprint</button>
        </div>
      </div>
      <div class="row justify-content-center p-3">
        <div class="col-8">
          <div class="sprints shadow p-3">
            <Sprint />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectService } from "../services/ProjectService"
import { sprintsService } from "../services/SprintsService"

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        if (route.name == "Project") {
          await projectService.getProject(route.params.id)
        }
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      };
      try {
        await sprintsService.getSprints(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      project: computed(() => AppState.project),
      sprint: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>