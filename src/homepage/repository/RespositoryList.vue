<template>
    <div v-for="c in stockList" class="card-container">
        <div class="card" :class="{ expanded: isStockCardExpanded(c) }" @click="toggleExpand(c)">
            <div class="card-header">
                <h2> {{ c }} </h2>
            </div>
        </div>

        <div class="cardExpand" v-show="isStockCardExpanded(c)">
            <!-- <p> This is some content that will show up when the card is expanded. Click the card to toggle. </p> -->
            <table class = "stock-repository-table" >
                <thead>
                    <tr class = "stock-repository-table-head-row">
                        <th v-for="header in tableHeader" class = "stock-repository-table-head-cell"> 
                            {{ header }} 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in getDataForStock(c)?.slice(sliceFillingsToTable(c).beginning, sliceFillingsToTable(c).end)" class = "stock-repository-table-body-row">
                        <td v-for="cell in row" class = "stock-repository-table-body-cell">
                            <a v-if="cell.startsWith('https://')" :href="cell"> Link </a>
                            <p v-else>{{ cell }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p style = "text-align: center"> Page at: {{ cPage(c) }} of {{ tPages(c) }}</p>
            <button @click="pPage(c)"> previous </button>
            <button @click="nPage(c)"> next </button>
        </div>

    </div>

</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            initialStockList : ["AAPL", "NVDA", "MSFT", "JPM", "MS"],
            stockList: [],
            cardsParameters: [],
            apiKey: 'cno43t1r01qpkl7ddec0cno43t1r01qpkl7ddecg',
            tableHeader: ['Date', 'Report Type', 'Link'],
            pageAt: 1,
            rowsPerPage: 5
        };
    },
    props: {
        searchQuery: String
    },
    watch: {
        // Whenever the searchQuery changes, this function will run
        searchQuery(newQuery, oldQuery) {
            if (newQuery !== oldQuery) {

                if (newQuery !== "") {
                    let uppercaseQuery = newQuery.toUpperCase();
                    let filteredList = this.initialStockList.filter(item => item.includes(uppercaseQuery));
                    // console.log(filteredList);
                    this.stockList = filteredList;
                } else {
                    this.stockList = this.initialStockList;
                }

                
            }
        }
    },
    methods: {
        async stockFillingsToCardList(stockTicker) {
            try {
                const res = await axios.get(`https://finnhub.io/api/v1/stock/filings?symbol=${stockTicker}&form=10-Q&token=${this.apiKey}`)
                const returnData = res.data.map((item) => {
                    return {
                        'date':item.acceptedDate,
                        'reportType':item.form,
                        'URL':item.reportUrl
                    }
                });
                // console.log(returnData);
                return returnData;
            } catch (e) {
                console.log(e);
                return;
            }
        },
        sliceFillingsToTable(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            let pgAt = 1;
            if (objIndex !== -1) { 
                pgAt = this.cardsParameters[objIndex].pageAt;
            }

            let beginningRowToSliceAt = (pgAt - 1) * this.rowsPerPage;
            let lastRowToSliceAt = (pgAt - 1) * this.rowsPerPage + this.rowsPerPage
            return { beginning: beginningRowToSliceAt, end: lastRowToSliceAt }
        },
        toggleExpand(st) {
            // toggleExpands also makes sure that all other cards are minimised and pageAt for all cards are reset to 1
            let obj = this.cardsParameters.find(x => x.stock == st);
            if (obj) {
                let nextState = !obj.isExpanded; 
                this.cardsParameters = this.cardsParameters.map((obj, i) => {
                    return { ...obj, pageAt:1, isExpanded: false }
                });

                const objIndex = this.cardsParameters.findIndex(obj => obj.stock == st);
                if (objIndex !== -1) { 
                    this.cardsParameters[objIndex].isExpanded = nextState;
                }
                
                return nextState; 
            } 
            return false;
        },  
        isStockCardExpanded(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            if (objIndex !== -1) { 
                return this.cardsParameters[objIndex].isExpanded;
            }
            return false;
        },
        getDataForStock(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            if (objIndex !== -1) { 
                return this.cardsParameters[objIndex].data;
            }
            return [];
        },
        tPages(stockTicker){
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            if (objIndex !== -1) { 
                let len = this.cardsParameters[objIndex].data.length;
                return Math.ceil(len / this.rowsPerPage);
            }
            return 1;
        },
        cPage(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            if (objIndex !== -1) { 
                return this.cardsParameters[objIndex].pageAt;
            }
            return 1;
        },
        nPage(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            if (objIndex !== -1) { 
                let pgAt = this.cardsParameters[objIndex].pageAt
                if (pgAt < this.tPages(stockTicker)) {
                    this.cardsParameters[objIndex].pageAt = pgAt + 1;
                }   
            }
        },
        pPage(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);
            if (objIndex !== -1) { 
                let pgAt = this.cardsParameters[objIndex].pageAt
                if (pgAt > 1) {
                    this.cardsParameters[objIndex].pageAt = pgAt - 1;
                }  
            }
        }      
    },
    async mounted() {
        this.stockList = this.initialStockList;
        const filingsPromises =  this.stockList.map(stock => this.stockFillingsToCardList(stock));
        const filingsResults = await Promise.all(filingsPromises);

        this.cardsParameters = this.stockList.map((stock, index) => ({
            stock: stock,
            isExpanded: false,
            pageAt: 1,
            data: filingsResults[index]
        }));

        // console.log(this.cardsParameters);

    }
}
</script>
