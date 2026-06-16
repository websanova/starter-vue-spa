<script setup>
    import CptButton from 'SHR_CPT/core/Button.vue'
    import CptCoverLoading from 'SHR_CPT/util/CoverLoading.vue'

    function onRefresh() {
        window.location.reload()
    }
</script>

<template>
    <cpt-cover-loading>
        <div
            class="mb-margin"
            v-html="$t('site.cover.loading.maintenance')"
        />

        <cpt-button
            :label="$t('site.lbl.refresh')"
            @click="onRefresh"
        />
    </cpt-cover-loading>
</template>