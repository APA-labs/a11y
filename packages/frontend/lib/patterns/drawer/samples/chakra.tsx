import './index.css'
import { Button, Drawer, Stack } from '@chakra-ui/react'

const NAV_ITEMS = ['Home', 'About', 'Services', 'Contact']

export default function App() {
  return (
    <div className='app'>
      <Drawer.Root placement='end'>
        <Drawer.Trigger asChild>
          <Button
            colorPalette='teal'
            variant='outline'>
            Open navigation
          </Button>
        </Drawer.Trigger>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Navigation</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <Button
                  variant='ghost'
                  aria-label='Close navigation drawer'
                  className='dialog-close-top-right'>
                  ✕
                </Button>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <nav aria-label='Main navigation'>
                <Stack gap={2}>
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item}
                      href={'#' + item.toLowerCase()}
                      className='link-plain'>
                      {item}
                    </a>
                  ))}
                </Stack>
              </nav>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant='outline'>Close</Button>
              </Drawer.ActionTrigger>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </div>
  )
}
