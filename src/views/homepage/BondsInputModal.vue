<template>
  <div
    class="modal-overlay"
    :class="{ active: isOpened }"
    @click="closeModal"
  ></div>

  <div class="modal" v-if="isOpened">
    <div class="investment">
      <text class="addInvestment">Bonds</text>
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
          <label>Bond Name</label>
          <input
            v-model="bondName"
            placeholder="Enter bond name"
            class="selectInputs"
          />
          <label class="inputDiv">Total Holdings</label>
          <input
            type="number"
            v-model="purchasePrice"
            placeholder="Enter total holdings"
            class="selectInputs"
          />
          <label class="inputDiv">Country name</label>
          <div class="selectButtons">
            <button @click="openDropDown" class="buttonBg">
              {{ selectedCountry ? selectedCountry : "Select Country" }}
            </button>
          </div>
          <div v-if="dropDown">
            <div class="investments">
              <button @click="selectCountry('USA')" class="buttonBg">
                USA
              </button>
            </div>
            <div class="investments">
              <button @click="selectCountry('Singapore')" class="buttonBg">
                Singapore
              </button>
            </div>
          </div>
        </div>
        <div class="forms">
          <div class="forms">
            <label>Identification No.</label>
            <input
              v-model="identificationNo"
              placeholder="Enter identification no"
              class="selectInputs"
            />
          </div>
          <div class="forms">
            <label class="inputDiv">Purchase date</label>

            <input
              v-model="purchaseDate"
              placeholder="Enter purchase date"
              class="selectInputs"
              type="date"
              @input="validateDate(purchaseDate)"
            />
            <div v-if="dateError" class="error">{{ dateError }}</div>
          </div>
        </div>
      </div>
      <div class="nextButton">
        <button class="whiteButton" @click="submit">Submit</button>
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
      dropDown: false,
      selectedCountry: "",
      bondName: "",
      purchasePrice: "",
      identificationNo: "",
      purchaseDate: "",
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
      this.$emit("isEmitBonds", false);
      this.$emit("bondsSubmitted", true);
      this.selectedCountry = "";
      this.bondName = "";
      this.purchasePrice = "";
      this.purchaseDate = "";
      this.identificationNo = "";
      this.dateError = "";
    },

    openDropDown() {
      this.dropDown = !this.dropDown;
    },

    selectCountry(countryName) {
      this.selectedCountry = countryName;
      this.dropDown = false;
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
            bonds: [
              {
                bondName: this.bondName,
                amount: this.purchasePrice,
                selectedCountry: this.selectedCountry,
                identificationNo: this.identificationNo,
                purchaseDate: inputDate,
              },
            ],
            cpf: [],
            stocks: [],
            others: [],
          });
        } else {
          const existing = data.data().bonds;
          await updateDoc(docRef, {
            bonds: [
              ...existing,
              {
                bondName: this.bondName,
                amount: this.purchasePrice,
                selectedCountry: this.selectedCountry,
                identificationNo: this.identificationNo,
                purchaseDate: inputDate,
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