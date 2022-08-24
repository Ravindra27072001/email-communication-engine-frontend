<template>
  <div>
    <!-- <NavBar /> -->
    <NavBar />



    <section class="mt-5">

      <h1 class="text-center m-5">All Lists</h1>



      <div class="">
        <div v-show="showListsImage" class="text-center">
          <img src="../images/oops.png" alt="no list">
          <h5>You don't have any list</h5>
        </div>


        <div v-show="showListsTable" class="text-center">

          <div class="bg-warning">

            <table class="table listTable">
              <thead>
                <tr>
                  <th scope="col">List Name</th>
                  <th scope="col">Users</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list in lists" :key="list._id">
                  <td data-label="List Name">{{ list.listName }}</td>
                  <td data-label="Users"> <button @click="getId(list._id)" type="button"
                      class="btn btn-primary btn-sm">Users list</button></td>
                  <td data-label="Action"><button @click="removeList(list._id)" type="button"
                      class="btn btn-danger btn-sm">Delete</button></td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <div class="text-center">
          <button @click="addList()" type="button" class="btn btn-primary m-3">Add List</button>
        </div>
      </div>



      <div class="">
        <div v-show="showUsersImage" class="text-center">
          <img src="../images/oops.png" alt="no list">
          <h5 class="mb-3">No email is there</h5>
          <div class="text-center">
            <button @click="addUser()" type="button" class="btn btn-primary mb-3">Add an Email</button>
          </div>
        </div>



        <div v-show="showUsersTable" class="text-center">
          <h1 class="text-center mb-3">All Users</h1>


          <div class="bg-warning">

            <table class="table userTable">
              <thead>
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in usersEmails" :key="user._id">
                  <td data-label="User Name">{{ user.name }}</td>
                  <td data-label="Email"> {{ user.email }}</td>
                  <td data-label="Action"><button @click="removeList(list._id)" type="button"
                      class="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="text-center">
            <button @click="addUser()" type="button" class="btn btn-primary mt-3">Add an Email</button>
          </div>
        </div>
      </div>



    </section>
  </div>

</template>

<script>
import { SearchList, SearchUserEmail, DeleteList } from '../services/allLists'
import NavBar from "./NavBar.vue";
export default {
  name: "MailAccount",
  components: {
    NavBar
  },
  data() {
    return {
      lists: "",
      usersEmails: "",
      userId: localStorage.getItem('userId'),
      showListsImage: false,
      showUsersImage: false,
      showListsTable: true,
      showUsersTable: false,
    };
  },
  methods: {
    getId(id) {
      SearchUserEmail(id).then((result) => {
        console.log("object", result.data.data);
        this.showUsersTable = true;
        this.showUsersImage = false;
        this.usersEmails = result.data.data
        console.log(this.usersEmails.length);
        if (!this.usersEmails.length) {
          this.showUsersImage = true;
          this.showUsersTable = false;
        }
      }).catch((error) => {
        console.log("objectttttttttttttt", error);
      })
    },

    addUser() {
      this.$router.push({ name: "addEmail" });
    },

    addList() {
      console.log("object", this.listId);

      this.$router.push({ name: "addList" });
      // console.log(this.userId);

    },
    removeList(id) {
      console.log("yeee id aa gyii: ", id);
      DeleteList(id).then((result) => {
        console.log(result.data)
        if (result.data.status == "SUCCESS") {
          console.log("object:", this.lists);
          SearchList(this.userId).then((response) => {
            if (response.data.message === "No List is there") {
              console.log("dataswaz", response.data.message);
              this.showListsImage = true;
              this.showListsTable = false;
            }
            this.lists = response.data.data;
          });
          this.$toasted.show(result.data.message);
        } else {
          this.$toasted.show(result.data.message);
        }
      })
      // SearchList(this.userId)
    }
  },
  mounted() {
    // console.log("localstorage", localStorage.getItem("userId"));
    // console.log("object", this.id);
    // this.userId = localStorage.getItem("userId");
    SearchList(this.userId).then((response) => {
      if (response.data.message === "No List is there") {
        console.log("dataswaz", response.data.message);
        this.showListsImage = true;
        this.showListsTable = false;
      }
      this.lists = response.data.data;
    });
  },

}
</script>

<style>
@media(max-width: 550px) {
  .table thead {
    display: none;
  }

  .table .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    margin-bottom: 15px;
  }


  .table td {
    text-align: right;
    /* padding-left: 50px; */
    position: relative;
  }

  .listTable td::before {
    content: attr(data-label);
    position: absolute;
    left: 5%;
    /* width: 50%; */
    /* padding-left: 15px; */
    font-size: 15px;
    font-weight: bold;
  }

  .userTable td::before {
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