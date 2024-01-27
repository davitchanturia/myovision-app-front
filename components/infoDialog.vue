<template>
  <v-btn variant="text" icon="mdi-head-question-outline">
    <v-icon name="mdi-head-question-outline" />

    <v-dialog v-model="showDialog" width="700" activator="parent">
      <v-card>
        <v-card-text class="font-mono">
          <slot />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn text="close" @click="showDialog = false" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup>
const showDialog = ref(false);
</script>
