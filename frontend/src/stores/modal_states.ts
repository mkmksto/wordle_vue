import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalState = defineStore('modalState', () => {
    const showSettingsModal$ = ref<boolean>(false)
    const showInfoModal$ = ref<boolean>(false)

    return { showSettingsModal$, showInfoModal$ }
})
