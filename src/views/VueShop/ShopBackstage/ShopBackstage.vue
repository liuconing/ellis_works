<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Navbar: () => import("@/components/Backstage/Navbar/Navbar.vue"),
    Sidebar: () => import("@/components/Backstage/Sidebar/Sidebar.vue")
  }
};
</script>
<style lang="scss">
@import "./ShopBackstage.scss";
@import "./dashboad.scss";
</style>
