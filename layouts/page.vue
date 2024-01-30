<template>
  <div class="overflow-y-hidden max-w-[1300px] mx-auto mt-5">
    <div class="grid grid-cols-6 gap-3 w-full mx-auto h-full my-10">
      <div class="h-[760px] !overflow-hidden col-span-4">
        <slot name="canvas" />
      </div>
      <div class="col-span-2">
        <slot name="rightSide" />
      </div>
    </div>
  </div>
</template>
