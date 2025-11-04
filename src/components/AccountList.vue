<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAccounts } from '../services/api'

export default {
  name: 'AccountList',
  setup() {
    const currentAccounts = ref<Array<any>>([])
    const savingsAccounts = ref<Array<any>>([])
    const loading = ref(true)
    const selectedTab = ref<'current'|'savings'>('current')
    const router = useRouter()

    onMounted(async () => {
        const data = await getAccounts()
        const groups = data.accountGroups || []
        const current = groups.find((g: any) => g.groupId === 'current')
        const savings = groups.find((g: any) => g.groupId === 'savings')
        currentAccounts.value = current ? current.accounts : []
        savingsAccounts.value = savings ? savings.accounts : []
        loading.value = false
    })

    function formatAmount(n: number) {
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(n)
    }

    function goToAccount(accountNumber: string) {
        router.push({ path: `/account/${accountNumber}` })
    }

    const currentTotal = computed(() => currentAccounts.value.reduce((s, a) => s + (a.balance ?? a.bookBalance ?? 0), 0))
    const savingsTotal = computed(() => savingsAccounts.value.reduce((s, a) => s + (a.balance ?? a.bookBalance ?? 0), 0))
    
    const selectedAccounts = computed(() => {
        return selectedTab.value === 'current' ? currentAccounts.value : savingsAccounts.value;
    });

    const selectedTotal = computed(() => {
        return selectedTab.value === 'current' ? currentTotal.value : savingsTotal.value;
    });

    return { currentAccounts, savingsAccounts, loading, formatAmount, goToAccount, selectedTab, currentTotal, savingsTotal, selectedAccounts, selectedTotal }
  }
}
</script>

<template>
    <div class="card">
        <div v-if="loading">Loading accounts...</div>
        <div v-else>
            <div class="tabs">
                <div :class="['tab', selectedTab === 'current' ? 'active' : '']" @click="selectedTab = 'current'">Current Accounts</div>
                <div :class="['tab', selectedTab === 'savings' ? 'active' : '']" @click="selectedTab = 'savings'">Savings Accounts</div>
            </div>
            <div>
                <div class="list">
                    <div v-for="acc of selectedAccounts" :key="acc.accountNumber" class="account-row" @click="goToAccount(acc.accountNumber)">
                        <div class="account-meta">
                            <div><strong>{{ acc.productName }}</strong></div>
                            <div class="muted">{{ acc.accountNumber }} • {{ acc.holderName }}</div>
                        </div>
                        <div style="text-align:right">
                            <div><strong>{{ formatAmount(acc.balance ?? acc.bookBalance) }}</strong></div>
                            <div class="muted">{{ acc.currencyCode ?? 'EUR' }}</div>
                        </div>
                    </div>
                </div>
                <div class="total-row card">
                    <div class="muted">Total {{ selectedTab }} accounts</div>
                    <div><strong>{{ formatAmount(selectedTotal) }}</strong></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.account-row { border-bottom: 1px solid #eef2f7; }
.account-row:last-child { border-bottom: none; }
.total-row { margin-top: 12px; }
</style>