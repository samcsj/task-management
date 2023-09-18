<script setup>
import { storeToRefs } from 'pinia';
import { useTaskStore } from '../stores/task'
import ArrowIcon from './ArrowIcon.vue';
import ParentRow from './ParentRow.vue'

//defining props, only with this you will get the information that pass 
// by other componenets
defineProps(['task', 'index'])

const { tasks } = storeToRefs(useTaskStore())
const { addTask, getChildTasks, updateShowChild } = useTaskStore()

function addChild(task) {
    addTask('child', task.id, task.level + 1, false)
}

</script>

<template>
    <main>
        <div>
            <tr>
                <td>
                    <button @click="addChild(task)">Add Child</button>
                    Task ID: {{ task.title }}
                    <hr>
                </td>
            </tr>
        </div>
    </main>
</template>