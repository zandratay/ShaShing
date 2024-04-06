<template>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">

    <div v-for="c in stockList" class="card-container">
        <div class="card" :class="{ expanded: isStockCardExpanded(c) }" @click="toggleExpand(c)">
            <div class="card-header">
                <h2> {{getCompanyname(c)}} ({{ c }})</h2>
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
            
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;"> 
                <button @click="pPage(c)" 
                    style="background:none; border:none; font-size:20px; cursor:pointer; "> 
                    <i class="fas fa-arrow-left"></i> 
                </button>
                <p style = "text-align: center"> Page: {{ cPage(c) }} of {{ tPages(c) }}</p>
                <button @click="nPage(c)" 
                    style="background:none; border:none; font-size:20px; cursor:pointer; "> 
                    <i class="fas fa-arrow-right"></i> 
                </button>
            </div>
            
        </div>

    </div>
    <div v-if="stockList.length == 0" class="card-container">
        <h2> You have not saved any stocks to your portfolio </h2>
    </div>

</template>


<script>
import axios from 'axios';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import app from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default {
    data() {
        return {
            initialStockList : [],
            stockCompanyName: [],
            stockList: [],
            cardsParameters: [],
            apiKey: 'cno43t1r01qpkl7ddec0cno43t1r01qpkl7ddecg',
            tableHeader: ['Date', 'Report Type', 'Link'],
            pageAt: 1,
            rowsPerPage: 5,
            user: null
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
                    let filteredStockTickerList = this.initialStockList.filter(item => item.startsWith(uppercaseQuery));
                    let indexesStockTicker = filteredStockTickerList.map(str => this.initialStockList.indexOf(str));

                    let lowercaseQuery = newQuery.toLowerCase();
                    let excludeTerms = ["corporation", "pte", "ltd", "inc", "inc."];
                    let filteredStockNameList = this.stockCompanyName.filter(item => 
                        item.split(" ").some(word => word.toLowerCase().startsWith(lowercaseQuery) &&
                        !excludeTerms.includes(word.toLowerCase()))
                    );
                    // let filteredStockNameList = this.stockCompanyName.filter(item => item.toLowerCase().includes(lowercaseQuery));
                    let indexesStockName = filteredStockNameList.map(str => this.stockCompanyName.indexOf(str));

                    // Concatenate the two index lists
                    let combinedIndexList = indexesStockTicker.concat(indexesStockName);

                    // Use Set to remove duplicates and convert it to get the uniquecombinedIndexList
                    let uniquecombinedIndexList = Array.from(new Set(combinedIndexList));
                    uniquecombinedIndexList.sort((a, b) => a - b);

                    const filteredList = uniquecombinedIndexList.map(index => this.initialStockList[index]);

                    this.stockList = filteredList;
                } else {
                    this.stockList = this.initialStockList;
                }

                
            }
        }
    },
    methods: {
        async stockFillingsToCardList(stockTicker, reportType) {
            try {
                const res = await axios.get(`https://finnhub.io/api/v1/stock/filings?symbol=${stockTicker}&form=${reportType}&token=${this.apiKey}`);
                const returnData = res.data.map((item) => {
                    return {
                        // Because initial acceptedDate contains the hh:mm::ss and we want to remove it, we split the string
                        'date':item.acceptedDate.split(' ')[0],
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
        },
        async fillStockListCardParameter() {
            this.stockList = this.initialStockList;
            const filingsPromises =  this.stockList.map(stock => this.stockFillingsToCardList(stock, "10-Q"));
            const filingsResults = await Promise.all(filingsPromises);

            const filingsPromises2 =  this.stockList.map(stock => this.stockFillingsToCardList(stock, "10-K"));
            const filingsResults2 = await Promise.all(filingsPromises2);

            this.cardsParameters = this.stockList.map((stock, index) => ({
                stock: stock,
                isExpanded: false,
                pageAt: 1,
                data: filingsResults[index].concat(filingsResults2[index]).sort((a, b) => new Date(b.date) - new Date(a.date))
            }));
        },
        toNotifyEmit() {
            // To send the top three latest reports to the Notification page 
            const toNotify = this.cardsParameters.map((item, index) => ({
                stock: item.stock,
                report: item.data.slice(0,3).map(item => item.reportType),
                date: item.data.slice(0,3).map(item => item.date)
            }));

            // console.log(toNotify);

            // Flatten the list to a single array of { date, stock } objects
            const flattenedList = toNotify.flatMap(stock =>
                stock.date?.map((date, index) => ({
                    date,
                    report: stock.report[index],
                    stock: stock.stock
                }))
            );
            // console.log(flattenedList);

            // Sort by date in descending order
            const sortedByDate = flattenedList.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Select the top three latest dates
            const topThree = sortedByDate.slice(0, 3);
            // console.log(topThree);

            this.$emit('notification-output', topThree);
            this.$emit('noSavedStocks', this.initialStockList.length == 0);
        },
        async fetchStock() {
            if (this.user) {
                const userId = this.user.uid;
                var db = getFirestore(app);
                const docRef = doc(db, "users", userId);
                const data = await getDoc(docRef);
                if (data.exists()) {
                    // this.stocks = data.data().stocks;
                    // console.log(data.data().stocks)

                    this.initialStockList = data.data().stocks.map((stock, index) => (
                        stock.tickerName
                    ));

                    this.stockCompanyName = data.data().stocks.map((stock, index) => (
                        stock.stockName
                    ));

                    // console.log(this.initialStockList);
                }

                await this.fillStockListCardParameter();

                this.toNotifyEmit();
                
            }
        },   
        getCompanyname(stockTicker) {
            const objIndex = this.cardsParameters.findIndex(obj => obj.stock === stockTicker);

            return this.stockCompanyName[objIndex];
        }   
    },
    async mounted() {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                // console.log("got user!");

                // Now that we have a user, fetch their data
                this.fetchStock();                

            } else {
                // Handle user not logged in
                this.user = null;
            }
        });

        // onAuthStateChanged();
        // Constant userID of 177889. To update 
        // const userId = "177889";
        // var db = getFirestore(app);
        // const docRef = doc(db, "users", userId);
        // const data = await getDoc(docRef);

        // console.log(data.data().stocks);

        // this.initialStockList = data.data().stocks.map((stock, index) => (
        //     stock.tickerName
        // ));

        // this.stockCompanyName = data.data().stocks.map((stock, index) => (
        //     stock.stockName
        // ));

    }
}
</script>
