<template>
  <div id="Solitaire">
    <nav></nav>
    <div class="SolitaireContent">
      <ul class="CardSlot">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul class="Cards">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style lang="scss" scoped>
  #Solitaire {
    width: 100%;
    height: 100vh;
    nav {
      height: 55px;
      background-color: #000000;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    }
  }
  .SolitaireContent {
    height: calc(100% - 55px);
    padding: 0 90px;
    padding-top: 48px;
    background-color: #121212;
    .CardSlot {
      width: 100%;
      min-height: 173px;
      display: flex;
      justify-content: center;
      li {
        width: 112px;
        margin: 0 50px;
        height: 173px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    .Cards {
      width: 100%;
      min-height: 173px;
      display: flex;
      justify-content: center;
      li {
        width: 112px;
        margin: 0 50px;
      }
    }
  }
</style>
