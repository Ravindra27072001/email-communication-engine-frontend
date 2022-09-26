<template>
    <div>
        <NavBar />

        <div class="container mt-5">

            <div class="col">
                <h1 class="mb-3 pb-3 text-center fw-bolder text-dark mt-3">Add a List</h1>
            </div>

            <div class="row d-flex justify-content-center align-items-center">

                <div class="col col-xl-10">
                    <div class="m-auto p-5" id="newClass">
                        <div class="row d-flex justify-content-center align-items-center">

                            <div class="col col-lg-5 col-md-6 d-none d-md-block">
                                <img src="../images/addList.png" alt="login form" class="img-fluid"
                                    style="width: 320px" />
                            </div>

                            <div class="col-md-6 col-lg-6">
                                <div class="card-body">

                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label text-light" for="form-control">Name of the
                                                List</label>
                                            <input type="text" class="form-control" v-model.trim="$v.listName.$model"
                                                name="listName" />

                                            <div class="invalid-feedback">
                                                <span v-if="!$v.listName.required">List name is required</span>
                                            </div>
                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label text-light" for="form-control">Description</label>
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
    </div>
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

            const credentials = {
                userId: localStorage.getItem("userId"),
                listName: this.listName,
                description: this.description
            }

            try {
                let result = await AddList(credentials);
                this.$toasted.show(result.data.message, {
                    type: 'success'
                });
                this.$router.push({ name: 'allLists' })
            } catch (error) {
                this.$toasted.show(error.response.data.message, {
                    type: 'error'
                });
            }
        }
    },
}
</script>

<style scoped>
#newClass {
    box-shadow: 17px 10px 20px 6px black;
    background-color: #303E48;
    width: 90%;
}
</style>