<template>
    <div class="assets-container">
        <div class="card" :class="{ expanded: isExpanded }" @click="isExpanded = !isExpanded">
            <div class="card-header">
                <h2> Card Title </h2>
            </div>
        </div>

        <div class="cardExpand" v-show="isExpanded">
            <p> This is some content that will show up when the card is expanded. Click the card to toggle. </p>
            <table class = "stock-repository-table">
                <thead>
                    <tr class = "stock-repository-table-head-row">
                        <th v-for="header in tableHeader" class = "stock-repository-table-head-cell"> 
                            {{ header }} 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rowsPerPage" class = "stock-repository-table-body-row">
                        <td v-for="cell in dummyCells.slice(sliceFillingsToTable().beginning, sliceFillingsToTable().end)[row - 1]" class = "stock-repository-table-body-cell">
                            {{ cell }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p style = "text-align: center;"> Page at: {{ pageAt }} of {{ totalPages() }}</p>
            <button @click="previousPage()"> previous </button>
            <button @click="nextPage()"> next </button>
        </div>

        <p> {{ filings }} </p>
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
            stockList: ["AAPL", 'MSFT'],
            apiKey: '2d9f5b055f186cd9e147ffe1764fafbb5b9e0125290e7b703a8bd939e7cb932a',
            filings: null,
            tableHeader: ['Date', 'Report Type', 'Link'],
            pageAt: 1,
            rowsPerPage: 5,
            dummyCells: [[1,2,3],[4,5,6],[7,8,9],[10,11,"hi"],[13,14,15], [16,17,18], [19,20,1]]
        };
    },
    methods: {
        queryString(listOfTickers) {
            let qString = ""
            for (let i = 0; i < listOfTickers.length; i++) {
                qString += listOfTickers[i]
                if (i != listOfTickers.length - 1) {
                    qString += " OR "
                }
                // console.log(listOfTickers[i]);
            };
            console.log(qString)
            return qString
            
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
                // console.log(fil);

                // filter filings to be exactly based on ticker inserted and exact quarterly financial report
                fil = fil.filter((el) => {
                    return this.stockList.includes(el.ticker);
                });
                // console.log(fil);

                fil = fil.filter(function (el) {
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
        },
        nextPage(){
            if (this.pageAt < this.totalPages()) {
                this.pageAt += 1
            }
        },
        previousPage(){
            if (this.pageAt > 1) {
                this.pageAt -= 1
            }
        },
        totalPages(){
            // console.log(Math.ceil(this.dummyCells.length / this.rowsPerPage))
            return Math.ceil(this.dummyCells.length / this.rowsPerPage);
        },
        sliceFillingsToTable() {
            let beginningRowToSliceAt = (this.pageAt - 1) * this.rowsPerPage;
            let lastRowToSliceAt = (this.pageAt - 1) * this.rowsPerPage + this.rowsPerPage
            return { beginning: beginningRowToSliceAt, end: lastRowToSliceAt}
        }

        
    },
    mounted() {
        let queueString = this.queryString(this.stockList);
        this.fetchData("\"AAPL\" OR \"MSFT\"");
        //"Gasoline \"Sacramento CA\" OR \"San Francisco CA\""
    }
}
</script>
