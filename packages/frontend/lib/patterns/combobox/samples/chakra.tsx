import './index.css'
import { Combobox, useListCollection } from '@chakra-ui/react'

const frameworks = ['React', 'Vue', 'Angular', 'Svelte'].map((f) => ({ label: f, value: f.toLowerCase() }))

export default function App() {
  const { collection } = useListCollection({ initialItems: frameworks })
  return (
    <Combobox.Root
      collection={collection}
      placeholder='Select framework'>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger aria-label='Clear selection' />
          <Combobox.Trigger aria-label='Open list' />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No results</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item
              key={item.value}
              item={item}>
              {item.label}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}
