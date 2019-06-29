<template>
  <div class="Tourism">
    <p>123456465</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        GetData: [],
        Area: []
      };
    },
    async created() {
      await fetch(
        "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",
        { method: "GET" }
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.GetData = data.result.records;
        });
      this.Area = [
        ...new Set(this.GetData.map(item => JSON.stringify(item.Zone)))
      ].map(item => JSON.parse(item));
      console.log(this.Area);
    }
  };
</script>
<style lang="scss" scoped>
</style>
