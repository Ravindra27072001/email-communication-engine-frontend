<template>
  <div class="background">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "App",
}
</script>

<style>

html{
  background-image: url("./images/background.png");
}
.background{
  background-image: url("./images/background.png");
}
</style>
