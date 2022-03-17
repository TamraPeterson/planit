<template>
  {{ note.body }}
</template>


<script>
import { computed } from "@vue/reactivity"
export default {
  props: {

    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      notes: computed(() => AppState.notes.filter(n => n.projectId == props.note.id)),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>