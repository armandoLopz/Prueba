<template>
    <div class="pagination">
        <button v-for="page in totalPages" :key="page" @click="$emit('page-change', page)"
            :class="{ active: page === currentPage }">
            {{ page }}
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    totalPages: number;
    currentPage: number;
}>();

defineEmits<{
    (e: 'page-change', page: number): void;
}>();
</script>
