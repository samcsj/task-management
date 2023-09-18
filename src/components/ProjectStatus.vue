<script setup>
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const type = ref('---')

// defineProps(['task'])
const tempFunc = defineEmits(['emitHandleMenuClick'])

function handleMenuClick(item){
    // console.log(item.key)
    type.value = item.key
    tempFunc('emitHandleMenuClick', item)
}
</script>

<template>
    <a-dropdown>
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="Backlog">
                    <UserOutlined />
                    Backlog
                </a-menu-item>
                <a-menu-item key="To-Do">
                    <UserOutlined />
                    To-Do
                </a-menu-item>
                <a-menu-item key="In Progress">
                    <UserOutlined />
                    In Progress
                </a-menu-item>
                <a-menu-item key="Pending">
                    <UserOutlined />
                    Pending
                </a-menu-item>
                <a-menu-item key="Done">
                    <UserOutlined />
                    Done
                </a-menu-item>
            </a-menu>
        </template>
        <a-button>
            {{ type }}
            <DownOutlined />
        </a-button>
    </a-dropdown>
</template>
