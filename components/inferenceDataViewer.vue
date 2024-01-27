<template>
  <div class="min-w-80 w-full flex flex-col gap-8">
    <div
      class="w-full grid grid-cols-2 gap-1 font-this text-sm border !border-black p-4 rounded-lg"
    >
      <div v-for="(myotubeItem, i) in myotubeData" :key="i" class="col-span-1">
        <b>{{ myotubeItem.label }}:</b> {{ myotubeItem.value }}
      </div>
    </div>

    <div
      class="w-full grid grid-cols-2 gap-1 font-this text-sm border !border-black p-4 rounded-lg"
    >
      <div v-for="(cluster, i) in clustersData" :key="i" class="col-span-1">
        <div v-for="(clusterItem, i) in cluster" :key="i">
          <b>{{ clusterItem.label }}:</b> {{ clusterItem.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["myotubeData", "clustersData"]);
</script>
