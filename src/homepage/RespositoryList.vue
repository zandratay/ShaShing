<template>
    <div class="assets-container">
        <!-- <div class="assets" @click="openModal('Cash')"> <strong> Cash </strong> </div>
        <div class="assets" @click="openModal('Stocks')"> <strong> Stocks </strong> </div>
        <div class="assets" @click="openModal('Bonds')"> <strong> Bonds </strong> </div>
        <div class="assets" @click="openModal('CPF')"> <strong> CPF </strong> </div> -->
        <div class="card" :class="{ expanded: isExpanded }" @click="isExpanded = !isExpanded">
            <div class="card-header">
                <h2> Card Title </h2>
            </div>
        </div>

        <div class="cardExpand" v-show="isExpanded">
            <p> This is some content that will show up when the card is expanded. Click the card to toggle. </p>
            <table class = "stock-repository-table">
                <thead>
                    <tr>
                        <th v-for="header in ['test', 'hi', 'there']" > {{ header }} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in [1,2,4]">
                        <td v-for="cell in ['test', 'hi', 'there']">
                            {{ cell }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p> {{ filings }} </p>
        <!-- <CashModal v-model:isVisible="modals.cash" />
        <StocksModal v-model:isVisible="modals.stocks" />
        <BondsModal v-model:isVisible="modals.bonds" />
        <CPFModal v-model:isVisible="modals.cpf" /> -->
    </div>
</template>


<script>
import CashModal from './CashModal.vue'; 
import BondsModal from './BondsModal.vue'; 
import StocksModal from './StocksModal.vue'; 
import CPFModal from './CPFModal.vue'; 

import axios from 'axios';

export default {
    components: {
        CashModal,
        BondsModal,
        StocksModal,
        CPFModal
    },
    data() {
        return {
            isExpanded: false,
            modals: {
                cash: false,
                stocks: false,
                bonds: false,
                cpf: false
            },
            apiKey: '1cd758d99b72ba099d116f339f8bc0170ca1bfc1665c25189dddcbc4ca107748',
            filings: null,
        };
    },
    methods: {
        openModal(asset) {
            // First, set all modals to false to ensure only one can be open at a time
            for (let key in this.modals) {
                this.modals[key] = false;
            }
            
            // Now, open the correct modal
            if (asset === 'Cash') {
                this.modals.cash = true;
            } else if (asset === 'Bonds') {
                this.modals.bonds = true;
            } else if (asset === 'Stocks') {
                this.modals.stocks = true;
            } else if (asset === 'CPF') {
                this.modals.cpf = true;
            }
        },
        async fetchData(ticker) {
            const postData = {
                query: ticker,
                formTypes: ["10-Q"],
                startDate: "2021-12-31",
                endDate: "2024-02-10"
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey
                },
                url: 'https://api.sec-api.io/full-text-search',
                data: postData
            };

            try {
                const response = await axios(options);
                let fil = response.data.filings;
                // filter filings to be exactly based on ticker inserted and exact quarterly financial report
                fil = fil.filter(function (el) {
                    return el.ticker == ticker ;
                });

                fil = fil.filter(function (el) {
                    // console.log(el.formType);
                    // console.log(el);
                    return el.description == "10-Q" ;
                });

                // sort filings based on newest filings first
                fil = fil.sort((x, y) => {
                    return new Date(x.filedAt) < new Date(y.filedAt) ? 1 : -1;
                })
                this.filings = fil;
            } catch (error) {
                this.error = error.toString();
            }
        }

        
    },
    mounted() {
        this.fetchData("META");
    }
}
</script>
