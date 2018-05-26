<template>
  <GmapMap
    :center="{lat:28.5, lng:77}"
    :zoom="15"
    map-type-id="terrain"
    style="width: 100%; height: 400px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script>
    export default {
        name: "MapSchoolCollection",
      data: function() {
        return {
          loading: true,
          categories: [],
          locationView: true,
          markers: [{
            position: {
              lat: 28.52457809448242,
              lng: 77.20661163330078
            }
          }, {
            position: {
              lat: 28.55557441711426,
              lng: 77.06364440917969
            }
          }]
        };
      }
    }
</script>

<style scoped>

</style>
