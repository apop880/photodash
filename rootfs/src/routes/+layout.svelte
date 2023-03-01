<slot />

<style lang="postcss">
    :global(.svelecte) {
        --sv-bg: #555355 !important;
        --sv-item-color: #EBECF0 !important;
        --sv-highlight-bg: #378B82 !important;
        --sv-item-active-bg: transparent !important;
        --sv-border-color: rgba(235, 236, 240, 0.2) !important;
    }
    
    :global(.sv-control) {
        @apply select select-bordered w-full bg-secondary-focus !rounded-lg;
    }

    :global(.is-active) {
        outline-offset: 2px;
        outline: 2px solid rgba(235, 236, 240, 0.2) !important;
    }

    :global(.sv-content) {
        @apply !p-0;
    }

    :global(.indicator) {
        visibility: hidden;
    }
</style>