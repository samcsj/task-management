<script setup>
import { ref } from 'vue';
import ChildRow from '../components/ChildRow.vue'
const showLine = ref(true);
const showIcon = ref(false);
const treeData = ref([{
  title: 'parent 1',
  key: '0-0',
  children: [{
    title: 'parent 1-0',
    key: '0-0-0',
    children: [{
      title: 'leaf',
      key: '0-0-0-0',
    }, {
      key: '0-0-0-1',
    }, {
      title: 'leaf',
      key: '0-0-0-2',
    }],
  }, {
    title: 'parent 1-1',
    key: '0-0-1',
    children: [{
      title: 'leaf',
      key: '0-0-1-0',
    }],
  }, {
    title: 'parent 1-2',
    key: '0-0-2',
    children: [{
      title: 'leaf 1',
      key: '0-0-2-0',
    }, {
      title: 'leaf 2',
      key: '0-0-2-1',
    }],
  }],
}, {
  title: 'parent 2',
  key: '0-1',
  children: [{
    title: 'parent 2-0',
    key: '0-1-0',
    children: [{
      title: 'leaf',
      key: '0-1-0-0',
    }, {
      title: 'leaf',
      key: '0-1-0-1',
    }],
  }],
}]);
const onSelect = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
};
</script>

<template>
  <div>
    <div style="margin-bottom: 16px">
      showLine:
      <a-switch v-model="showLine" />
      <br />
      <br />
      showIcon:
      <a-switch v-model="showIcon" />
    </div>
    <a-tree :show-line="showLine" :show-icon="showIcon" :default-expanded-keys="['0-0-0']" :tree-data="treeData"
      @select="onSelect">
      <template>
        <child-row></child-row>
      </template>
      <!-- <template #icon><carry-out-outlined /></template>
      <template #title="{ dataRef }">
        <template v-if="dataRef.key === '0-0-0-1'">
          <div>multiple line title</div>
          <div>multiple line title</div>
        </template>
        <template v-else>{{ dataRef.title }}</template>
      </template>
      <template #switcherIcon="{ dataRef, defaultIcon }">
        <SmileTwoTone v-if="dataRef.key === '0-0-2'" />
        <component :is="defaultIcon" v-else />
      </template> -->
    </a-tree>
  </div>
</template>


  