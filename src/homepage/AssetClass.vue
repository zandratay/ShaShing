<template>
    <div class="assets-container">
        <div class="assets" @click="openModal('Cash')"> <strong> Cash </strong> </div>
        <div class="assets" @click="openModal('Stocks')"> <strong> Stocks </strong> </div>
        <div class="assets" @click="openModal('Bonds')"> <strong> Bonds </strong> </div>
        <div class="assets" @click="openModal('CPF')"> <strong> CPF </strong> </div>
        <CashModal v-model:isVisible="modals.cash" />
        <StocksModal v-model:isVisible="modals.stocks" />
        <BondsModal v-model:isVisible="modals.bonds" />
        <CPFModal v-model:isVisible="modals.cpf" />
    </div>
</template>


<script>
import CashModal from './CashModal.vue'; 
import BondsModal from './BondsModal.vue'; 
import StocksModal from './StocksModal.vue'; 
import CPFModal from './CPFModal.vue'; 

export default {

    
    components: {
        CashModal,
        BondsModal,
        StocksModal,
        CPFModal,
    },

    props: ['openInvestment', 'isClicked'],

    data() {
        return {
            modals: {
                cash: false,
                stocks: false,
                bonds: false,
                cpf: false
            },
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
    }
}
</script>
