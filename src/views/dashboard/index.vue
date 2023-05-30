<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <Card></Card>
      <Sale></Sale>
      <Observe></Observe>
    </div>
  </div>
</template>

<script>
import Card from "./Card"
import Sale from "./Sale"
import Observe from "./Observe"
export default {
  name: 'Dashboard',
  components: { Card, Sale, Observe },
  mounted() {
    this.$store.dispatch('getData')
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px 0;
    height: 580px;
    // background: url(~@/assets/1.jpg);
    background-size: 100% 100%;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
