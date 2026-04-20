import './index.css'
import {
  DatePicker,
  Label,
  Group,
  DateInput,
  DateSegment,
  Button,
  Popover,
  Dialog,
  Heading,
  Calendar,
  CalendarGrid,
  CalendarCell,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody
} from 'react-aria-components'

export default function App() {
  return (
    <div className='app'>
      <DatePicker>
        <Label className='label'>Appointment date</Label>
        <Group className='datepicker-group'>
          <DateInput className='datepicker-input'>
            {(segment) => (
              <DateSegment
                segment={segment}
                className='datepicker-segment'
              />
            )}
          </DateInput>
          <Button
            aria-label='Open calendar'
            className='datepicker-btn'>
            ▼
          </Button>
        </Group>
        <Popover className='calendar-popover'>
          <Dialog className='outline-none'>
            <Calendar>
              <header className='calendar-header'>
                <Button
                  slot='previous'
                  aria-label='Previous month'
                  className='calendar-nav-btn'>
                  ‹
                </Button>
                <Heading className='calendar-heading' />
                <Button
                  slot='next'
                  aria-label='Next month'
                  className='calendar-nav-btn'>
                  ›
                </Button>
              </header>
              <CalendarGrid className='calendar-grid'>
                <CalendarGridHeader>{(day) => <CalendarHeaderCell className='calendar-header-cell'>{day}</CalendarHeaderCell>}</CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className='calendar-cell'
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
    </div>
  )
}
