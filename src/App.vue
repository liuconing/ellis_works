<template>
  <div id="app">
    <!-- Cache -->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-else-if="$route.meta.keepAlive === undefined" />
  </div>
</template>

<script>
export default {};
</script>
