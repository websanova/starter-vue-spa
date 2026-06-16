<script setup>
    import iconStarter from 'SHR_CPT/icon/starter.svg?raw'

    import CptCover from 'SHR_CPT/core/Cover.vue'
    import CptIconRaw from 'SHR_CPT/core/IconRaw.vue'
</script>

<template>
    <cpt-cover>
        <div class="relative">
            <cpt-icon-raw
                class="h-20 w-20"
                :raw="iconStarter"
            />

            <div
                v-if="$slots.default"
                class="absolute text-center w-90 -ms-45 left-10 py-margin"
            >
                <slot></slot>
            </div>
        </div>
    </cpt-cover>
</template>