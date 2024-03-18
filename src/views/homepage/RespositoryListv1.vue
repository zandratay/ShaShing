<template>
    <div v-for="c in stockList" class="card-container">
        <div class="card" :class="{ expanded: cardsParameters.find((x) => x.stock == c)?.isExpanded }" @click="toggleExpand(c)">
            <div class="card-header">
                <h2> {{ c }} </h2>
            </div>
        </div>

        <div class="cardExpand" v-show="cardsParameters.find(x => x.stock == c)?.isExpanded">
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
                        <td v-for="cell in specificStockFillings(c).slice(sliceFillingsToTable().beginning, sliceFillingsToTable().end)[row - 1]" class = "stock-repository-table-body-cell">
                            {{ cell }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <p style = "text-align: center;"> Page at: {{ pageAt }} of {{ totalPages(specificStockFillings(c)) }}</p>
            <button @click="previousPage()"> previous </button>
            <button @click="nextPage(specificStockFillings(c))"> next </button> -->
        </div>

    </div>
    <!-- <p> {{ filings }} </p> -->

</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            isExpanded: false,
            stockList: ["AAPL", "NVDA", "MSFT"],
            cardsParameters: [],
            apiKey: '2d9f5b055f186cd9e147ffe1764fafbb5b9e0125290e7b703a8bd939e7cb932a',
            filings: [],
            tableHeader: ['Date', 'Report Type', 'Link'],
            pageAt: 1,
            rowsPerPage: 5
        };
    },
    methods: {
        queryString(listOfTickers) {
            let qString = ""
            for (let i = 0; i < listOfTickers.length; i++) {
                // qString += '\"'
                qString += listOfTickers[i]
                // qString += '\"'
                if (i != listOfTickers.length - 1) {
                    qString += " OR "
                }
            };
            console.log(qString)
            return qString
            
        },
        async fetchData(ticker) {
            const postData = {
                query: ticker,
                formTypes: ["10-Q"],
                startDate: "2019-02-10",
                endDate: "2024-02-10",
                page: "1"
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
                console.log(fil);

                // filter filings to be exactly based on ticker inserted and exact quarterly financial report
                fil = fil.filter((el) => {
                    return this.stockList.includes(el.ticker);
                });

                fil = fil.filter(function (el) {
                    return el.description == "10-Q";
                })

                // sort filings based on newest filings first
                fil = fil.sort((x, y) => {
                    return new Date(x.filedAt) < new Date(y.filedAt) ? 1 : -1;
                })
                this.filings = fil;
                console.log(fil);

            } catch (error) {
                this.error = error.toString();
            }
        },
        specificStockFillings(stockTicker) {
            let stockFillings = this.filings.filter((x) => {
                return x.ticker == stockTicker;
            });

            stockFillings = stockFillings.map((item) => {
                return {
                    'date':item.filedAt,
                    'reportType':item.formType,
                    'URL':item.filingUrl
                }
            });
            return stockFillings;
        },
        nextPage(arr){
            if (this.pageAt < this.totalPages(arr)) {
                this.pageAt += 1
            }
        },
        previousPage(){
            if (this.pageAt > 1) {
                this.pageAt -= 1
            }
        },
        totalPages(arr){
            return Math.ceil(arr.length / this.rowsPerPage);
        },
        sliceFillingsToTable() {
            let beginningRowToSliceAt = (this.pageAt - 1) * this.rowsPerPage;
            let lastRowToSliceAt = (this.pageAt - 1) * this.rowsPerPage + this.rowsPerPage
            return { beginning: beginningRowToSliceAt, end: lastRowToSliceAt }
        },
        toggleExpand(st) {
            let obj = this.cardsParameters.find(x => x.stock == st);
            if (obj) {
                obj.isExpanded = !obj.isExpanded; 
                return obj.isExpanded; 
            } 
            return null;
        },        
    },
    async mounted() {
        this.cardsParameters = this.stockList.map(stock => ({ stock: stock, isExpanded: false, pageAt: 1 }));
        let queueString = this.queryString(this.stockList);
        console.log(queueString);
        await this.fetchData(queueString);
    }
}
</script>
