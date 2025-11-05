import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AccountList from '../components/AccountList.vue'
import AccountDetail from '../components/AccountDetail.vue'
import * as api from '../services/api'

describe('UI Components', () => {
  describe('Initial Loading State', () => {
    it('shows loading indicator before data is loaded', () => {
      const wrapper = mount(AccountList)
      expect(wrapper.text()).toContain('Loading accounts...')
    })
  })

  describe('AccountList Component', () => {
    const mockData = {
      accountGroups: [
        {
          groupId: 'current',
          groupName: 'Current Accounts',
          accounts: [{ accountNumber: 'NL14ABNA4415260276', productName: 'Current Account 1', holderName: 'User A', currencyCode: 'EUR' }]
        },
        {
          groupId: 'savings',
          groupName: 'Savings Accounts',
          accounts: [
            { accountNumber: 'NL18ABNA5476393838', productName: 'Savings Account 1', holderName: 'User B', currencyCode: 'EUR' } ]
        }
      ]
    }

    beforeEach(() => {
      vi.spyOn(api, 'getAccounts').mockResolvedValue(mockData)
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('renders account lists correctly', async () => {
      const wrapper = mount(AccountList)
      await nextTick()
      await nextTick()

      // Initial state: current accounts visible
      expect(wrapper.text()).toContain('Current Account 1')
      expect(wrapper.text()).not.toContain('Savings Account 1')
    })

    it('switches between Current and Savings tabs correctly', async () => {
      const wrapper = mount(AccountList)
      await nextTick()
      await nextTick()

      // Switch to savings tab
      await wrapper.find('[data-testid="savings-tab"]').trigger('click')
      await nextTick()

      // Savings accounts visible, current accounts hidden
      expect(wrapper.text()).toContain('Savings Account 1')
      expect(wrapper.text()).not.toContain('Current Account 1')    
    })
  })

  describe('AccountDetail Component', () => {
    const mockTransactions = [
      {
        transactionId: '1',
        amount: 100.50,
        description: 'Test Transaction',
        bookDate: '2025-11-05',
        transactionDateTime: '',
        creditDebitIndicator: '',
        counterpartyAccountNumber: '',
        counterpartyName: ''
      }
    ]

    beforeEach(() => {
      vi.spyOn(api, 'getTransactions').mockResolvedValue({ transactions: mockTransactions })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('renders transaction details correctly', async () => {
      const wrapper = mount(AccountDetail, {
        props: { accountNumber: 'NL14ABNA4415260276' }
      })

      await nextTick()
      await nextTick()

      expect(wrapper.text()).toContain('Test Transaction')
      expect(wrapper.text()).toContain('€100.50')
      expect(wrapper.text()).toContain('2025-11-05')
    })
  })
})