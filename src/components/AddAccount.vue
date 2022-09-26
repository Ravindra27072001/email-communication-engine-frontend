<template>
    <div>
        <NavBar />

        <div class="container mt-5">

            <div class="col">
                <h1 class="mb-3 pb-3 text-center fw-bolder text-dark">Add an account</h1>
            </div>

            <div class="row d-flex justify-content-center align-items-center">

                <div class="col col-xl-10">
                    <div class="m-auto p-5" id="newClass">
                        <div class="row d-flex justify-content-center align-items-center">

                            <div class="col-lg-5 col-md-6 d-none d-md-block">
                                <img src="../images/addAccount.png" alt="login form" class="img-fluid" />
                            </div>

                            <div class="col-md-6 col-lg-6">
                                <div class="card-body">

                                    <form @submit.prevent="submit">

                                        <div class="form-outline">
                                            <label class="form-label text-light" for="form-control">Company Name</label>
                                            <input type="text" class="form-control" v-model.trim=companyName
                                                name="name" />

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
                                            <label class="form-label text-light" for="form-control">Password</label>
                                            <input type="password" class="form-control"
                                                v-model.trim="$v.password.$model" name="password" />
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.password.required">password is required</span>
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

            <h5 class="text-center text-danger mt-3" type="text" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Attention:-
                <a href="#">click here</a> before creating an account
            </h5>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-body">
                                <h4 class="fw-bolder"> Please enter the app password which is provided by the email
                                </h4>
                                <p>Please follow the steps mentioned below to get the app password otherwise you will
                                    not be able to send email</p>
                                <p> 1) Open gmail -> Manage your Google Account -> Security -> 2-Step Verification -> On
                                </p>
                                <p>2) Open gmail -> Manage your Google Account -> Security -> App password -> Create
                                    Password </p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import NavBar from './NavBar.vue';
import { required, email } from 'vuelidate/lib/validators'
import { AddAccount } from '@/services/mailAccounts'

export default {
    name: "AddAccount",
    components: { NavBar },
    data() {
        return {
            email: '',
            password: '',
            companyName: '',
            userId: '',
        }
    },
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
        },
    },
    methods: {
        async submit() {

            const credentials = {
                userId: localStorage.getItem("userId"),
                companyName: this.companyName,
                email: this.email,
                password: this.password,
            }

            try {
                let result = await AddAccount(credentials);
                this.$toasted.show(result.data.message, {
                    type: 'success'
                });
                this.$router.push({ name: 'mailAccounts' })

            } catch (error) {
                this.$toasted.show(error.response.data.message, {
                    type: 'error'
                });

            }

            // AddAccount(credentials).then((result) => {
            //     if (result.data.status === "FAILED") {
            //         this.$toasted.show(result.data.message, {
            //             type: 'error'
            //         });
            //     } else {
            //         this.$toasted.show(result.data.message, {
            //             type: 'success'
            //         });
            //         this.$router.push({ name: 'mailAccounts' })
            //     }
            // })
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