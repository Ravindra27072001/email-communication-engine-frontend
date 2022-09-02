<template>
    <section class="body">
        <NavBar />

        <div class="container p-5">
            <h1 class="mb-3 pb-3 text-center fw-bolder text-white">Add a List</h1>
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col col-xl-8">
                    <div class="card rounded">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block rounded">
                                <img src="../images/addList.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;margin-left: 25px; margin-top: 50px; margin-bottom: 40px; width: 300px;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body rounded">
                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Name of the List</label>
                                            <input type="text" class="form-control" v-model.trim="$v.listName.$model"
                                                name="listName" />

                                            <div class="invalid-feedback">
                                                <span v-if="!$v.listName.required">List name is required</span>
                                            </div>
                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Description</label>
                                            <input type="text" class="form-control" v-model.trim="$v.description.$model"
                                                name="description" />
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.description.required">List name is required</span>
                                            </div>
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-danger btn-lg btn-block" :disabled="$v.$invalid">
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
import { required } from 'vuelidate/lib/validators'
import { AddList } from '@/services/allLists'
export default {
    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            listName: '',
            description: '',
            userId: '',
        }
    },
    validations: {
        listName: {
            required,
        },
        description: {
            required,
        }
    },
    methods: {
        async submit() {
            console.log('touched')
            const credentials = {
                userId: localStorage.getItem("userId"),
                listName: this.listName,
                description: this.description
            }
            console.log(credentials)
            AddList(credentials).then((result) => {
                console.log("result isdscxzdcc: ", result)
                if (result.data.status === "FAILED") {
                    this.$toasted.show(result.data.message, {
                        type: 'error'
                    });
                } else {
                    this.$toasted.show(result.data.message, {
                        type: 'success'
                    });
                    this.$router.push({ name: 'allLists' })
                }
            })
        }
    },
}
</script>

<style>
</style>