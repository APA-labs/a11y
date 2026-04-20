import './index.css'
import { useState } from 'react'
import { RadioGroup, HStack } from '@chakra-ui/react'

export default function App() {
  const [value, setValue] = useState('option-1')

  return (
    <div className='app'>
      <RadioGroup.Root
        value={value}
        onValueChange={(e) => setValue(e.value ?? '')}
        aria-label='Select option'>
        <HStack gap={4}>
          <RadioGroup.Item value='option-1'>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value='option-2'>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value='option-3'>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Option 3</RadioGroup.ItemText>
          </RadioGroup.Item>
        </HStack>
      </RadioGroup.Root>
    </div>
  )
}
