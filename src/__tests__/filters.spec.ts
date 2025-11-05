import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AccountDetail from '../components/AccountDetail.vue'

describe('Filters', () => {
  describe('Search Filter', () => {
    it('filters transactions based on search query', async () => {
      const transactions = [
        { transactionId: '1', counterpartyName: 'Store A', description: 'Grocery Shopping', bookDate: '2025-11-01', amount: 50, creditDebitIndicator: 'DEBIT' },
        { transactionId: '2', counterpartyName: 'Cafe B', description: 'Restaurant Bill', bookDate: '2025-11-02', amount: 75, creditDebitIndicator: 'DEBIT' },
        { transactionId: '3', counterpartyName: 'Pump C', description: 'Gas Station', bookDate: '2025-11-03', amount: 40, creditDebitIndicator: 'DEBIT' }
      ]

      const wrapper = mount(AccountDetail, {
        props: {
          accountNumber: 'NL14ABNA4415260276'
        }
      })

      // Inject transactions and mark loading false to simulate fetched data
      ;(wrapper.vm as any).transactions = transactions
      ;(wrapper.vm as any).loading = false
      await nextTick()

      // find the search input by placeholder (matches component template)
      const search = wrapper.find('input[placeholder="Search transactions"]')
      await search.setValue('Grocery')
      await nextTick()

      const rows = wrapper.findAll('.account-row')
      expect(rows).toHaveLength(1)
      expect(wrapper.text()).toContain('Grocery Shopping')
    })
  })

  describe('Date Filter', () => {
    it('filters transactions based on date range', async () => {
      const transactions = [
        { transactionId: '1', counterpartyName: 'A', description: 'Past Transaction', bookDate: '2025-10-01', amount: 50, creditDebitIndicator: 'DEBIT' },
        { transactionId: '2', counterpartyName: 'B', description: 'Current Transaction', bookDate: '2025-11-05', amount: 75, creditDebitIndicator: 'DEBIT' },
        { transactionId: '3', counterpartyName: 'C', description: 'Future Transaction', bookDate: '2025-12-01', amount: 40, creditDebitIndicator: 'DEBIT' }
      ]

      const wrapper = mount(AccountDetail, {
        props: {
          accountNumber: 'NL14ABNA4415260276'
        }
      })

      ;(wrapper.vm as any).transactions = transactions
      ;(wrapper.vm as any).loading = false
      await nextTick()

      const dateInputs = wrapper.findAll('input[type="date"]')
      // set values on the two date inputs
      await dateInputs[0].setValue('2025-11-01')
      await dateInputs[1].setValue('2025-11-30')
      await nextTick()

      const visibleTransactions = wrapper.findAll('.account-row')
      expect(visibleTransactions).toHaveLength(1)
      expect(wrapper.text()).toContain('Current Transaction')
    })
  })
})