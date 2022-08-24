<template>
    <div class="text-center" style="margin-top: 200px;">
        <div>
            <img src="../images/pageNotFound.png" alt="Page not found">
        </div>
        <div>
            <button class="btn btn-secondary" @click="goHome()">Go Home</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goHome(){
            this.$router.push({ name: 'mailAccounts' })
        }
    },
}
</script>

<style>
</style>