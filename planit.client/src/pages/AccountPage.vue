<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <h6>Edit Name</h6>
    <form @submit.prevent="editProfile" action="">
      <div class="col-8 offset-2 my-2">
        <input
          type="text"
          placeholder="name"
          class="form-control"
          v-model="account.name"
        />
      </div>
      <div class="">
        <button type="submit" class="btn btn-primary">edit name</button>
      </div>
    </form>
    <!-- Make a form, call update profile to change name -->
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService"
import { logger } from "../utils/Logger"
export default {
  name: 'Account',
  setup() {


    return {

      account: computed(() => AppState.account),
      async editProfile() {
        logger.log('edit proifle')
        await accountService.editProfile(account.name)
      }
    }
  },


}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
