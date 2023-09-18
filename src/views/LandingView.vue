<script setup>
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/task'
import { reactive, ref } from 'vue';

//import components
import ParentRow from '../components/ParentRow.vue'

const { tasks, getParentTasks } = storeToRefs(useTaskStore())
const { addTask } = useTaskStore()

const parentTasks = getParentTasks
console.log('parentTasks: ', parentTasks.value)
const taskTitle = reactive({})

const columns = [
  {title: 'Id', dataIndex: 'id', key: 'id'},
  {title: 'Title', dataIndex: 'title', key: 'title'},
  {title: 'Status', dataIndex: 'parentId', key: 'parentId'},
  {title: 'Type', dataIndex: 'level', key: 'level'},
  {title: 'Date', dataIndex: 'isShown', key: 'isShown'},
]

function addParent() {
  //passing title, parentId, level, isShown
  addTask('Hi', 0, 0, true, true)
}

</script>

<template>
  <main>
    <div>
      <a-button type="primary" @click="addParent">Add a new Parent Row</a-button>
      <br>
      This is the length of tasks: {{ tasks.length }}
      <a-table :columns="columns" :data-source="tasks">
        <template #bodyCell="{ column, text, record }">
          <span>
            <a-input v-model:value="taskTitle[record.key][column.dataIndex]" >{{ text }}</a-input>
          </span>
        </template>
        <!-- <a-table-column key="title" data-index="title" title="Title"> -->
        <!-- </a-table-column> -->
      </a-table>
      <!-- <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Th Custom1</th>
            <th>TH Custom2</th>
            <th>Th Custom3</th>
          </tr>
        </thead>
        <tbody v-if="tasks.length">
          <ParentRow v-for="(task, index) in tasks" :key="task.id" :index="index" :task="task" />
        </tbody>
      </table> -->
    </div>
  </main>
</template>