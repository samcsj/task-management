<!-- ArrowIcon.vue -->
<template>
    <span>
      <span v-for="n in level" :key="n">
        <!-- <span v-if="n !== level">&nbsp;&nbsp;&nbsp;&nbsp;</span> -->
        <!-- <span v-else>&#8627;</span> -->
        <span>
          <a-divider type="vertical" style="background-color: #7cb305" />
        </span>
      </span>
    </span>
  </template>
  
  <script>
  export default {
    props: ['level']
  };
  </script>
  