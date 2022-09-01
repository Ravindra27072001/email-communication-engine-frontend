<template>
  <div class="body">
    <!-- <NavBar /> -->
    <NavBar />

    <section>

      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-body">
                Do you really want to delete the Member ?
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                @click="removeMember()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-body">
                Do you really want to delete the List ?
                Users of this list will also be deleted.
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeList()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="container ">
        <h1 class="mb-3 pb-3 text-center text-white fw-bolder mt-5">All Lists</h1>

        <div class="d-flex justify-content-center">
          <div v-show="showSpinner" class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>

        <div>
          <div v-show="showListsImage" class="text-center">
            <img src="../images/oops.png" alt="no list">
            <h3 class="mt-5">You don't have any list</h3>
          </div>


          <div v-show="showListsTable" class="text-center">

            <div class="bg-body rounded">

              <table class="table listTable mt-5">
                <thead>
                  <tr>
                    <th scope="col">List Name</th>
                    <th scope="col">Users</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="list in lists" :key="list._id">
                    <td data-label="List Name">{{ list.listName }}</td>
                    <td data-label="Users"> <button @click="userList(list._id)" type="button"
                        class="btn btn-primary btn-sm">Users list</button></td>
                    <td data-label="Description">{{ list.description }}</td>
                    <td data-label="Action"><button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click="getListId(list._id)">
                        Delete
                      </button></td>


                    <!-- <button @click="removeList(list._id)" type="button" class="btn btn-danger btn-sm">Delete</button> -->
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

          <div class="text-center">
            <button @click="addList()" type="button" class="btn btn-primary m-5">Add List</button>
          </div>
        </div>



        <div>


          <div v-show="showUsersImage" class="text-center">
            <h1 class="text-center text-white fw-bolder m-5">All Users</h1>
            <img src="../images/oops.png" alt="no list">
            <h3 class="mt-5">No email is there</h3>
            <div class="text-center">
              <button @click="addUser()" type="button" class="btn btn-primary m-5">Add an Email</button>
            </div>
          </div>


          <div v-show="showUsersTable" class="text-center">
            <hr>

            <h1 class="mb-3 pb-3 text-center text-white fw-bolder mt-5">All Users</h1>

            <div class="bg-body rounded">

              <table class="table userTable mt-5">
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
                    <td data-label="Action"><button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
                        data-bs-target="#exampleModal1" @click="getMemberId(user._id)">
                        Delete
                      </button></td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div class="text-center">
              <button @click="addUser()" type="button" class="btn btn-primary m-5">Add an Email</button>
            </div>
          </div>
        </div>

      </div>




    </section>
  </div>

</template>

<script>
import { SearchList, SearchUserEmail, DeleteList, DeleteMember } from '../services/allLists'
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
      SearchUserId: "",
      listId: "",
      memberId: "",
      userId: localStorage.getItem('userId'),
      showSpinner: true,
      showListsImage: false,
      showUsersImage: false,
      showListsTable: true,
      showUsersTable: false,
    };
  },
  methods: {

    async userList(id) {
      this.SearchUserId = id;
      console.log("is:", id);
      const result = await SearchUserEmail(id)

      this.showUsersTable = true;
      this.showUsersImage = false;
      this.usersEmails = result.data.data

      if (!this.usersEmails.length) {
        this.showUsersImage = true;
        this.showUsersTable = false;
      }
    },

    addUser() {
      this.$router.push({ name: "addEmail" });
    },

    addList() {
      this.$router.push({ name: "addList" });
    },

    getListId(_id) {
      this.listId = _id;
      console.log("List Id: ", this.listId);
    },

    getMemberId(_id) {
      this.memberId = _id;
      console.log("memberId", this.memberId);
    },

    async removeList() {

      const result = await DeleteList(this.listId)
      if (result.data.status == "SUCCESS") {

        const response = await SearchList(this.userId);
        if (response.data.status === "FAILED") {
          this.showListsImage = true;
          this.showListsTable = false;
        }
        else {
          this.lists = response.data.data;
          const result = await SearchUserEmail(this.listId);
          this.usersEmails = result.data.data

          if (!this.usersEmails.length) {
            this.showUsersImage = true;
            this.showUsersTable = false;
          }
        }
        this.$toasted.show(result.data.message, {
          type: 'success'
        });

      }
      else {
        this.$toasted.show(result.data.message, {
          type: 'error'
        });
      }

    },


    async removeMember() {
      console.log("memberId", this.memberId);
      const result = await DeleteMember(this.memberId)

      if (result.data.message === "No Email is there") {
        this.$toasted.show(result.data.message, {
          type: 'error'
        });
      }
      else {
        this.$toasted.show(result.data.message, {
          type: 'success'
        });

        const response = await SearchUserEmail(this.SearchUserId);

        this.usersEmails = response.data.data

        if (!this.usersEmails.length) {
          this.showUsersImage = true;
          this.showUsersTable = false;
        }
      }

    }
  },

  mounted() {

    SearchList(this.userId).then((response) => {
      if (response.data.status === "FAILED") {
        console.log("dataswaz", response.data.message);
        this.showSpinner = true;
        this.showListsImage = true;
        this.showListsTable = false;
      }
      this.showSpinner = false;
      this.lists = response.data.data;
    });
  },

}
</script>

<style>
@media(max-width: 775px) {
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