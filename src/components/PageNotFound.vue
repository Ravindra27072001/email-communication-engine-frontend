<template>
    <div class="text-center" style="margin-top: 200px;">
        <div>
            <img src="../images/pageNotFound.png" alt="Page not found" style="width: 500px">
        </div>
        <div>
            <button class="btn btn-light mt-5" @click="goHome()">Go Home</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goHome(){
            this.$router.push({ name: 'home' })
        }
    },
}
</script>

<style>
</style>