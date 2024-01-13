import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FrageKomponente from '../FrageKomponente.vue'

describe('FrageKomponente', () => {
  it('renders properly', () => {
    const wrapper = mount(FrageKomponente, { props: { title: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
  // Test für das Rendering des bereitgestellten Titels
  it('renders provided title', async () => {
    const title = 'Custom Title'
    const wrapper = mount(FrageKomponente, { props: { title } })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.quiz-title').text()).toContain(title)
  })


})
