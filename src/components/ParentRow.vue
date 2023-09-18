<script setup>
// import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/task'
import ArrowIcon from './ArrowIcon.vue';
import { ref } from 'vue';
import { DatePicker } from 'ant-design-vue';
// import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import ProjectType from './ProjectType.vue';
import ProjectStatus from './ProjectStatus.vue'

//defining props, only with this you will get the information that pass 
// by other componenets
defineProps(['task', 'index'])

const title = ref('')
// const { tasks } = storeToRefs(useTaskStore())
const { addTask, getChildTasks, updateShowChild } = useTaskStore()

// let title = ''
const projectType = ref('')

function addChild(task) {
    addTask('child', task.id, task.level + 1, true, true)
}

function showChildren(task) {
    updateShowChild(task)
}

// action trigger by menu
function handleMenuClick(item){
    console.log('parent Menu Click ' + item.key)
    projectType.value = item.key
    // console.log('task in projecttype, ', task)
}

function setText(){
    console.log(title)
}

</script>

<template>
    <tr v-if="task.isVisible">
        <td><a-button></a-button></td>

        <td>
            <a-space align="center">
                <arrow-icon v-if="task.level > 0" :level=task.level></arrow-icon>
                <a-button size="small" shape="circle" v-if="getChildTasks(task.id).length > 0" @click="showChildren(task)">
                    {{ task.isShown ? '&#9660;' : '&#9654;' }}
                </a-button>
                <a-button size="small" type="primary" @click="addChild(task)">Add Child</a-button>
                <a-input v-model:value="title" :placeholder="task.id" allow-clear @keyup.enter="setText"/>
            </a-space>
        </td>

        <td>
            <project-status @emitHandleMenuClick="handleMenuClick"/>
        </td>
        <td><date-picker></date-picker></td>
        <td>
            <project-type :task=task @emitHandleMenuClick="handleMenuClick"/>
        </td>
    </tr>
    <!-- <tr>
        <div v-show="task.isShown">
            <parent-row v-for="(cTask, index) in getChildTasks(task.id)" :key="cTask.id" :index="index" :task="cTask">
            </parent-row>
        </div>
    </tr> -->
</template>