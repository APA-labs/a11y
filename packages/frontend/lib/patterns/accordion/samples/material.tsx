import './index.css'
import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'

const ITEMS = [
  { id: 'panel1', heading: 'What is Material UI?', content: "Material UI is a React component library implementing Google's Material Design." },
  { id: 'panel2', heading: 'Is it accessible?', content: 'Yes. MUI Accordion follows the WAI-ARIA Accordion pattern with full keyboard support.' },
  { id: 'panel3', heading: 'Can I customize it?', content: 'Yes. Use the sx prop, theme overrides, or slotProps for deep customization.' }
]

export default function App() {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className='app accordion-root'>
      {ITEMS.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          slotProps={{ heading: { component: 'h3' } }}>
          <AccordionSummary
            expandIcon={<span aria-hidden>▼</span>}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}>
            {item.heading}
          </AccordionSummary>
          <AccordionDetails id={`${item.id}-content`}>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
