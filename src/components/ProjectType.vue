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
                <a-menu-item key="Project">
                    <UserOutlined />
                    Project
                </a-menu-item>
                <a-menu-item key="Module">
                    <UserOutlined />
                    Module
                </a-menu-item>
                <a-menu-item key="Epic">
                    <UserOutlined />
                    Epic
                </a-menu-item>
                <a-menu-item key="Story">
                    <UserOutlined />
                    Story
                </a-menu-item>
                <a-menu-item key="Task">
                    <UserOutlined />
                    Task
                </a-menu-item>
            </a-menu>
        </template>
        <a-button>
            {{ type }}
            <DownOutlined />
        </a-button>
    </a-dropdown>
</template>
