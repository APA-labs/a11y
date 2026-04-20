import './index.css'
import { DatePicker, Portal } from '@chakra-ui/react'

export default function App() {
  return (
    <div className='app max-w-320'>
      <DatePicker.Root>
        <DatePicker.Label>Select date</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger aria-label='Open calendar'>
              <span aria-hidden>&#128197;</span>
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view='day'>
                <DatePicker.Context>
                  {(api) => (
                    <>
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger aria-label='Previous month'>‹</DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger>
                          <DatePicker.RangeText />
                        </DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger aria-label='Next month'>›</DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableHead>
                          <DatePicker.TableRow>
                            {api.weekDays.map((day) => (
                              <DatePicker.TableHeader
                                key={day.short}
                                aria-label={day.long}>
                                {day.narrow}
                              </DatePicker.TableHeader>
                            ))}
                          </DatePicker.TableRow>
                        </DatePicker.TableHead>
                        <DatePicker.TableBody>
                          {api.weeks.map((week, i) => (
                            <DatePicker.TableRow key={i}>
                              {week.map((day, j) => (
                                <DatePicker.TableCell
                                  key={j}
                                  value={day}>
                                  <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    </div>
  )
}
