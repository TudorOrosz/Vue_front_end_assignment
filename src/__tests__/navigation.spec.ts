// import { describe, it, expect, vi } from 'vitest'
// import { mount } from '@vue/test-utils'
// import { createRouter, createWebHistory } from 'vue-router'
// import AccountList from '../components/AccountList.vue'

// describe('Navigation', () => {
//   it('navigates to account details when account is clicked', async () => {
//     const router = createRouter({
//       history: createWebHistory(),
//       routes: [
//         {
//           path: '/account/:accountNumber',
//           name: 'account-detail',
//           component: { template: '<div></div>' }
//         }
//       ]
//     })

//     const mockPush = vi.spyOn(router, 'push')
    
//     const wrapper = mount(AccountList, {
//       global: {
//         plugins: [router]
//       },
//       data() {
//         return {
//           accountGroups: {
//             current: [
//               { name: 'Test Account', accountNumber: 'NL14ABNA4415260276' }
//             ]
//           }
//         }
//       }
//     })

//     await wrapper.find('[data-testid="account-row"]').trigger('click')
    
//     expect(mockPush).toHaveBeenCalledWith({
//       name: 'account-detail',
//       params: { accountNumber: 'NL14ABNA4415260276' }
//     })
//   })
// })