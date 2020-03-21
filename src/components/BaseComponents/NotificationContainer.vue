<template>
  <div class="flex flex-col-reverse fixed right-0 bottom-0 m-4" role="alert">
    <transition name="alert-slide">
      <Notification 
        class="mt-2"
        v-for="notification in notifications" 
        :key="notification.id"
        :notification="notification"
      />
    </transition>
  </div>
</template>

<script>
import { Notification } from '@/components/BaseComponents'
import { mapState } from 'vuex'

export default {
  name: 'NotificationContainer',
  components: {
    Notification
  },
  computed: {
    ...mapState('notification', ['notifications'])
  }
}
</script>