import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FrageKomponente from '../FrageKomponente.vue'


describe('FrageKomponente', () => {
  it('renders properly', () => {
    const wrapper = mount(FrageKomponente, { props: { title: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
