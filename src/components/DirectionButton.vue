// 按鈕
<template>
  <a class="DirectionButton" href="javascript:;">{{Name}}</a>
</template>
<script>
  export default {
    props: ["Name"]
  };
</script>
<style lang="scss" scoped>
  .DirectionButton {
    display: inline-block;
    position: relative;
    padding: 20px 40px;
    border: 2px solid #475a6d;
    font-family: sans-serif;
    font-size: 2em;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    letter-spacing: 4px;
    transition: 0.5s;
    &:hover {
      color: #475a6d;
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #475a6d;
      z-index: -1;
      transform-origin: left;
      transition: transform 0.5s ease;
      transform: scaleX(1);
    }
    &:hover:before {
      transform-origin: right;
      transition: transform 0.5s ease;
      transform: scaleX(0);
    }
  }
</style>

