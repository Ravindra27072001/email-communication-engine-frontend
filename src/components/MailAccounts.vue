<template>
  <div class="body">
    <NavBar />

    <section>

      <div class="container">
        <h1 class="text-center text-white m-5">All Accounts</h1>

        <div class="d-flex justify-content-center">
          <div v-show="showSpinner" class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>

        <div v-show="showImage" class="text-center">
          <img src="../images/oops.png" alt="no account">
          <h3 class="mt-5 text-white">You don't have any account</h3>
        </div>

        <div v-show="showTable" class="text-center">


          <div class="tables rounded">

            <table class="table accountTable shadow p-5 mb-5 bg-body rounded">
              <thead>
                <tr>
                  <!-- <th scope="col">Name</th> -->
                  <th scope="col">Company Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Passwod</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in accounts" :key="account._id">
                  <td data-label="Company Name">{{  account.companyName  }}</td>
                  <td data-label="Email">{{  account.email  }}</td>
                  <td data-label="Password">{{  account.password  }}</td>
                  <td data-label="Action"><button @click="removeAccount(account._id)" type="button"
                      class="btn btn-danger btn-sm">Delete</button></td>

                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <div class="text-center">
          <button @click="addAccount()" type="button" class="btn btn-primary m-5">Add Account</button>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import { SearchAccounts, DeleteAccount } from '../services/mailAccounts'
import NavBar from "./NavBar.vue";
export default {
  name: "MailAccount",
  components: { NavBar },
  // component: {
  //   NavBar,
  // },
  data() {
    return {
      accounts: "",
      userId: "",
      showSpinner: true,
      showImage: false,
      showTable: true,
    };
  },
  methods: {
    addAccount() {
      this.$router.push({ name: "addAccount" });
    },
    removeAccount(id) {
      console.log("yeee id aa gyii: ", id);
      DeleteAccount(id).then((result) => {
        console.log(result.data.status)
        if (result.data.status == "SUCCESS") {
          this.$toasted.show(result.data.message, {
            type: 'success'
          });
          SearchAccounts(this.userId).then((response) => {

            if (response.data.message === "No account is there") {
              console.log("dataswaz", response.data.message);
              this.showImage = true;
              this.showTable = false;
            }
            this.accounts = response.data.data;
          });
        } else {
          this.$toasted.show(result.data.message, {
            type: 'error'
          });
        }
      })
    }
  },
  mounted() {
    // console.log("localstorage", localStorage.getItem("userId"));
    this.userId = localStorage.getItem("userId");

    SearchAccounts(this.userId).then((response) => {
      if (response.data.message === "No account is there") {
        console.log("dataswaz", response.data.message);
        this.showSpinner = false;
        this.showImage = true;
        this.showTable = false;
      }
      this.showSpinner = false;
      this.accounts = response.data.data;
    });
  },
}
</script>

<style>

@media (max-width: 550px) {
  .accountTable td::before {
    content: attr(data-label);
    position: absolute;
    left: 5%;
    /* width: 50%; */
    /* padding-left: 15px; */
    font-size: 15px;
    font-weight: bold;
  }
}
</style>