import { Tooltip, Button, Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack
      direction='row'
      gap={4}
      className='p-32'
      wrap='wrap'>
      <Tooltip.Root
        openDelay={300}
        closeDelay={100}>
        <Tooltip.Trigger asChild>
          <Button
            colorPalette='teal'
            variant='solid'>
            Save
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Save your current changes (Ctrl+S)
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>

      <Tooltip.Root
        openDelay={300}
        closeDelay={100}>
        <Tooltip.Trigger asChild>
          <Button
            variant='outline'
            aria-label='Copy to clipboard'>
            ⎘
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Copy to clipboard
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Stack>
  )
}
