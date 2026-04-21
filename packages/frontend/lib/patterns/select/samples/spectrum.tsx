import './index.css'
import { Select, Label, Button, SelectValue, Popover, ListBox, ListBoxItem } from 'react-aria-components'

const ANIMALS = [
  { id: 'aardvark', name: 'Aardvark' },
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'kangaroo', name: 'Kangaroo' },
  { id: 'panda', name: 'Panda' }
]

export default function App() {
  return (
    <div className='p-24'>
      <Select placeholder='Select an animal'>
        <Label className='label'>Favorite Animal</Label>
        <Button className='select-trigger'>
          <SelectValue />
          <span aria-hidden>▼</span>
        </Button>
        <Popover className='select-popup'>
          <ListBox>
            {ANIMALS.map((animal) => (
              <ListBoxItem
                key={animal.id}
                id={animal.id}
                className='select-item'>
                {animal.name}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </div>
  )
}
