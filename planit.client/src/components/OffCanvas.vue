<template>
  <div class="off-canvas">
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Your Projects</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <h6 v-for="p in projects" :key="p.id">
          <Project :project="p" />
        </h6>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { router } from "../router"
export default {
  setup() {
    return {
      projects: computed(() => AppState.projects),
      goTo() {
        router.push({ name: "Project", params: { id: props.project.id } })
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>