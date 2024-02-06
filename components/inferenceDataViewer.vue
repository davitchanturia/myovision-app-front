<template>
  <div class="min-w-80 w-full flex flex-col gap-8">
    <div
      class="w-full grid grid-cols-2 gap-1 font-this text-sm border !border-black p-4 rounded-lg"
    >
      <div v-for="(myotubeItem, i) in myotubeData" :key="i" class="col-span-1">
        <b>{{ updatedLabel(myotubeItem.label) }}:</b> {{ myotubeItem.value }}
      </div>
    </div>

    <div
      v-if="clustersData.length > 0"
      class="w-full grid grid-cols-2 gap-3 font-this text-sm border !border-black p-4 rounded-lg max-h-72 overflow-y-auto"
    >
      <div v-for="(cluster, i) in clustersData" :key="i" class="col-span-1">
        <div v-for="(clusterItem, j) in cluster" :key="j">
          <b>{{ updatedLabel(clusterItem.label) }}:</b> {{ clusterItem.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["myotubeData", "clustersData"]);

const updatedLabel = (label) => {
  return label.replace("_", " ");
};
</script>
