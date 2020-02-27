<template>
  <div class="Landing_Page">
    <div class="layer"></div>
    <div class="layer"></div>
  </div>
</template>
<style lang="scss" scoped>
  .Landing_Page {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 10000;
    .layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-origin: top;
      animation: open 1s ease-in-out forwards;
      &:nth-child(1) {
        background: lighten($color: #000000, $amount: 5%);
        z-index: 20;
      }
      &:nth-child(2) {
        background: lighten($color: #000000, $amount: 10%);
        animation-delay: 1s;
        z-index: 19;
      }
    }
  }

  @keyframes open {
    0% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }
</style>
