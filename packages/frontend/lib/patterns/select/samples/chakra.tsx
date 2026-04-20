import './index.css'
import { useState } from 'react'
import { Select, useListCollection } from '@chakra-ui/react'

const COUNTRIES = [
  { label: 'South Korea', value: 'kr' },
  { label: 'United States', value: 'us' },
  { label: 'Japan', value: 'jp' },
  { label: 'Germany', value: 'de' }
]

export default function App() {
  const [value, setValue] = useState<string[]>([])
  const { collection } = useListCollection({ initialItems: COUNTRIES })

  return (
    <div className='p-24 max-w-320'>
      <Select.Root
        collection={collection}
        value={value}
        onValueChange={(e) => setValue(e.value)}>
        <Select.Label>Country</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder='Select a country' />
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item
                key={item.value}
                item={item}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect name='country' />
      </Select.Root>
    </div>
  )
}
