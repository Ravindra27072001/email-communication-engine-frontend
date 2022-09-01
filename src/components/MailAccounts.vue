<template>
  <div class="body">
    <NavBar />

    <section>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-body">
                Do you really want to delete the Account ?
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeAccount()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 class="mb-3 pb-3 text-center text-white fw-bolder m-5">All Accounts</h1>

        <div class="d-flex justify-content-center">
          <div v-show="showSpinner" class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>

        <div v-show="showImage" class="text-center">
          <img src="../images/oops.png" alt="no account">
          <h3 class="mt-5 text-white">You don't have any account</h3>
        </div>

        <div v-show="showTable" class="container">



          <table class="table accountTable shadow p-5 mt-5 mb-5 bg-body rounded ">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Email</th>
                <th scope="col">Company Name</th>
                <!-- <th scope="col">Passwod</th> -->
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account, i in accounts" :key="account._id">
                <td data-label="S.No.">{{  ++i  }}</td>
                <td data-label="Email">{{  account.email  }}</td>
                <td data-label="Company Name">{{  account.companyName  }}</td>

                <td data-label="Action"><button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" @click="getAccountId(account._id)">
                    Delete
                  </button></td>

              </tr>
            </tbody>
          </table>

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
      accountId: "",
      showSpinner: true,
      showImage: false,
      showTable: true,
    };
  },
  methods: {
    addAccount() {
      this.$router.push({ name: "addAccount" });
    },

    getAccountId(_id){
      console.log("accountId: ", _id);
      this.accountId = _id;
    },
    removeAccount() {
      // console.log("yeee id aa gyii: ", id);
      DeleteAccount(this.accountId).then((result) => {
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
@media (max-width: 775px) {
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