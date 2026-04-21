import './index.css'
import { useState } from 'react'
import { DialogTrigger, Button, Popover, Dialog, Heading, Switch } from 'react-aria-components'

export default function App() {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)

  return (
    <div className='app'>
      <DialogTrigger>
        <Button className='btn'>⚙ Settings</Button>
        <Popover
          placement='bottom start'
          className='panel min-w-220 outline-none'>
          <Dialog className='outline-none'>
            <Heading
              slot='title'
              className='font-bold mt-0 mb-12'>
              Quick Settings
            </Heading>
            <div className='stack'>
              {[
                { label: 'Wi-Fi', isSelected: wifi, onChange: setWifi },
                { label: 'Bluetooth', isSelected: bluetooth, onChange: setBluetooth }
              ].map((s) => (
                <Switch
                  key={s.label}
                  isSelected={s.isSelected}
                  onChange={s.onChange}
                  className='row justify-between cursor-pointer'>
                  <span>{s.label}</span>
                  <div className='switch-sm'>
                    <div className='switch-thumb-sm' />
                  </div>
                </Switch>
              ))}
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </div>
  )
}
