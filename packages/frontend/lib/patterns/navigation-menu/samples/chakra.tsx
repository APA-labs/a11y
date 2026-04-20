import { Menu, Button } from '@chakra-ui/react'
;<nav aria-label='Main navigation'>
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant='ghost'>Products ▾</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value='web'>Web Products</Menu.Item>
        <Menu.Item value='mobile'>Mobile Products</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</nav>
