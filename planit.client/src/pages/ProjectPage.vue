<template>
  <div class="container-fluid">
    <b
      title="View Other Projects"
      class="
        projects-btn
        btn btn-success
        text-white
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvas"
      ><!-- TODO fix this stupid thing -->
      <i class="mdi mdi-dots-horizontal"></i>
    </b>

    <div class="row justify-content-center p-5">
      <div class="col-md-8 shadow text-primary">
        <h3 class="text-center p-2">
          {{ project.name }}
          <i
            class="mdi mdi-delete selectable p-2"
            @click="deleteProject(project.id)"
          ></i>
        </h3>
        <p class="text-center">{{ project.description }}</p>
      </div>
      <div class="row justify-content-center">
        <div class="col-3 text-center p-3">
          <button
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#sprint-modal"
          >
            Add Sprint
          </button>
        </div>
      </div>
      <div class="row justify-content-center p-3">
        <div class="col-8">
          <div class="sprints shadow p-3" v-for="s in sprints" :key="s.id">
            <Sprint :sprint="s" />
          </div>
        </div>
      </div>
    </div>
    <OffCanvas>
      <template #offcanvas-header>View Your Projects</template>
      <template #offcanvas-body>Whats up bruh</template>
    </OffCanvas>

    <Modal id="sprint-modal">
      <template #modal-title>Add a Sprint</template>
      <template #modal-body><CreateSprintForm /></template>
    </Modal>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute, useRouter } from "vue-router"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectService } from "../services/ProjectService"
import { sprintsService } from "../services/SprintsService"
import { tasksService } from "../services/TasksService"


export default {

  setup() {
    const route = useRoute();
    const router = useRouter()
    // FIXME why doesn't onmounted work? WatchEffect!
    onMounted(async () => {
      try {
        if (route.name == "Project") {
          await projectService.getProject(route.params.id)
          await tasksService.getTasks(route.params.id)
          await sprintsService.getSprints(route.params.id)
        }
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      };
    })
    return {
      project: computed(() => AppState.project),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      async deleteProject(id) {
        logger.log("deleting from deleter", id)
        await projectService.deleteProject(id);
        router.push({ name: 'Home' })
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.create-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  top: 12vh;
  left: 5vh;
}
.projects-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  top: 12vh;
  left: 5vh;
}
</style>