import './index.css'
import { Badge, HStack, Stack, Text } from '@chakra-ui/react'

export default function App() {
  return (
    <div className='app'>
      <Stack gap='16px'>
        <HStack gap='8px'>
          <Text>Deployment:</Text>
          <Badge colorPalette='green'>Ready</Badge>
        </HStack>
        <HStack gap='8px'>
          <Text>Build:</Text>
          <Badge colorPalette='red'>Failed</Badge>
        </HStack>
        <HStack gap='8px'>
          <Text>Plan:</Text>
          <Badge
            colorPalette='purple'
            variant='solid'>
            Pro
          </Badge>
          <Badge
            colorPalette='gray'
            variant='outline'>
            Beta
          </Badge>
        </HStack>
      </Stack>
    </div>
  )
}
