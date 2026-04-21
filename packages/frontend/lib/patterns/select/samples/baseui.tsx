import './index.css'
import { Select } from '@base-ui/react/select'

const FRUITS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Mango', value: 'mango' }
]

export default function App() {
  return (
    <div className='p-24'>
      <Select.Root>
        <Select.Label className='label'>Favorite fruit</Select.Label>
        <Select.Trigger className='select-trigger'>
          <Select.Value placeholder='Select a fruit' />
          <Select.Icon>
            <span aria-hidden>▼</span>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={8}>
            <Select.Popup className='select-popup'>
              <Select.List>
                {FRUITS.map(({ label, value }) => (
                  <Select.Item
                    key={value}
                    value={value}
                    className='select-item'>
                    <Select.ItemIndicator className='item-indicator'>
                      <span aria-hidden>✓</span>
                    </Select.ItemIndicator>
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
