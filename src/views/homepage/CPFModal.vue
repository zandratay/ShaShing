<template>
  <div class="modal-overlay" :class="{ 'active': isVisible }" @click="closeModal"></div>
  
  <div class="modal" v-if="isVisible">
    <span class="close" @click="close">&times;</span>
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Logo_of_the_Central_Provident_Fund_Board_%28Singapore%29.svg/150px-Logo_of_the_Central_Provident_Fund_Board_%28Singapore%29.svg.png"
            style="height: 80px; width: 80px; float:left; margin-right: 10px">
      <h1> CPF </h1>
      <div class="modal-content">
        <div class="headerContainer">
          <span>Amount</span>
          <span>Account</span>
        </div>
      <div v-for="(item, index) in cpf" :key="index" class="pointDiv">
        <div class="investmentContainer">
          <span>{{ item.amount }}</span>
          <span>{{ item.selectAccount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, getDoc, doc } from "firebase/firestore";
import app from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default {
  props: [
      'isVisible',
      'isUpdateCPF',
      "openInvestment",
      "isClicked"
    ],

    data() {
      return {
        modals: {
          cpf: false,
        },
        cpf: [],
      };
    },

    watch: {
      isVisible(newVal, oldVal) {
        if (newVal === true) {
          this.fetchCPF();
        }
      }
    },

    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          // Now that we have a user, fetch their data
          this.fetchCPF();
        } else {
          // Handle user not logged in
          this.user = null;
        }
      });
    },


    mounted() {
      this.fetchCPF();
    },

  methods: {
    close() {
      this.$emit('update:isVisible', false);
    },

    async fetchCPF() {
        if (this.user) {
          const userId = this.user.uid;
          var db = getFirestore(app);
          const docRef = doc(db, "users", userId);
          const data = await getDoc(docRef);
          if (data.exists()) {
            this.cpf = data.data().cpf;
          }
        }
      },
  }
}
</script>
