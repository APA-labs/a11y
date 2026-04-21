import './index.css'
import { useState } from 'react'
import * as Select from '@radix-ui/react-select'

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'kr', label: 'South Korea' },
  { value: 'jp', label: 'Japan' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' }
]

export default function App() {
  const [value, setValue] = useState('')

  return (
    <div className='p-24'>
      <label
        htmlFor='country-trigger'
        className='label'>
        Country
      </label>
      <Select.Root
        value={value}
        onValueChange={setValue}>
        <Select.Trigger
          id='country-trigger'
          className='select-trigger'
          aria-label='Select country'>
          <Select.Value placeholder='Select a country' />
          <Select.Icon aria-hidden>▾</Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position='popper'
            sideOffset={4}
            className='select-popup'>
            <Select.Viewport>
              {COUNTRIES.map((country) => (
                <Select.Item
                  key={country.value}
                  value={country.value}
                  className='select-item'>
                  <Select.ItemIndicator aria-hidden>✓</Select.ItemIndicator>
                  <Select.ItemText>{country.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {value && <p className='hint mt-8'>Selected: {COUNTRIES.find((c) => c.value === value)?.label}</p>}
    </div>
  )
}
