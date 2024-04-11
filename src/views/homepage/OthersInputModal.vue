<template>
  <div
    class="modal-overlay"
    :class="{ active: isOpened }"
    @click="closeModal"
  ></div>

  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">Others</text>
      <button @click="close" class="buttonBgFit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M6.707 6.293c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l4.793 4.793-4.793 4.793c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0l4.793-4.793 4.793 4.793c.39.39 1.023.39 1.414 0 .39-.39.39-1.023 0-1.414l-4.793-4.793 4.793-4.793c.39-.39.39-1.023 0-1.414-.39-.39-1.023-.39-1.414 0l-4.793 4.793-4.793-4.793z"
          />
        </svg>
      </button>
    </div>
    <div class="formDiv">
      <div class="investment">
        <div class="forms">
          <label>Asset Name</label>
          <input
            v-model="assetName"
            placeholder="Enter asset name"
            class="selectInputs"
          />
          <label class="inputDiv">Holdings (S$)</label>
          <input
            v-model="purchasePrice"
            placeholder="Enter total holdings"
            class="selectInputs"
          />
        </div>
        <div class="forms">
          <div class="forms">
            <label>Purchase Date</label>
            <input
              v-model="purchaseDate"
              placeholder="Enter purchase date"
              class="selectInputs"
              type="date"
              @input="validateDate(purchaseDate)"
            />
            <div v-if="dateError" class="error">{{ dateError }}</div>
          </div>
          <div class="forms">
            <label class="inputDiv">Description</label>
            <input
              v-model="description"
              placeholder="Enter description"
              class="selectInputs"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="nextButton">
          <button class="whiteButton" @click="submit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  collection,
  addDoc,
  getFirestore,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
export default {
  props: ["isOpened"],

  data() {
    return {
      assetName: "",
      purchasePrice: "",
      purchaseDate: "",
      description: "",
      user: null,
      dateError: "",
    };
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },

  methods: {
    close() {
      this.$emit("isEmitOthers", false);
      this.assetName = "";
      this.purchasePrice = "";
      this.purchaseDate = "";
      this.description = "";
      this.dateError = "";
    },

    validateDate(dateString) {
      if (!dateString.trim()) {
        this.dateError = "";
        return true; // Consider empty input as valid for this specific check
      }
      const inputDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset today's time to ensure accurate comparison

      if (inputDate > today) {
        this.dateError = "Date must not be in the future.";
        return false;
      } else {
        this.dateError = "";
        return true;
      }
    },

    async submit() {
      if (!this.validateDate(this.purchaseDate)) {
        this.dateError = "Format: DD/MM/YYYY.";
        return; // Exit the submit function early
      }

      this.dateError = "";
      if (this.user) {
        const userId = this.user.uid;
        var db = getFirestore(app);
        const docRef = doc(db, "users", userId);
        const data = await getDoc(docRef);
        const realDate = this.purchaseDate.split('-')
        const inputDate = realDate[2] + "/" + realDate[1] + "/" + realDate[0]

        if (!data.exists()) {
          await setDoc(docRef, {
            id: userId,
            cash: [],
            bonds: [],
            cpf: [],
            stocks: [],
            others: [
              {
                assetName: this.assetName,
                amount: this.purchasePrice,
                purchaseDate: inputDate,
                description: this.description,
              },
            ],
          });
        } else {
          const existing = data.data().others;
          await updateDoc(docRef, {
            others: [
              ...existing,
              {
                assetName: this.assetName,
                amount: this.purchasePrice,
                purchaseDate: inputDate,
                description: this.description,
              },
            ],
          });
        }

        console.log("successful");
        this.close();
      }
    },
  },
};
</script>
