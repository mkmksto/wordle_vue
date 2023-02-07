<script setup lang="ts">
import LaithCards from './LaithCards.vue'
import { computed, ref } from 'vue'

import type { validGenders, Invitee } from '../types/laithTypes'

const name_ = ref<string>('')
// or const name = ref('') // will infer type
const gender_ = ref<validGenders>('male')
// an array of Invitee objects conforming to the interface
const invitees_ = ref<Invitee[]>([])

const genderCount = computed<{
    female: number
    male: number
}>(() => {
    /* return { female: 3, male: 3 } */
    return invitees_.value.reduce(
        (countObj, invitee) => {
            if (invitee.gender === 'male') {
                // we need to destructure to account for the female prop inside countObj
                return {
                    /* ...countObj, below is probably more readable*/
                    female: countObj.female,
                    male: ++countObj.male,
                }
            }
            return {
                male: countObj.male,
                female: ++countObj.female,
            }
        },
        // this is the `countObj` that is passed as the first param inside
        // reduce's callback func (usually 0 in examples)
        { male: 0, female: 0 }
    )
})

function addInvitee(): void {
    if (!name_.value) return
    invitees_.value.push({
        id: Math.floor(Math.random() * 100000),
        name: name_.value,
        gender: gender_.value,
    })
    name_.value = ''
    gender_.value = 'male'
}
</script>

<template>
    <main>
        <div>
            <h1>People Invited to my Party</h1>
            <div class="input-container">
                <input
                    v-model="name_"
                    @keypress.enter="addInvitee"
                    type="text"
                    placeholder="Name..."
                />
                <select v-model="gender_" @keypress.enter="addInvitee">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <h1></h1>
            </div>
            <div class="card-container">
                <LaithCards
                    v-for="invitee in invitees_"
                    :key="invitee.id"
                    :invitee="invitee"
                ></LaithCards>
            </div>

            <div class="gender-count">
                <p>Females - {{ genderCount.female }}</p>
                <p>Male - {{ genderCount.male }}</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: antiquewhite;
}

input,
select {
    width: 100%;
    padding: 5px;
    margin-bottom: 2px;
}
</style>
