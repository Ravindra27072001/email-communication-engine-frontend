<template>
    <div id="main">
        <div class="fof">
            <h1>Error 404</h1>
            <p>Page Not Found</p>
            <button class="btn btn-secondary" @click="goHome()">Home</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goHome() {
            this.$router.push({ name: 'home' })
        }
    },
}
</script>

<style scoped>
#main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}

p {
    font-size: 50px;
}

.fof {
    display: table-cell;
    vertical-align: middle;
}

.fof h1 {
    font-size: 100px;
    display: inline-block;
    padding-right: 12px;
    animation: type .5s alternate infinite;
}

@keyframes type {

    from {
        box-shadow: inset 5px 5px 5px grey
    }

    to {
        box-shadow: inset -5px -5px 5px transparent;
    }

}
</style>