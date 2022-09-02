<template>
    <section class="body">
        <NavBar />

        <div class="pt-5">
            <h1 class="mb-3 pb-3 text-center fw-bolder text-secondary">Add an email</h1>
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col col-xl-8">
                    <div class="card mt-3 m-auto" id="newClass">
                        <div class="row g-0">
                            <div class=" col-md-6 col-lg-5 d-none d-md-block">
                                <img src="../images/addAccount.png" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem;padding: 10px; margin-left: 10px; margin-top: 50px; margin-bottom: 40px;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body rounded">
                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">Name</label>
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
                                            <label class="form-label" for="form-control">Email address</label>
                                            <input type="email" class="form-control" v-model.trim="$v.email.$model"
                                                :class="{
                                                    'is-invalid': $v.email.$error,
                                                    'is-valid': !$v.email.$invalid,
                                                }" name="email" />
                                            <div class="valid-feedback">Your email is valid</div>
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.email.required">email is required</span>
                                                <span v-if="!$v.email.isUnique">This email is wrong</span>
                                            </div>
                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label" for="form-control">List</label>
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
    </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import NavBar from './NavBar.vue';
// import { AddAccount } from '@/services/mailAccounts'
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
            isUnique(value) {
                if (value === "") return true;
                var email_regex =
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(email_regex.test(value));
                    }, 350 + Math.random() * 300);
                });
            },
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
            this.$v.$touch();
            console.log("listName: ", this.listName, this.userId);
            console.log('touched')
            const credentials = {
                userId: this.userId,
                name: this.name,
                email: this.email,
                listName: this.listName
            }
            AddUser(credentials).then((result) => {
                console.log("ye rhi list ki id: ", result.data);
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
    mounted() {
        console.log("listName: ", this.listName);
        console.log("userId: ", this.userId);
        SearchList(this.userId).then((response) => {
            this.lists = response.data.data;
        });
    },
}
</script>

<style>
</style>