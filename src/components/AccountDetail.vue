<script lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getTransactions } from '../services/api'

export default {
  name: 'AccountDetail',
  props: ['accountNumber'],
  setup(props: any) { //why this
    const router = useRouter()
    const accountNumber = props.accountNumber
    const loading = ref(true)
    const transactions = ref<Array<any>>([])
    const query = ref('')
    const dateFrom = ref('')
    const dateTo = ref('')

    onMounted(async () => {
      const res = await getTransactions(accountNumber)
      transactions.value = res.transactions || []
      loading.value = false
    })

    const filtered = computed(() => {
      return transactions.value.filter(t => {
        const matchesQuery = !query.value || JSON.stringify(t).toLowerCase().includes(query.value.toLowerCase())
        const d = t.bookDate
        const afterFrom = !dateFrom.value || d >= dateFrom.value
        const beforeTo = !dateTo.value || d <= dateTo.value
        console.log(matchesQuery, afterFrom, beforeTo)
        return matchesQuery && afterFrom && beforeTo
      })
    })

    function formatAmount(n: number) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(n)
    }

    function goBack() {
      router.push('/')
    }

    return { accountNumber, loading, transactions, query, dateFrom, dateTo, filtered, formatAmount, goBack }
  }
}
</script>

<template>
  <div class="card">
    <div class="header">
      <button class="btn" @click="goBack">← Back</button>
      <h2 class="account-title">{{ accountNumber }}</h2>
    </div>
    <div v-if="loading" class="loading">Loading transactions...</div>
    <div v-else class="content">
      <div class="search-row">
        <input v-model="query" placeholder="Search transactions" />
        <input type="date" v-model="dateFrom" />
        <input type="date" v-model="dateTo" />
      </div>
      <div v-if="filtered.length === 0" class="muted">No transactions match.</div>
      <div class="list">
        <div v-for="t of filtered" :key="t.transactionId" class="account-row">
          <div>
            <div><strong>{{ t.counterpartyName }}</strong></div>
            <div class="muted">{{ t.description }}</div>
          </div>
          <div>
            <div :class="{'muted': t.creditDebitIndicator === 'DEBIT'}">{{ formatAmount(t.amount) }}</div>
            <div class="muted">{{ t.bookDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>