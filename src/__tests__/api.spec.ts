import { describe, it, expect } from 'vitest'
import { getAccounts, getTransactions } from '../services/api'

describe('API service (mocked)', () => {
  it('loads accounts.json', async () => {
    const data = await getAccounts()
    expect(data).toHaveProperty('accountGroups')
  })

  it('loads transactions for known account', async () => {
    const res = await getTransactions('NL14ABNA4415260276')
    expect(res).toHaveProperty('transactions')
    expect(Array.isArray(res.transactions)).toBe(true)
  })
})
