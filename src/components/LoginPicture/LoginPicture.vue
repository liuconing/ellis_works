<template>
  <div class="LoginPicture d-flex justify-content-center align-items-center">
    <div>
      <p>{{ "HELLO！ I'M Ellis" }}</p>
      <div class="Community text-center mt-5">
        <a
          href="https://www.facebook.com/profile.php?id=100000383240908"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="fab fa-facebook-square fa-3x"></i>
        </a>
        <a
          href="http://www.google.com.tw"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="fab fa-google fa-3x ml-5"></i>
        </a>
        <a
          href="https://github.com/liuconing/about-me"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="fab fa-github fa-3x ml-5"></i>
        </a>
      </div>
      <div class="text-center">
        <i
          @click="ScrollTop('nav')"
          class="Anchor fas fa-angle-double-down fa-4x"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {},
  components: {},
  methods: {
    ScrollTop(id) {
      $("html, body").animate(
        {
          scrollTop: $(`#${id}`).offset().top
        },
        900
      );
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.LoginPicture {
  position: relative;
  height: 100vh;
  background-image: radial-gradient(rgba(0, 0, 0, 0.05), black),
    url(../../assets/images/switzerland-4290226_1920.jpg);
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  z-index: 1;
  p {
    font-size: 60px;
    color: white;
    @include dai_425 {
      font-size: 35px;
    }
  }
  .fas {
    font-size: 40px;
    @include dai_425 {
      font-size: 70px;
    }
  }
  .Community {
    a {
      color: lighten($color: #000000, $amount: 20%);
      transition: color 0.5s;
      &:hover {
        color: lighten($color: #000000, $amount: 0%);
      }
    }
    .fab {
      font-size: 40px;
    }
  }
  .Anchor {
    color: white;
    position: absolute;
    bottom: 80px;
    right: 50%;
    max-width: 50px;
    margin-right: -25px;
    animation: fontbulger 1.5s infinite;
    &:hover {
      cursor: pointer;
    }
  }
}
@keyframes fontbulger {
  0% {
    bottom: 50px;
  }
  30% {
    bottom: 100px;
  }
  100% {
    bottom: 50px;
  }
}
</style>
