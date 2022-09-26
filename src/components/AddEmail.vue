<template>
    <div>
        <NavBar />

        <div class="container mt-5">

            <div class="col">
                <h1 class="mb-3 pb-3 text-center fw-bolder text-dark">Add an email</h1>
            </div>

            <div class="row d-flex justify-content-center align-items-center">

                <div class="col col-xl-10">
                    <div class="m-auto p-5" id="newClass">
                        <div class="row d-flex justify-content-center align-items-center">

                            <div class="col col-lg-5 col-md-6 d-none d-md-block">
                                <img src="../images/addAccount.png" alt="login form" class="img-fluid" />
                            </div>

                            <div class="col-md-6 col-lg-6">
                                <div class="card-body">

                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label text-light" for="form-control">Name</label>
                                            <input type="text" class="form-control" v-model.trim="$v.name.$model"
                                                :class="{
                                                    'is-invalid': $v.name.$error,
                                                    'is-valid': !$v.name.$invalid,
                                                }" name="name" />
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.email.required">email is required</span>
                                            </div>

                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label text-light" for="form-control">Email
                                                address</label>
                                            <input type="email" class="form-control" v-model.trim="$v.email.$model"
                                                :class="{
                                                    'is-invalid': $v.email.$error,
                                                    'is-valid': !$v.email.$invalid,
                                                }" name="email" />
                                            <div class="valid-feedback">Your email is valid</div>
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.email.required">email is required</span>
                                                <span v-if="!$v.email.email">This email is not valid</span>
                                            </div>
                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label text-light" for="form-control">List</label>
                                            <select v-model.trim="$v.listName.$model" class="form-select form-outline"
                                                aria-label="Default select example" name="list">
                                                <div class="invalid-feedback">
                                                    <span v-if="!$v.listName.required">email is required</span>
                                                </div>
                                                <option v-for="list in lists" :key="list._id">{{ list.listName
                                                }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-danger btn-lg btn-block" :disabled="$v.$invalid">
                                                Add Email
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

import { required, email } from 'vuelidate/lib/validators'
import NavBar from './NavBar.vue';
import { SearchList, AddUser } from '../services/allLists'

export default {
    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            lists: '',
            email: '',
            name: '',
            userId: localStorage.getItem('userId'),
            listName: '',
        }
    },
    validations: {
        email: {
            required,
            email,
        },
        name: {
            required,
        },
        listName: {
            required,
        }
    },
    methods: {
        async submit() {

            const credentials = {
                userId: this.userId,
                name: this.name,
                email: this.email,
                listName: this.listName
            }

            try {
                let result = await AddUser(credentials);
                console.log(result);
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
    mounted() {
        SearchList(this.userId).then((response) => {
            this.lists = response.data.data;
        });
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