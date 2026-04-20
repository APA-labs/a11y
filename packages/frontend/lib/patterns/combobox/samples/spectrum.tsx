import './index.css'
import { ComboBox, Label, Group, Input, Button, Popover, ListBox, ListBoxItem } from 'react-aria-components'

const FRAMEWORKS = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'angular', name: 'Angular' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'solid', name: 'Solid' }
]

export default function App() {
  return (
    <div className='app'>
      <ComboBox>
        <Label className='label'>Framework</Label>
        <Group className='combobox-group'>
          <Input
            className='combobox-input'
            placeholder='Search...'
          />
          <Button className='combobox-btn'>
            <span aria-hidden>▼</span>
          </Button>
        </Group>
        <Popover className='select-popup'>
          <ListBox>
            {FRAMEWORKS.map((fw) => (
              <ListBoxItem
                key={fw.id}
                id={fw.id}
                className='combobox-item'>
                {fw.name}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  )
}
