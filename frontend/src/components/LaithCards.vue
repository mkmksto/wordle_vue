<script setup lang="ts">
import type { validGenders } from '../types/globalTypes'

/* const props = defineProps(['invitee']) // JS way */
defineProps<{
    invitee: {
        id: number
        name: string
        gender: validGenders
    }
}>()
</script>

<template>
    <div
        :style="{
            backgroundColor:
                invitee.gender === 'male' ? 'rgb(8, 111, 111)' : 'rgb(111, 18, 8)',
        }"
    >
        {{ invitee.name }}
    </div>
</template>

<style scoped>
div {
    background-color: aqua;
    border-radius: 5px;
    margin-top: 5px;
    text-align: center;
    padding: 3px;
    color: white;
}
</style>
