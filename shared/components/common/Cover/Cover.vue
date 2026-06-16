<script setup>
    const props = defineProps({

        // 'max-w-sm', 'max-w-md', 'max-w-lg'
        size: String
    })
</script>

<template>
    <div
        class="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-content z-5"
    >
        <div
            :class="{
                ['w-full max-w-' + props.size]: props.size,
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>