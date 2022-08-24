<template>
    <section>
        <NavBar />

        <div class="container p-5">
            <h1 class="mb-3 pb-3 text-center">Add a List</h1>
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col col-xl-8">
                    <div class="card rounded bg-warning">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block bg-warning rounded">
                                <img src="../images/addList.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;margin-left: 25px; margin-top: 50px; margin-bottom: 40px; width: 300px;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body bg-warning rounded">
                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Name of the List</label>
                                            <input type="text" class="form-control" v-model.trim=listName name="name" />

                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-danger btn-lg btn-block">
                                                Add
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavBar from './NavBar.vue';
import { AddList } from '@/services/allLists'
export default {
    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            listName: '',
            userId: '',

        }
    },

    methods: {
        async submit() {
            console.log('touched')
            const credentials = {
                userId: localStorage.getItem("userId"),
                listName: this.listName,
            }
            console.log(credentials)
            AddList(credentials).then((result) => {
                console.log("result isdscxzdcc: ", result)
                if (result.data.status === "FAILED") {
                    this.$toasted.show(result.data.message);
                } else {
                    this.$toasted.show(result.data.message);
                    this.$router.push({ name: 'allLists' })
                }
            })
        }
    },
}
</script>

<style>
</style>