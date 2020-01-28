<template>
  <div>
    <p>Should accept props that specify what fields to show.</p>
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['users', 'fields']
}
</script>
