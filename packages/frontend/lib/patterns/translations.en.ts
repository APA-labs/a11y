type ChecklistT = Array<{ title: string; description: string }>
type DsT = { additionalChecks?: ChecklistT; notes?: string[] }
type PatternT = {
  description: string
  baseline: { checklist: { must: ChecklistT; should: ChecklistT; avoid: ChecklistT } }
  designSystems?: Partial<Record<string, DsT>>
}

export const patternTranslationsEn: Record<string, PatternT> = {
  accordion: {
    description: 'A pattern for collapsing and expanding content by section',
    baseline: {
      checklist: {
        must: [
          { title: 'Button role on headers', description: 'Each section heading must use role="button" or a <button> element.' },
          {
            title: 'aria-expanded on each header button',
            description: 'aria-expanded="true" when the panel is open, aria-expanded="false" when closed.'
          },
          { title: 'Header button references its panel', description: 'Each header button must reference its panel id via aria-controls.' },
          { title: 'Toggle panel with Enter/Space', description: 'Panels must be toggled open and closed with Enter or Space.' }
        ],
        should: [
          {
            title: 'Wrap button in a heading element',
            description: 'Place buttons inside an appropriate h2–h6 heading to maintain document structure.'
          },
          {
            title: 'Arrow key navigation between headers',
            description: 'Down arrow moves to the next header, up arrow moves to the previous header.'
          },
          { title: 'Home/End to first/last header', description: 'Home navigates to the first header, End navigates to the last header.' }
        ],
        avoid: [
          {
            title: 'Do not use button without a heading',
            description: 'Using a button without a heading wrapper prevents screen readers from navigating the document structure.'
          },
          {
            title: 'Do not force single-expand without notice',
            description: 'If auto-closing other panels, clearly communicate this behavior to users.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Connect AccordionSummary to a heading',
            description: 'Wrap AccordionSummary in an h3 or similar heading to preserve document structure.'
          }
        ],
        notes: ['MUI Accordion automatically handles aria-expanded.', 'Use disableGutters and square props to adjust styling.']
      },
      radix: {
        additionalChecks: [
          {
            title: 'type="single" vs "multiple"',
            description: 'With type="single", only one panel opens at a time. Make this behavior visually clear.'
          }
        ],
        notes: ['Radix Accordion.Header renders as h3 by default.', 'aria-expanded and data-state attributes are managed automatically.']
      },
      antd: {
        additionalChecks: [
          {
            title: 'Use accordion prop',
            description: 'Setting accordion={true} allows only one panel to be open at a time. Inform users of this behavior.'
          }
        ],
        notes: ['Ant Design Collapse handles accessibility attributes by default.', 'If showArrow={false}, maintain visual state indicators.']
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Multiple mode support',
            description:
              'Adding the multiple prop to Accordion.Root allows multiple items to be open simultaneously. aria-expanded is still managed correctly.'
          }
        ],
        notes: [
          'Chakra Accordion.Root automatically handles keyboard navigation and aria attributes.',
          'ItemIndicator is rendered as aria-hidden.',
          'Use the collapsible prop to allow all items to be closed.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Aria DisclosureGroup implements the WAI-ARIA Accordion pattern.',
          'Set initial/controlled state with defaultExpandedKeys/expandedKeys.',
          'Use allowsMultipleExpanded to permit multiple items to be open.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Accordion.Header is required',
            description: 'Accordion.Header renders as <h3> by default, preserving page document structure for screen readers. Do not omit it.'
          },
          {
            title: 'Control multi-expand with the multiple prop',
            description: 'Add the multiple prop to Accordion.Root to allow several panels to be open at the same time. The default is single-expand.'
          }
        ],
        notes: [
          'Accordion.Header renders as <h3> by default. Use the render prop to change the heading level.',
          'Accordion.Trigger manages aria-expanded automatically.',
          'Add the multiple prop to allow multiple panels to be open simultaneously. Default is false (single-expand).'
        ]
      }
    }
  },

  alert: {
    description: 'A notification component that delivers important messages without interrupting user tasks',
    baseline: {
      checklist: {
        must: [
          {
            title: 'Specify role="alert" or role="status"',
            description: 'Use role="alert" for urgent notifications (aria-live="assertive") and role="status" for non-urgent ones.'
          },
          { title: 'Do not move keyboard focus to alert', description: "Alerts should never steal keyboard focus from the user's current position." },
          { title: 'Provide a dismiss button', description: 'Users must be able to dismiss persistent alerts using a keyboard-accessible button.' },
          {
            title: 'Sufficient display time',
            description: 'Auto-hiding alerts must remain visible long enough to be read (minimum 5 seconds recommended).'
          }
        ],
        should: [
          {
            title: 'Use icons and color for severity',
            description: 'Distinguish alert severity (info/warning/error/success) with both icons and color, not color alone.'
          },
          { title: 'Pause auto-hide on focus/hover', description: 'Pause the auto-hide timer when the alert is focused or hovered.' },
          { title: 'Manage stacked alerts', description: 'When multiple alerts are queued, manage them to avoid overwhelming users.' }
        ],
        avoid: [
          { title: 'Do not auto-hide too quickly', description: 'An alert that disappears in under 3–4 seconds may not be noticed by all users.' },
          {
            title: 'Do not use color alone to convey severity',
            description: 'Color alone is not sufficient; always include a text label or icon for severity.'
          },
          {
            title: 'Do not pre-render alerts on page load',
            description: 'Alerts already in the DOM on load will not be announced by screen readers via aria-live.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Snackbar + Alert combination',
            description: 'When using Snackbar, set autoHideDuration to at least 5000ms to give users enough time to read the message.'
          },
          {
            title: 'Set minimum autoHideDuration',
            description: 'Ensure autoHideDuration is at least 5000ms so users have sufficient time to read the alert.'
          }
        ],
        notes: [
          'MUI Alert used standalone automatically receives role="alert".',
          'Snackbar onClose responds to Escape key and outside clicks.',
          'The severity prop (success/info/warning/error) automatically applies icons and colors.'
        ]
      },
      radix: {
        additionalChecks: [
          { title: 'Hotkey hint in Toast.Viewport', description: 'Inform users of the keyboard shortcut (F8) to move focus to the toast viewport.' },
          { title: 'Set urgency with type prop', description: 'Use type="foreground" for urgent alerts and type="background" for non-critical ones.' }
        ],
        notes: [
          'Radix Toast supports moving focus to the viewport with the F8 shortcut.',
          'swipeDirection controls the swipe gesture direction.',
          'aria-live requirements are handled internally.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Accessibility limitations of message/notification',
            description: 'The message and notification APIs have limited screen reader support; use Alert component for critical messages.'
          }
        ],
        notes: [
          'The showIcon prop automatically displays an icon matching the severity type.',
          'Setting duration={0} in the notification API keeps it until manually closed.',
          'The closable prop automatically adds a close button.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Set role per status', description: 'Use role="alert" for critical statuses and role="status" for informational ones.' }
        ],
        notes: [
          'The status prop on Chakra Alert.Root determines visual styles and aria attributes.',
          'For dynamically added alerts, explicitly set role="alert".',
          'Alert.Indicator is automatically given aria-hidden.'
        ]
      }
    }
  },

  breadcrumb: {
    description: 'A navigation component showing the hierarchical location of the current page',
    baseline: {
      checklist: {
        must: [
          {
            title: 'Wrap in a <nav> landmark',
            description: 'The breadcrumb must be wrapped in <nav aria-label="Breadcrumb"> to be identified as a navigation landmark.'
          },
          { title: 'aria-current="page" on current item', description: 'The last item representing the current page must have aria-current="page".' },
          {
            title: 'Use an <ol> list structure',
            description: 'Breadcrumb items must be structured as an ordered list (<ol>) to convey their sequence.'
          }
        ],
        should: [
          {
            title: 'Make separators aria-hidden',
            description: 'Visual separators (/ or ›) should have aria-hidden="true" to prevent them from being announced.'
          },
          {
            title: 'Render last item as text, not a link',
            description: 'The current page item should be plain text, not a link, since it points to the current page.'
          }
        ],
        avoid: [
          {
            title: 'Do not list items with div/span alone',
            description: 'Using div or span without list semantics loses the ordered structure for screen reader users.'
          },
          {
            title: 'Do not include separators in link text',
            description: 'Including "/" in the link text itself will be read aloud by screen readers.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Specify aria-label directly',
            description: 'MUI Breadcrumbs does not add an accessible name by default. Add aria-label="Breadcrumb" to the component.'
          }
        ],
        notes: [
          'MUI Breadcrumbs automatically renders separators with aria-hidden applied.',
          'The separator prop allows customizing the separator.',
          'Render the last item as Typography (not a link) to indicate the current page.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Add aria-current with itemRender',
            description: 'Use the itemRender prop to add aria-current="page" to the last breadcrumb item.'
          }
        ],
        notes: [
          'You must manually add the aria-label attribute to Ant Design Breadcrumb.',
          'Use the itemRender prop to add aria-current="page" to the last item.',
          'The separator prop can change the separator; the default separator has aria-hidden applied.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Show current position with isCurrentPage',
            description: 'The isCurrentPage prop automatically sets aria-current="page" on the current breadcrumb item.'
          }
        ],
        notes: [
          'Chakra Breadcrumb automatically generates nav and ol markup.',
          'The isCurrentPage prop automatically sets aria-current="page".',
          'Customize the separator with the separator prop.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Spectrum Breadcrumbs automatically treats the last Item as the current page (aria-current="page").',
          'The key prop is used as the unique identifier for each item.',
          'Folding (multiline) behavior is supported automatically.'
        ]
      }
    }
  },

  button: {
    description: 'The basic interactive element that triggers an action',
    baseline: {
      checklist: {
        must: [
          { title: 'Keyboard accessible', description: 'Must be focusable with Tab and activatable with Enter or Space.' },
          { title: 'Clear label', description: "Must have text or an aria-label that describes the button's purpose." },
          { title: 'Focus indicator', description: 'A visible focus ring must appear when the button receives keyboard focus.' },
          { title: 'Color contrast 4.5:1', description: 'Text and background must meet a minimum contrast ratio of 4.5:1.' },
          { title: 'Communicate disabled state', description: 'Use aria-disabled or the disabled attribute to indicate an inactive state.' }
        ],
        should: [
          { title: 'Loading state announcement', description: 'Provide aria-busy="true" and a screen-reader-friendly loading message.' },
          { title: 'Icon button label', description: 'Buttons with only an icon must have an aria-label.' },
          { title: '44×44px touch target', description: 'Ensure a minimum 44×44px touch target on mobile.' }
        ],
        avoid: [
          { title: 'Do not implement buttons with div/span', description: '<div onClick> has no keyboard accessibility. Use <button> instead.' },
          { title: 'Do not distinguish state with color alone', description: 'Do not rely solely on color to indicate active/inactive state.' }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Ripple effect accessibility',
            description: 'The ripple effect is purely visual and does not affect accessibility. Use disableRipple to remove it if needed.'
          },
          {
            title: 'Verify contrast per variant',
            description: 'Check that each variant (contained, outlined, text) meets the 4.5:1 contrast ratio requirement.'
          }
        ],
        notes: [
          'MUI Button renders a <button> element by default.',
          'When changing to <a> via the component prop, explicitly manage href and role.',
          'The disableRipple prop can be used without affecting accessibility.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Be careful with asChild pattern',
            description: 'When using asChild, ensure the child element is a valid interactive element (button or a).'
          },
          { title: 'Verify Slot accessibility', description: 'With asChild, confirm that the child element correctly inherits all ARIA attributes.' }
        ],
        notes: [
          'Radix is a headless component — you control the styles directly.',
          'Use focus-visible:ring classes to show focus only for keyboard navigation.',
          "@radix-ui/react-slot's Slot forwards props to the child element."
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Supplement aria on danger button',
            description: 'For danger buttons, communicate the destructive nature via aria-label or visible text, not just color.'
          },
          {
            title: 'Hide loading spinner',
            description: 'When loading={true}, ensure the spinner is aria-hidden so screen readers do not announce it.'
          }
        ],
        notes: [
          'Ant Design Button uses a <button> element internally.',
          'Use the htmlType prop to specify submit/reset/button type.',
          'Consider layout context when using the block prop for full-width buttons.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Provide loadingText when isLoading',
            description: 'Set loadingText so screen readers announce the loading state instead of staying silent.'
          }
        ],
        notes: [
          'Chakra Button uses a <button> element internally.',
          'When isLoading is true, the button is automatically disabled.',
          'Setting loadingText displays text alongside the spinner.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Spectrum Button uses onPress instead of onClick.',
          'Use variant to specify cta, primary, secondary, or negative.',
          'Keyboard, mouse, and touch interactions are all handled automatically.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Focus styles must be added manually',
            description: 'Base UI is headless, so focus-visible styles must be applied via CSS directly.'
          },
          {
            title: 'Use focusableWhenDisabled to retain focus',
            description: 'When transitioning to a disabled state during loading, use the focusableWhenDisabled prop to keep focus on the button.'
          }
        ],
        notes: [
          'Base UI Button renders a native <button> element by default.',
          'Use focusableWhenDisabled to keep the button in the tab sequence even when disabled.',
          'Use the render prop to change the rendered element (e.g., render={<a />}); set nativeButton={false} when doing so.'
        ]
      }
    }
  },

  checkbox: {
    description: 'A checkbox pattern for selecting or deselecting items',
    baseline: {
      checklist: {
        must: [
          { title: 'checkbox role', description: 'The element must have role="checkbox" or use a native <input type="checkbox">.' },
          { title: 'aria-checked state', description: 'The checked state must be reflected via aria-checked (true/false/mixed).' },
          { title: 'Accessible label', description: 'Each checkbox must have an associated label via <label>, aria-label, or aria-labelledby.' },
          { title: 'Toggle with Space', description: 'The Space key must toggle the checkbox state.' }
        ],
        should: [
          { title: 'Group role for related checkboxes', description: 'Group related checkboxes with role="group" and a group label.' },
          { title: 'Visible focus indicator', description: 'A clear focus indicator must be shown when the checkbox is focused.' },
          { title: 'Link error messages', description: 'Connect error messages to the checkbox using aria-describedby.' }
        ],
        avoid: [
          {
            title: 'Do not use div/span without role',
            description: 'Custom elements without role="checkbox" are not recognized by assistive technologies.'
          },
          {
            title: 'Do not visually hide native checkbox without alternative',
            description: 'Hiding the native checkbox requires a fully keyboard-accessible custom replacement.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Connect label with FormControlLabel',
            description: 'Always wrap Checkbox with FormControlLabel to properly associate the label.'
          },
          { title: 'Handle indeterminate state', description: 'Use the indeterminate prop to represent a partially-selected parent checkbox.' }
        ],
        notes: [
          'MUI Checkbox uses a native input, so basic accessibility is guaranteed.',
          'When changing the color prop, verify the 4.5:1 contrast ratio.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Handle Checkbox.Indicator visibility',
            description: 'Checkbox.Indicator is shown only when checked. Ensure focus styles are visible in both checked and unchecked states.'
          }
        ],
        notes: [
          'Radix Checkbox automatically handles role="checkbox" and aria-checked.',
          'The value from onCheckedChange is boolean | "indeterminate" — handle the type accordingly.'
        ]
      },
      antd: {
        additionalChecks: [
          { title: 'Group with Checkbox.Group', description: 'Use Checkbox.Group to group related checkboxes and provide a shared label.' }
        ],
        notes: [
          'Ant Design Checkbox uses a native input to maintain accessibility.',
          'The indeterminate prop can represent a partial selection state.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Pass error state with isInvalid', description: 'Use isInvalid to communicate validation errors to assistive technologies.' }
        ],
        notes: [
          'Chakra Checkbox uses <input type="checkbox"> internally.',
          'The isIndeterminate prop represents a partial selection state.',
          'Use CheckboxGroup to manage multiple checkboxes together.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Spectrum Checkbox automatically handles keyboard, mouse, and touch accessibility.',
          'The isIndeterminate prop supports partial selection state.',
          'Use validationState="invalid" to represent an error state.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Checkbox.Indicator must have a visual checkmark',
            description: 'Base UI Checkbox is unstyled; always add a check icon inside Checkbox.Indicator.'
          },
          {
            title: 'Provide an accessible name via a label element',
            description: 'Wrap Checkbox.Root in a <label> or connect it via htmlFor/id to provide an accessible name.'
          }
        ],
        notes: [
          'Checkbox.Root renders a <button role="checkbox"> by default, with aria-checked managed automatically.',
          'Checkbox.Indicator only renders when the checkbox is checked.',
          'Use CheckboxGroup to manage multiple checkboxes as a group.'
        ]
      }
    }
  },

  combobox: {
    description: 'An autocomplete pattern combining text input with a selection list',
    baseline: {
      checklist: {
        must: [
          { title: 'combobox role on the input', description: 'The text input must have role="combobox".' },
          { title: 'aria-expanded on the input', description: 'The input must reflect the dropdown state via aria-expanded="true/false".' },
          { title: 'aria-controls references the listbox', description: 'The input must reference the dropdown list id via aria-controls.' },
          { title: 'aria-autocomplete attribute', description: 'Set aria-autocomplete="list" or "both" to describe the autocomplete behavior.' },
          { title: 'Arrow key navigation in the list', description: 'Up/down arrow keys must navigate through listbox options.' }
        ],
        should: [
          { title: 'Use aria-activedescendant', description: 'Set aria-activedescendant on the input to reflect the currently highlighted option.' },
          { title: 'Enter key selects option', description: 'Pressing Enter must select the currently highlighted option.' },
          { title: 'Visible label', description: 'Provide a visible label connected to the combobox input.' }
        ],
        avoid: [
          {
            title: 'Do not open the dropdown on mouse hover only',
            description: 'The popup must also be openable via keyboard (e.g., arrow key or Enter).'
          },
          { title: 'Do not trap focus in the dropdown', description: 'Focus must remain on the combobox input while navigating the dropdown list.' }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          { title: 'Connect Autocomplete label', description: 'Always pass the renderInput prop with a TextField that includes a label.' }
        ],
        notes: [
          'MUI Autocomplete automatically handles the combobox role and aria-expanded.',
          'When using freeSolo, inform screen reader users how their typed value will be handled.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Configure showSearch and filterOption',
            description: 'When enabling search, set filterOption or use the default filtering to ensure options update correctly.'
          }
        ],
        notes: [
          'Ant Design AutoComplete automatically handles accessibility attributes.',
          'Set notFoundContent to inform users when no results are found.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Provide aria-label on ClearTrigger and Trigger',
            description: 'Add aria-label="Clear" and aria-label="Toggle" to the clear and dropdown trigger buttons.'
          }
        ],
        notes: [
          'Chakra Combobox.Root fully implements the WAI-ARIA Combobox pattern.',
          'Manage item collections with useListCollection.',
          'Combobox.Empty handles the empty search state accessibly.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Aria ComboBox automatically handles autocomplete, keyboard navigation, and ARIA.',
          'Setting the label prop automatically connects it via aria-label.',
          'The allowsCustomValue prop controls whether free-form input is allowed.'
        ]
      }
    }
  },

  'date-picker': {
    description: 'An input component for selecting dates with a calendar UI',
    baseline: {
      checklist: {
        must: [
          { title: 'Connect format hint to input', description: 'Link the expected date format hint to the input via aria-describedby.' },
          { title: 'Calendar popup has dialog role', description: 'The calendar popup must have role="dialog" with aria-label or aria-labelledby.' },
          { title: 'ARIA on calendar grid', description: 'The calendar grid must use appropriate roles (grid, gridcell) and labels.' },
          { title: 'Full keyboard navigation', description: 'Arrow keys must navigate days; Enter/Space must select a date.' },
          { title: 'Live region for month/year changes', description: 'Announce month/year changes to screen readers using an aria-live region.' }
        ],
        should: [
          { title: 'Allow direct text input', description: 'Allow users to type a date directly instead of requiring calendar navigation.' },
          { title: 'Show selected date in trigger', description: "Reflect the selected date in the trigger button's accessible label." },
          { title: 'Mark disabled dates', description: 'Indicate unavailable dates with aria-disabled="true".' }
        ],
        avoid: [
          {
            title: 'Do not require the calendar UI only',
            description: 'Some users cannot operate a calendar widget; always provide a text input alternative.'
          },
          {
            title: 'Do not show only numbers in date cells',
            description: 'Day cells must have accessible names that include full date context (e.g., "March 1, 2025").'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Use @mui/x-date-pickers',
            description: 'Use @mui/x-date-pickers instead of a custom date input for built-in accessibility support.'
          }
        ],
        notes: [
          'Setting adapterLocale on LocalizationProvider displays the calendar UI in the correct locale.',
          '@mui/x-date-pickers automatically handles ARIA for keyboard navigation and screen readers.',
          'Customize input field accessibility attributes via slotProps.textField.'
        ]
      },
      antd: {
        additionalChecks: [
          { title: 'Set locale for language', description: 'Use ConfigProvider locale to display the calendar in the correct language.' }
        ],
        notes: [
          'Use ConfigProvider locale={koKR} or locale={enUS} to change the calendar UI language.',
          'Ant Design DatePicker supports keyboard navigation but screen reader support may be incomplete.',
          'For important date inputs, also provide a direct text input option.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Add aria-label to prev/next month buttons',
            description: 'Ensure the previous and next month navigation buttons have descriptive aria-labels.'
          }
        ],
        notes: [
          'DatePicker.Header automatically renders prev/next month buttons and the current month/year text.',
          'Include day, month, and year Views to enable full date selection.',
          'Use the @internationalized/date package for date types. Wrap in Portal to avoid z-index issues.'
        ]
      },
      spectrum: {
        additionalChecks: [
          { title: 'aria-label prop is required', description: 'React Aria DatePicker requires an aria-label or Label component to be accessible.' }
        ],
        notes: [
          'Wrap Popover around Dialog to correctly construct the accessibility tree.',
          'Wrapping DateInput and Button in Group makes them recognized as a single input field.',
          'Using the Label component automatically handles all child aria connections.'
        ]
      }
    }
  },

  disclosure: {
    description: 'A pattern that shows or hides content when a button is clicked',
    baseline: {
      checklist: {
        must: [
          { title: 'Button role on trigger', description: 'The trigger element must use role="button" or a native <button> element.' },
          { title: 'aria-expanded on trigger', description: 'Reflect the expanded state on the trigger via aria-expanded="true/false".' },
          { title: 'Toggle with Enter/Space', description: 'Pressing Enter or Space must toggle the visibility of the content.' }
        ],
        should: [
          { title: 'aria-controls linking trigger to panel', description: 'Reference the content panel id from the trigger via aria-controls.' },
          { title: 'Visible focus indicator on trigger', description: 'Show a clear focus ring when the trigger button is focused.' },
          {
            title: 'Properly hide collapsed content',
            description: 'Collapsed content must be hidden using hidden, visibility:hidden, or display:none — not just moved offscreen.'
          }
        ],
        avoid: [
          {
            title: 'Do not omit aria-expanded',
            description: 'Without aria-expanded, screen reader users cannot know whether content is expanded or collapsed.'
          },
          {
            title: 'Do not hide content with visibility alone',
            description: 'Using only CSS visibility on the container may not reliably hide content from all assistive technologies.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Use Collapse component',
            description: 'Use MUI Collapse for expand/collapse animations. Add unmountOnExit to remove content from the DOM when closed.'
          }
        ],
        notes: [
          'Add unmountOnExit to MUI Collapse to fully remove content from the DOM when in={false}.',
          'When using IconButton instead of Button, always add an aria-label.'
        ]
      },
      radix: {
        additionalChecks: [
          { title: 'Use Collapsible.Root', description: 'Use Radix Collapsible for a disclosure pattern with built-in accessibility.' }
        ],
        notes: ['Radix Collapsible.Trigger automatically sets aria-expanded.', 'Collapsible.Content is set to display:none when closed.']
      },
      antd: {
        additionalChecks: [
          { title: 'Verify Collapse panel accessibility', description: 'Check that aria-expanded is correctly applied to the panel trigger.' }
        ],
        notes: [
          'Ant Design Collapse manages aria-expanded internally.',
          'Control whether closed panel DOM is removed via the destroyInactivePanel prop.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Aria Disclosure fully implements the WAI-ARIA Disclosure pattern.',
          'You must set slot="trigger" on the Button inside DisclosureHeader.',
          'Set the initial open state with the defaultExpanded prop.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Collapsible.Trigger manages aria-expanded automatically',
            description: 'Base UI Collapsible.Trigger automatically sets aria-expanded based on the open/closed state.'
          }
        ],
        notes: [
          'Collapsible.Trigger automatically manages aria-expanded and aria-controls.',
          'Use defaultOpen or open/onOpenChange for uncontrolled/controlled mode.',
          'Use hiddenUntilFound on Collapsible.Panel to make hidden content findable via browser search (Ctrl+F).'
        ]
      }
    }
  },

  drawer: {
    description: 'A side panel component that slides in from the edge of the screen',
    baseline: {
      checklist: {
        must: [
          { title: 'dialog role on the panel', description: 'The drawer panel must have role="dialog" and aria-modal="true".' },
          { title: 'Accessible label', description: 'Provide an accessible name for the dialog via aria-labelledby or aria-label.' },
          { title: 'Focus trap', description: 'Keyboard focus must be trapped inside the drawer while it is open.' },
          { title: 'Close with Escape', description: 'Pressing Escape must close the drawer.' },
          {
            title: 'Focus management on open/close',
            description: 'Move focus to the first focusable element when opening; restore focus to the trigger on close.'
          }
        ],
        should: [
          {
            title: 'Apply inert to background content',
            description: 'Set inert on background content to prevent screen readers from accessing it while the drawer is open.'
          },
          { title: 'Close on overlay click', description: 'Clicking the overlay backdrop should close the drawer.' }
        ],
        avoid: [
          { title: 'Do not omit the focus trap', description: 'Without a focus trap, keyboard users can accidentally navigate behind the drawer.' },
          { title: 'Do not hide the visual close button', description: 'The close button must be visible so all users can easily close the drawer.' }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Use variant="temporary" for modal behavior',
            description: 'Use variant="temporary" so the Drawer behaves as a modal with focus trapping and backdrop.'
          }
        ],
        notes: [
          'MUI Drawer variant="temporary" is Modal-based and automatically handles focus trapping and Escape to close.',
          'Connect aria-labelledby to the drawer title ID.',
          'Set keepMounted={false} to remove the drawer from the DOM when closed.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Verify close button aria-label',
            description: 'Ensure the default close button has a descriptive aria-label, or customize it via closeIcon.'
          }
        ],
        notes: [
          'Ant Design Drawer automatically closes on Escape key.',
          'Set the placement prop to left/right/top/bottom.',
          'Customize the close button via closeIcon to add an aria-label.'
        ]
      },
      chakra: {
        additionalChecks: [{ title: 'CloseTrigger aria-label', description: 'Add aria-label="Close drawer" to the CloseTrigger button.' }],
        notes: [
          'Chakra Drawer.Root automatically handles focus trapping and aria-modal.',
          'Specify the direction with the placement prop (bottom, left, right, top).',
          'Always add an aria-label to the close button.'
        ]
      }
    }
  },

  'form-validation': {
    description: 'A form component with inline error messages and accessible validation',
    baseline: {
      checklist: {
        must: [
          { title: 'Connect error messages to inputs', description: 'Use aria-describedby to link error messages to their corresponding inputs.' },
          { title: 'Set aria-invalid on invalid inputs', description: 'Invalid inputs must have aria-invalid="true" set programmatically.' },
          { title: 'Mark required fields', description: 'Required fields must use required or aria-required="true", plus a visual indicator.' },
          {
            title: 'Move focus to first error on submit',
            description: 'When form submission fails, move focus to the first invalid field or an error summary.'
          },
          { title: 'Label all inputs', description: 'Every input must have an accessible label — never rely solely on placeholder.' }
        ],
        should: [
          {
            title: 'Provide specific error messages',
            description: 'Error messages must clearly describe what is wrong and how to fix it (e.g., "Enter a valid email address").'
          },
          { title: 'Show an error summary', description: 'For forms with multiple errors, display a summary at the top listing all errors.' },
          { title: 'Show format hints', description: 'Provide format hints (e.g., "MM/DD/YYYY") for fields that require a specific format.' }
        ],
        avoid: [
          {
            title: 'Do not indicate errors with color alone',
            description: 'A red border alone does not communicate an error to color-blind or screen reader users.'
          },
          {
            title: 'Do not validate in real-time aggressively',
            description: 'Triggering errors before users finish typing causes frustration. Validate on blur or submit.'
          },
          { title: 'Do not use placeholder as a label', description: 'Placeholder text disappears on focus, causing users to lose context.' }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Use helperText and error props together',
            description: 'Set error={true} on TextField and provide the error message via helperText for linked error announcements.'
          }
        ],
        notes: [
          'The error prop on MUI TextField automatically sets aria-invalid.',
          'helperText renders as FormHelperText and is automatically connected via aria-describedby.',
          'The required prop automatically adds an asterisk to the label and sets aria-required.'
        ]
      },
      radix: {
        additionalChecks: [
          { title: 'Use Form.Message for error linking', description: 'Radix Form.Message automatically connects to the input via aria-describedby.' }
        ],
        notes: [
          'Radix Form follows the "inline errors" pattern — error messages and inputs are automatically connected via aria-describedby.',
          'On submission failure, focus automatically moves to the first invalid field.',
          'The match prop supports HTML5 built-in validation types.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Set validateTrigger to onBlur',
            description: 'Triggering validation on blur reduces interruptions during input compared to onChange.'
          }
        ],
        notes: [
          'Ant Design Form automatically sets aria-invalid and aria-describedby.',
          'In onFinishFailed, scroll/focus to the first error field.',
          'Using layout="vertical" displays labels above inputs for better visual clarity.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Add role="alert" to Field.ErrorText',
            description: 'Add role="alert" to Field.ErrorText so screen readers immediately announce the error.'
          }
        ],
        notes: [
          'The invalid prop on Chakra Field.Root automatically sets aria-invalid on the Input.',
          'Add role="alert" to Field.ErrorText to immediately notify screen readers.',
          'Field.RequiredIndicator sets the visual required indicator along with aria-required.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Configure Form validationBehavior',
            description: 'Set validationBehavior="aria" to use ARIA-based validation instead of native HTML5 validation.'
          }
        ],
        notes: [
          'react-aria-components Form integrates HTML5 validation with ARIA.',
          'Combine Label, Input, and FieldError as compound components inside TextField.',
          'Add custom validation with the validate function; FieldError automatically displays error messages.'
        ]
      }
    }
  },

  link: {
    description: 'A hyperlink pattern for navigating to other pages or resources',
    baseline: {
      checklist: {
        must: [
          {
            title: 'Use native <a> or role="link"',
            description: 'Links must use a native <a href> element or have role="link" with keyboard support.'
          },
          {
            title: 'Descriptive accessible name',
            description: "The link's purpose must be clear from its text or aria-label, without needing surrounding context."
          },
          { title: 'Activate with Enter key', description: 'Links must be activatable using the Enter key.' },
          { title: 'Valid href attribute', description: 'Provide a valid href; do not use javascript:void(0) or "#" as the destination.' }
        ],
        should: [
          {
            title: 'Warn users about new tab',
            description: 'Notify users when a link opens in a new tab, either in the text or via aria-label (e.g., "opens in new tab").'
          },
          { title: 'Visible focus indicator', description: 'Display a visible focus indicator when the link receives keyboard focus.' },
          {
            title: 'Visually distinct from surrounding text',
            description: 'Links should be visually distinguishable from surrounding text, not by color alone.'
          }
        ],
        avoid: [
          {
            title: 'Do not use empty href or javascript:void(0)',
            description: 'These produce non-functional links; use a <button> for actions, or a real URL for navigation.'
          },
          {
            title: 'Do not omit alt text on image links',
            description: 'An image inside a link must have descriptive alt text; an empty alt="" will leave the link without an accessible name.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          { title: 'Use MUI Link component', description: 'Use MUI Link instead of a plain <a> tag to ensure consistent styles and accessibility.' }
        ],
        notes: [
          'MUI Link can integrate with routers like Next.js Link via the component prop.',
          'Verify contrast ratio when changing the color prop.'
        ]
      },
      antd: {
        additionalChecks: [
          { title: 'Use Typography.Link', description: 'Use Typography.Link for consistent accessible link styling in Ant Design.' }
        ],
        notes: [
          'Ant Design Typography.Link without href acts like a button when only onClick is provided.',
          'Check color contrast when using the disabled prop.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Announce new tab with isExternal',
            description: 'Using isExternal adds target="_blank" — also provide a visual indicator and screen-reader text for new tab behavior.'
          }
        ],
        notes: [
          'Chakra Link renders an <a> element by default.',
          'Use the isExternal prop to handle opening in a new tab.',
          'Use as={NextLink} prop when integrating with Next.js.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Spectrum Link automatically handles keyboard accessibility and focus management.',
          'Apply secondary styles with variant="secondary".',
          'When opening in a new tab, add visual guidance alongside target="_blank".'
        ]
      }
    }
  },

  'modal-dialog': {
    description: 'An overlay component that demands user attention and interrupts the current task',
    baseline: {
      checklist: {
        must: [
          { title: 'Set role="dialog"', description: 'Set role="dialog" and aria-modal="true" on the dialog element.' },
          { title: 'Connect title with aria-labelledby', description: "Link the modal's title to the dialog via aria-labelledby." },
          { title: 'Focus trap', description: 'Keyboard focus must be confined within the modal and must not escape to the background.' },
          { title: 'Move focus on open', description: 'When the modal opens, move focus to the first focusable element or the dialog title.' },
          { title: 'Close with Escape', description: 'Pressing Escape must close the modal.' },
          { title: 'Restore focus on close', description: 'When the modal closes, return focus to the element that triggered it.' }
        ],
        should: [
          { title: 'Prevent background scroll', description: 'Prevent scrolling of the background content while the modal is open.' },
          { title: 'Apply inert to background', description: 'Apply the inert attribute to background content to block screen reader access.' },
          { title: 'Add description with aria-describedby', description: 'If the modal has body text, connect it via aria-describedby.' }
        ],
        avoid: [
          {
            title: 'Do not allow a scrollable background',
            description: 'A scrollable background while the modal is open causes users to lose context.'
          },
          {
            title: 'Do not implement without a focus trap',
            description: 'Without a focus trap, screen reader users can navigate behind the modal and become disoriented.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Caution with keepMounted',
            description: 'When keepMounted is used, the hidden Dialog remains in the DOM and may be exposed to screen readers.'
          },
          { title: 'Do not use disablePortal', description: 'disablePortal interferes with the focus trap and inert handling.' }
        ],
        notes: [
          'MUI Dialog handles focus trapping automatically.',
          'Use the autoFocus prop to control initial focus position.',
          'Use TransitionProps.onExited to restore focus after the dialog closes.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Always provide Dialog.Description',
            description: 'Omitting Dialog.Description triggers a Radix console warning. Provide it even with visually-hidden.'
          },
          {
            title: 'Handle outside click explicitly',
            description: 'Use the onInteractOutside prop to explicitly control behavior when clicking outside the modal.'
          }
        ],
        notes: [
          'Radix Dialog automatically handles focus trapping, Escape to close, and focus restoration.',
          'Portal renders the dialog into the body, preventing z-index issues.',
          'Using Dialog.Trigger automatically manages the trigger reference for focus restoration.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Review destroyOnClose',
            description: 'Assistive technologies are sensitive to DOM presence. Use destroyOnClose to remove the modal from the DOM when closed.'
          },
          { title: 'Footer button order', description: 'Ensure the order of OK/Cancel buttons in the footer matches the logical tab order.' }
        ],
        notes: [
          'Ant Design Modal supports focus trapping by default.',
          'Use focusTriggerAfterClose to control focus restoration behavior after closing.',
          'Modal.confirm() applies accessibility attributes automatically.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Add aria-label to Dialog.CloseTrigger', description: 'If the close button uses only an icon, explicitly add an aria-label.' }
        ],
        notes: [
          'Chakra Dialog.Root automatically handles focus trapping and aria-modal.',
          'Use closeOnInteractOutside={false} to prevent closing on background click.',
          'Dialog.CloseTrigger is automatically wired to the Escape key.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Heading slot="title" is required',
            description: 'The dialog title must use Heading slot="title" for aria-labelledby to be automatically connected.'
          }
        ],
        notes: [
          'React Aria Modal automatically handles focus trapping, aria-modal, and Escape to close.',
          'Control background click to close behavior with the isDismissable prop.',
          'Heading with slot="title" is automatically connected to the Dialog via aria-labelledby.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Portal + Backdrop structure is required',
            description: 'Always use Dialog.Portal and Dialog.Backdrop to block outside clicks and ensure focus trapping.'
          },
          {
            title: 'Provide Dialog.Title and Dialog.Description',
            description: 'Dialog.Title is auto-connected via aria-labelledby; Dialog.Description via aria-describedby. Do not omit either.'
          }
        ],
        notes: [
          'Dialog.Popup automatically handles focus trapping, Escape key dismissal, and aria-modal="true".',
          'Dialog.Title is auto-connected via aria-labelledby; Dialog.Description via aria-describedby.',
          'Dialog.Portal renders into the document body to prevent z-index conflicts.'
        ]
      }
    }
  },

  'navigation-menu': {
    description: 'A site navigation component with dropdown submenus',
    baseline: {
      checklist: {
        must: [
          { title: 'Wrap in a <nav> landmark', description: 'The navigation must be wrapped in a <nav> element with a descriptive aria-label.' },
          { title: 'aria-expanded on submenu triggers', description: 'Buttons that open submenus must have aria-expanded="true/false".' },
          {
            title: 'Full keyboard navigation',
            description: 'Support arrow keys to navigate within the menu, Enter/Space to open submenus, and Escape to close them.'
          },
          { title: 'aria-current="page" on active link', description: 'The link for the current page must have aria-current="page".' }
        ],
        should: [
          { title: 'aria-haspopup on submenu triggers', description: 'Add aria-haspopup="true" to buttons that open submenus.' },
          { title: 'Close submenu with Escape', description: 'Pressing Escape must close any open submenu and return focus to the trigger.' },
          { title: 'Logical focus flow after submenu', description: 'After closing a submenu, focus should return to the triggering menu item.' }
        ],
        avoid: [
          {
            title: 'Do not use hover-only submenu opening',
            description: 'Submenus must also be openable via keyboard for users who cannot use a mouse.'
          },
          {
            title: 'Do not duplicate navigation landmark labels',
            description: 'If there are multiple <nav> elements on a page, each must have a unique aria-label.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'AppBar + Drawer combination',
            description: 'For mobile navigation, combine AppBar with a Drawer and ensure focus management between the two.'
          }
        ],
        notes: [
          'Use component="header" on AppBar for semantic markup.',
          'MUI Menu automatically handles focus management and keyboard navigation.',
          'You must manually add aria-current to the current page link.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Use NavigationMenu.Indicator',
            description: 'NavigationMenu.Indicator visually shows the active trigger and enhances orientation for keyboard users.'
          }
        ],
        notes: [
          'Radix NavigationMenu follows the WAI-ARIA disclosure navigation pattern.',
          'Space/Enter activates triggers, ArrowDown enters content, Escape closes — all built in.',
          'NavigationMenu.Viewport handles animations and focus management.'
        ]
      },
      antd: {
        additionalChecks: [
          { title: 'Add aria-label directly', description: 'Wrap Ant Design Menu in a <nav> element and add aria-label="Main navigation".' }
        ],
        notes: [
          'Wrap Ant Design Menu in a <nav> element and add aria-label.',
          'mode="horizontal" suits top navigation; mode="inline" suits sidebars.',
          'Use selectedKeys to indicate the currently active item.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Wrap in nav element', description: 'When using Chakra Menu as navigation, wrap it in a <nav> landmark with aria-label.' }
        ],
        notes: [
          'Chakra Menu implements the dropdown menu pattern. Wrap in <nav> for navigation use.',
          'Menu.Trigger automatically manages aria-haspopup="menu" and aria-expanded.',
          'Arrow key navigation is automatically applied to Menu.Item.'
        ]
      },
      spectrum: {
        additionalChecks: [
          { title: 'Wrap in nav element', description: 'When using React Aria Menu as navigation, wrap it in <nav aria-label="...">.' }
        ],
        notes: [
          'React Aria Menu/MenuTrigger fully implements the WAI-ARIA Menu pattern.',
          'For navigation use, wrap in <nav aria-label>.',
          'Handle menu item selection with the onAction callback.'
        ]
      }
    }
  },

  pagination: {
    description: 'A page number component for navigating multi-page content',
    baseline: {
      checklist: {
        must: [
          { title: 'Wrap in a <nav> landmark', description: 'The pagination must be wrapped in <nav aria-label="Pagination"> or similar.' },
          {
            title: 'Accessible labels on buttons',
            description: 'Previous/Next and page number buttons must have descriptive aria-labels (e.g., "Go to page 3").'
          },
          { title: 'aria-current="page" on active page', description: 'The current page button must have aria-current="page".' },
          {
            title: 'Mark disabled navigation buttons',
            description: 'Disabled Previous/Next buttons (e.g., on first/last page) must have aria-disabled="true".'
          }
        ],
        should: [
          { title: 'Indicate total page count', description: 'Include the total number of pages in button labels (e.g., "Page 3 of 10").' },
          { title: 'Announce page change', description: 'Use an aria-live region to announce the new page number after navigation.' }
        ],
        avoid: [
          {
            title: 'Do not use numbers alone as button labels',
            description: 'Numeric buttons alone (e.g., "3") lack context; include "Page 3" or similar.'
          },
          {
            title: 'Do not remove focus from disabled buttons entirely',
            description: 'Disabled navigation buttons should remain in the tab order with aria-disabled rather than being removed.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Customize aria-label with getItemAriaLabel',
            description: 'Use getItemAriaLabel to provide descriptive labels for all pagination buttons (e.g., "Go to page 3").'
          }
        ],
        notes: [
          'MUI Pagination automatically uses a <nav role="navigation"> landmark.',
          'aria-current is automatically applied to the current page.',
          'Use getItemAriaLabel to customize all button aria-labels at once.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Set locale for aria-labels',
            description: 'Configure the locale in ConfigProvider to get localized aria-labels for pagination controls.'
          }
        ],
        notes: [
          'Setting locale in ConfigProvider updates aria-labels to the selected language.',
          'Ant Design Pagination automatically uses a <ul> list structure.',
          'aria-current is automatically applied to the current page.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Add aria-label to page buttons',
            description: 'Add aria-label="Page 1", aria-label="Page 2", etc. to each page button for screen reader clarity.'
          }
        ],
        notes: [
          'Chakra Pagination.Root automatically manages page state.',
          'Calculate total pages using count and pageSize.',
          'Add aria-label to each page button to improve accessibility.'
        ]
      }
    }
  },

  popover: {
    description: 'An interactive floating panel triggered by a button',
    baseline: {
      checklist: {
        must: [
          { title: 'aria-expanded on the trigger', description: 'The trigger button must reflect the open state via aria-expanded="true/false".' },
          {
            title: 'aria-haspopup and aria-controls on trigger',
            description: 'Use aria-haspopup="dialog" (or "true") and aria-controls referencing the popover id.'
          },
          { title: 'Focus management on open', description: 'Move focus to the first focusable element inside the popover when it opens.' },
          { title: 'Close with Escape', description: 'Pressing Escape must close the popover and return focus to the trigger.' }
        ],
        should: [
          {
            title: 'Use dialog role inside popover',
            description: 'If the popover contains interactive controls, use role="dialog" with an accessible name.'
          },
          { title: 'Close on background click', description: 'Clicking outside the popover should close it.' },
          {
            title: 'Trap focus within popover',
            description: 'If the popover contains multiple focusable elements, consider implementing a focus trap.'
          }
        ],
        avoid: [
          { title: 'Do not open popover on hover only', description: 'Popovers must also be accessible via keyboard (button click).' },
          {
            title: 'Do not put critical information in popover only',
            description: 'Important content placed only in a popover may be missed by users who cannot activate it.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Connect trigger with Popover anchorEl',
            description: 'Use anchorEl to associate the popover with its trigger element for proper ARIA relationships.'
          }
        ],
        notes: [
          'MUI Popover automatically closes on Escape key and outside clicks.',
          'Connect the trigger and popover via aria-describedby.',
          'Focus management inside the popover must be implemented manually.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Accessibility handled automatically',
            description: 'Radix Popover automatically manages aria-expanded, focus trapping, and Escape to close.'
          }
        ],
        notes: [
          'Radix Popover automatically handles Space/Enter to open, Escape to close, and focus return to trigger.',
          'aria-expanded is automatically applied to Popover.Trigger.',
          'Wrap in Popover.Portal to render at the DOM root without z-index issues.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Add aria-expanded directly to trigger',
            description: 'Ant Design Popover does not automatically manage aria-expanded — add it manually to the trigger.'
          }
        ],
        notes: [
          'With trigger="click", the popover can also be opened with Enter/Space.',
          'Manually add aria-expanded and aria-haspopup to the trigger button.',
          'Ant Design Popover does not close on Escape — include a close button inside the content.'
        ]
      },
      chakra: {
        additionalChecks: [{ title: 'CloseTrigger aria-label', description: 'Add aria-label="Close popover" to Popover.CloseTrigger.' }],
        notes: [
          'Chakra Popover.Root automatically handles focus trapping and aria attributes.',
          'Add aria-label to Popover.CloseTrigger.',
          'Control outside click closing with the closeOnInteractOutside prop.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Aria Popover is used with DialogTrigger.',
          'Setting slot="title" on a Heading inside Dialog automatically connects aria-labelledby.',
          'Popover automatically handles focus management and aria attributes.'
        ]
      }
    }
  },

  'radio-group': {
    description: 'A group of radio buttons for selecting one option from several',
    baseline: {
      checklist: {
        must: [
          { title: 'radiogroup role on the container', description: 'The group container must have role="radiogroup".' },
          { title: 'radio role on each option', description: 'Each option must have role="radio" or use a native <input type="radio">.' },
          { title: 'aria-checked state', description: 'The selected state must be communicated via aria-checked="true/false".' },
          { title: 'Group label', description: 'The radiogroup must have an accessible name via aria-labelledby or aria-label.' },
          { title: 'Arrow key selection', description: 'Up/down (or left/right) arrow keys must move selection between radio options.' }
        ],
        should: [
          {
            title: 'Use roving tabindex',
            description: 'Only the selected (or first) radio should be in the tab sequence (tabindex="0"); others should be tabindex="-1".'
          },
          {
            title: 'Wrap focus at group boundaries',
            description: 'Arrow key navigation should wrap from the last option back to the first (and vice versa).'
          }
        ],
        avoid: [
          {
            title: 'Do not navigate between radios with Tab',
            description: 'Tab key should move focus between groups, not between individual radio options within a group.'
          },
          {
            title: 'Do not omit the group label',
            description: 'Without a group label, screen reader users cannot determine the question the radio group answers.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Connect RadioGroup with FormLabel',
            description: 'Pair RadioGroup with FormControl and FormLabel to provide a group label readable by screen readers.'
          }
        ],
        notes: [
          'MUI RadioGroup automatically handles roving tabindex and arrow key navigation.',
          'The row prop enables horizontal layout — up/down arrow keys still work.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Add aria-label to RadioGroup.Root',
            description: 'Add aria-label or aria-labelledby to RadioGroup.Root to provide a group label.'
          }
        ],
        notes: [
          'Radix RadioGroup automatically handles role="radiogroup", roving tabindex, and arrow key navigation.',
          'RadioGroup.Indicator only provides the visual selected state and is aria-hidden.'
        ]
      },
      antd: {
        additionalChecks: [
          { title: 'Provide label for Radio.Group', description: 'Wrap Radio.Group in a Form.Item with a label, or add aria-label directly.' }
        ],
        notes: [
          'Ant Design Radio.Group uses native input to maintain basic accessibility.',
          'When using optionType="button", always provide a label for button-style radios.'
        ]
      },
      chakra: {
        additionalChecks: [{ title: 'Group with RadioGroup', description: 'Use RadioGroup to wrap related Radio items and manage shared state.' }],
        notes: [
          'Chakra Radio uses <input type="radio"> internally.',
          "Use RadioGroup's onChange to control the selected value.",
          'Use isDisabled to disable individual items or the entire group.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Spectrum RadioGroup sets the group label via the label prop.',
          'Arrow key navigation and focus management are handled automatically.',
          'isDisabled and isRequired props are supported.'
        ]
      }
    }
  },

  select: {
    description: 'A custom dropdown component for selecting one option from a list',
    baseline: {
      checklist: {
        must: [
          { title: 'listbox and option roles', description: 'The dropdown list must have role="listbox" and each item must have role="option".' },
          { title: 'Connect to its label', description: 'The trigger/select must be associated with its label via aria-labelledby.' },
          { title: 'Full keyboard navigation', description: 'Arrow keys must navigate options; Enter/Space must select; Escape must close.' },
          { title: 'Communicate selected state', description: 'The selected option must have aria-selected="true".' },
          {
            title: 'Focus management on open/close',
            description: 'Move focus to the listbox when it opens; restore focus to the trigger when closed.'
          }
        ],
        should: [
          { title: 'Typeahead search', description: 'Pressing a letter key should jump to the first option beginning with that letter.' },
          { title: 'Home/End key support', description: 'Home moves to the first option; End moves to the last option.' },
          { title: 'Group options with role="group"', description: 'Use role="group" with an accessible name to group related options.' }
        ],
        avoid: [
          {
            title: 'Do not implement without semantic roles',
            description: 'A custom select built with only CSS and JS, without ARIA roles, is inaccessible to screen reader users.'
          },
          {
            title: 'Do not auto-select on arrow key press',
            description: 'Navigating through options with arrow keys should not automatically confirm the selection.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'FormControl + InputLabel combination is required',
            description: "Always wrap MUI Select in FormControl with InputLabel. The labelId must match the Select's labelId prop."
          }
        ],
        notes: [
          'The labelId on Select and the id on InputLabel must match for screen readers to read the label.',
          "Using the native prop renders the browser's default <select>.",
          'Disabled options automatically receive aria-disabled.'
        ]
      },
      radix: {
        additionalChecks: [
          { title: 'Use with Label component', description: 'Connect a Label component to Select.Trigger via htmlFor and id for proper labeling.' }
        ],
        notes: [
          'Radix Select follows the W3C ListBox and Select-Only Combobox patterns.',
          'Adding the disabled prop to Select.Item automatically applies aria-disabled.',
          'Adjust positioning with position="popper" on Select.Content.'
        ]
      },
      antd: {
        additionalChecks: [{ title: 'Connect label', description: 'Use Form.Item to automatically connect label and select via htmlFor.' }],
        notes: [
          'Using Form.Item automatically connects label and input via htmlFor.',
          'Adding showSearch switches to the combobox pattern.',
          'Setting virtual={false} improves screen reader compatibility by disabling virtual scrolling.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'HiddenSelect for form accessibility',
            description: 'Chakra Select.HiddenSelect is a native element needed for form submission — do not remove it.'
          }
        ],
        notes: [
          'Chakra Select.Root meets WAI-ARIA requirements with the listbox pattern.',
          'Select.HiddenSelect is the native element for form submission.',
          'Manage item collections with useListCollection.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'react-aria-components Select combines Label, Button, SelectValue, Popover, and ListBox as compound components.',
          'SelectValue automatically displays the currently selected value.',
          'Use selectedKey/onSelectionChange for controlled usage.'
        ]
      }
    }
  },

  tabs: {
    description: 'A pattern for dividing content into tabbed sections and switching between them',
    baseline: {
      checklist: {
        must: [
          { title: 'tablist role on the tab container', description: 'The element wrapping all tabs must have role="tablist".' },
          { title: 'tab role on each tab', description: 'Each tab element must have role="tab".' },
          { title: 'tabpanel role on each panel', description: 'Each content section must have role="tabpanel" and a unique id.' },
          { title: 'Tab references its panel via aria-controls', description: 'Each tab must have aria-controls pointing to the id of its panel.' },
          {
            title: 'Active tab has aria-selected',
            description: 'The active tab must have aria-selected="true"; all others must have aria-selected="false".'
          },
          { title: 'Arrow key navigation between tabs', description: 'Left/right arrow keys navigate between tabs; Tab moves to the active panel.' }
        ],
        should: [
          { title: 'Panel is labeled by its tab', description: 'Each tabpanel should reference its controlling tab via aria-labelledby.' },
          { title: 'Use roving tabindex', description: 'Only the active tab should have tabindex="0"; inactive tabs should have tabindex="-1".' },
          { title: 'Home/End keys for first/last tab', description: 'Home should jump to the first tab; End should jump to the last.' }
        ],
        avoid: [
          {
            title: 'Do not omit ARIA roles',
            description: 'Implementing tabs with only CSS and JS without ARIA roles makes them invisible to screen readers.'
          },
          { title: 'Do not expose inactive panels', description: 'Inactive tabpanels must be hidden using the hidden attribute or display:none.' }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          { title: 'Connect TabPanel and Tabs by value', description: 'Match the value of MUI Tabs and each TabPanel to control the active panel.' },
          { title: 'Add aria-label or aria-labelledby', description: 'Add aria-label or aria-labelledby to the MUI Tabs component.' }
        ],
        notes: [
          'MUI Tabs automatically handles arrow key navigation and roving tabindex.',
          'If TabScrollButton is visible, guide screen reader users on the scroll direction.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Set activationMode="manual"',
            description:
              'With activationMode="manual", arrow keys only move focus; Enter/Space confirms selection. This is more accessible than automatic activation.'
          }
        ],
        notes: [
          'Radix Tabs automatically handles all ARIA roles and keyboard navigation.',
          'Add aria-label to Tabs.List to describe the purpose of the tab group.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Watch for accessKey conflicts',
            description: 'Verify that keyboard shortcuts used by Ant Design Tabs do not conflict with browser shortcuts.'
          }
        ],
        notes: [
          'Ant Design Tabs handles accessibility attributes by default.',
          'If using tabBarExtraContent, verify those elements are also keyboard-accessible.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Provide aria-label on Tabs.List',
            description: 'Add an aria-label to Tabs.List to communicate the purpose of the tab group to screen readers.'
          }
        ],
        notes: [
          'Chakra Tabs.Root handles keyboard navigation and aria attributes automatically.',
          'Use the lazyMount prop to defer rendering of inactive tab content.',
          'Tabs.Indicator is rendered as aria-hidden.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Aria Tabs automatically implements arrow key, Home, and End navigation.',
          'Each Tab id is automatically linked to the corresponding TabPanel id.',
          "Use keyboardActivation='manual' to separate focus and activation."
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'aria-label on Tabs.List is required',
            description: 'Add an aria-label to Tabs.List to communicate the purpose of the tab group to screen readers.'
          },
          {
            title: 'Place Tabs.Indicator inside Tabs.List',
            description: 'Base UI Tabs.Indicator must be placed inside Tabs.List so it can track position via CSS variables.'
          }
        ],
        notes: [
          'Tabs.Root automatically handles arrow key, Home, and End navigation and manages aria-selected.',
          'Tabs.Indicator uses --active-tab-left and --active-tab-width CSS variables to track the active tab position.',
          'Add the activateOnFocus prop to immediately activate a tab when it receives focus via arrow keys.'
        ]
      }
    }
  },

  'text-input': {
    description: 'A form control for accepting text input from users',
    baseline: {
      checklist: {
        must: [
          {
            title: 'Label association required',
            description: 'Use <label htmlFor> or aria-label/aria-labelledby to associate a label with the input.'
          },
          {
            title: 'Connect error messages',
            description: 'Link error messages to the input via aria-describedby and set aria-invalid="true" when invalid.'
          },
          { title: 'Mark required fields', description: 'Use required or aria-required="true" to indicate that a field is required.' },
          { title: 'Color contrast 4.5:1', description: 'Input text and background must meet a minimum contrast ratio of 4.5:1.' }
        ],
        should: [
          {
            title: 'Do not use placeholder as the only label',
            description: 'Placeholder cannot replace a label — always use a visible label alongside the input.'
          },
          { title: 'Add autocomplete attribute', description: 'Set appropriate autocomplete values on personal data fields (name, email, etc.).' },
          { title: 'Connect helper text', description: 'Link hint or helper text to the input via aria-describedby.' }
        ],
        avoid: [
          { title: 'Do not use placeholder as a label', description: 'Placeholder disappears on focus, leaving the user without context.' },
          { title: 'Do not indicate errors with color alone', description: 'Do not rely on a red border alone; always provide a text error message.' }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'TextField helperText and aria connection',
            description: "MUI TextField's helperText is automatically connected via aria-describedby. Do not set FormHelperText id manually."
          },
          {
            title: 'Verify InputLabel shrink behavior',
            description: 'Confirm that the label is still accessible to screen readers when a floating label shrinks.'
          }
        ],
        notes: [
          'MUI TextField automatically handles aria connections between label, input, and helperText.',
          'When the error prop is true, helperText automatically receives role="alert".',
          'Verify the border color contrast for variant="outlined" (minimum 3:1).'
        ]
      },
      radix: {
        additionalChecks: [
          { title: 'Use Form.Message', description: "@radix-ui/react-form's Form.Message manages aria-live automatically." },
          { title: 'Verify Form.Label connection', description: 'Explicitly verify the htmlFor/id connection between Form.Label and Form.Control.' }
        ],
        notes: [
          '@radix-ui/react-form automatically connects HTML5 validation with ARIA.',
          'Form.Message behaves as aria-live based on the validation condition.',
          'Handle custom validation with the serverInvalid prop.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Sync Form.Item rules with aria',
            description: 'Ant Design Form validation messages may not be connected via aria-describedby. Manual verification is required.'
          },
          { title: 'Add aria-hidden to prefix/suffix icons', description: 'Add aria-hidden to prefix and suffix icons on the Input component.' }
        ],
        notes: [
          'Ant Design Form.Item automatically connects the label and input.',
          'Use validateTrigger to control when real-time validation fires.',
          'Use the Form.Item tooltip prop to provide additional descriptions.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Pass invalid/required to Field.Root',
            description: 'Passing invalid and required props to Field.Root automatically applies aria attributes to the child Input.'
          }
        ],
        notes: [
          "Chakra Field.Root's invalid prop automatically sets aria-invalid on the Input.",
          'Field.ErrorText delivers errors to screen readers via aria-live.',
          'The required prop handles both Field.RequiredIndicator and aria-required.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Use isRequired/isInvalid props',
            description: 'React Aria TextField automatically manages aria attributes with isRequired, isInvalid, and errorMessage.'
          }
        ],
        notes: [
          'React Aria TextField is a compound component: combine Label, Input, Text, and FieldError.',
          'isRequired="true" automatically applies aria-required.',
          'FieldError is automatically connected via aria-describedby when validation fails.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Use the Field component for best accessibility',
            description: 'Wrapping with Field.Root from @base-ui/react/field provides automatic label-input association and error message wiring.'
          }
        ],
        notes: [
          'Base UI Input renders a native <input> element.',
          'Combining Field.Root + Field.Label + Field.Control strengthens form accessibility.',
          'Field.Error automatically links validation messages to the input.'
        ]
      }
    }
  },

  toggle: {
    description: 'A control for switching between two states (on/off)',
    baseline: {
      checklist: {
        must: [
          { title: 'Use role="switch"', description: 'Use role="switch" with aria-checked to indicate the on/off state.' },
          { title: 'Connect a label', description: "A label describing the toggle's purpose must be associated with it." },
          { title: 'Keyboard operable', description: 'The Space key must activate the toggle.' },
          { title: 'Announce state change', description: 'State changes must be communicated to screen readers.' }
        ],
        should: [
          { title: 'Provide on/off text', description: 'Display the state as text (On/Off) in addition to color.' },
          { title: '44×44px touch target', description: 'Ensure a sufficient touch area on mobile.' }
        ],
        avoid: [
          { title: 'Do not distinguish state with color alone', description: 'Green/grey alone does not communicate on/off to color-blind users.' },
          {
            title: 'Do not use a checkbox to implement a switch',
            description: 'A checkbox is semantically different from a switch even if styled the same. Use role="switch".'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          { title: 'Use FormControlLabel to connect a label', description: 'Pair MUI Switch with FormControlLabel to associate it with a label.' },
          {
            title: 'Add aria-label via inputProps when used standalone',
            description: 'When used without FormControlLabel, add an aria-label via inputProps.'
          }
        ],
        notes: [
          'MUI Switch uses an <input type="checkbox"> internally.',
          'role="switch" is not applied automatically — add it via inputProps.',
          'Re-verify contrast ratios when changing the color prop.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Switch.Thumb visual indicator contrast',
            description: 'Switch.Thumb is aria-hidden and serves only as a visual indicator. Maintain sufficient color contrast.'
          },
          {
            title: 'Use onCheckedChange with checked in controlled mode',
            description: 'In controlled mode, use both the checked prop and onCheckedChange together.'
          }
        ],
        notes: [
          'Radix Switch automatically manages role="switch" and aria-checked.',
          'Connect a label to Switch.Root using htmlFor/id.',
          'Thumb is automatically aria-hidden.'
        ]
      },
      antd: {
        additionalChecks: [
          { title: 'Provide checkedChildren text', description: 'Use checkedChildren and unCheckedChildren to display the on/off state as text.' },
          { title: 'Add aria-label directly', description: 'Add an aria-label directly to the Ant Design Switch to describe its purpose.' }
        ],
        notes: [
          'Ant Design Switch uses role="switch" internally.',
          'checkedChildren/unCheckedChildren are helpful for color-blind users.',
          'When using the loading prop, also set aria-busy.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Use Switch.Label', description: 'Switch.Label automatically connects the label to the input — no separate htmlFor needed.' }
        ],
        notes: [
          "Chakra Switch.Root automatically sets role='switch' and aria-checked.",
          'Switch.HiddenInput is the actual input element required for form submission.',
          'Update state using the checked value from the onCheckedChange event.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          "React Aria Switch automatically handles role='switch', aria-checked, and keyboard support.",
          'Provide the label text directly as children.',
          'Use isSelected/onChange for controlled component mode.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Switch.Root requires render={<button />}',
            description: 'Switch.Root renders as a <span> by default. Pass render={<button />} to use a semantic button element.'
          },
          {
            title: 'Thumb position must be implemented with CSS',
            description: 'Base UI Switch is unstyled; implement the Thumb translateX for checked/unchecked states via CSS.'
          }
        ],
        notes: [
          'Switch.Root renders as <span> by default. Use render={<button />} to ensure semantic button markup.',
          'role="switch" and aria-checked are managed automatically.',
          'Use the Toggle component (@base-ui/react/toggle) for aria-pressed toggle buttons instead.'
        ]
      }
    }
  },

  tooltip: {
    description: 'A popup text pattern that provides additional information about an element',
    baseline: {
      checklist: {
        must: [
          { title: 'tooltip role on the popup', description: 'The tooltip element must have role="tooltip".' },
          {
            title: 'Connect to trigger via aria-describedby',
            description: 'The triggering element must reference the tooltip id via aria-describedby.'
          },
          { title: 'Dismiss with Escape', description: 'Pressing Escape must dismiss the tooltip.' }
        ],
        should: [
          { title: 'Show tooltip on focus as well', description: 'The tooltip must appear on both hover and keyboard focus, not hover alone.' },
          {
            title: 'No focusable content inside',
            description: 'Tooltip content must not contain interactive elements (links, buttons), as they would be unreachable.'
          },
          { title: 'Keep tooltip visible while hovering it', description: 'The tooltip must remain visible when the user moves the mouse over it.' },
          {
            title: 'Show after a short delay',
            description: 'Introduce a short delay (e.g., 300ms) before showing the tooltip to reduce distraction.'
          }
        ],
        avoid: [
          {
            title: 'Do not put interactive content in tooltips',
            description: 'Interactive content (links, buttons) inside a tooltip cannot be reached with keyboard or screen readers.'
          },
          {
            title: 'Do not rely on title attribute alone',
            description: 'The HTML title attribute is not reliably announced by screen readers. Use role="tooltip" with aria-describedby.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          { title: 'Set enterDelay', description: 'Set enterDelay to at least 300ms so the tooltip does not appear on accidental hover.' }
        ],
        notes: ['MUI Tooltip automatically handles role="tooltip" and aria-describedby.', 'When using custom children, implement forwardRef.']
      },
      radix: {
        additionalChecks: [
          { title: 'Place TooltipProvider at the top level', description: 'Wrap your app with TooltipProvider to manage tooltip behavior globally.' }
        ],
        notes: ['Radix Tooltip automatically handles role="tooltip" and aria-describedby.', 'Rendering via Portal prevents z-index issues.']
      },
      antd: {
        additionalChecks: [
          { title: 'Set mouseEnterDelay', description: 'Set mouseEnterDelay to at least 0.3 seconds to prevent accidental tooltip triggers.' }
        ],
        notes: ['Ant Design Tooltip handles accessibility attributes internally.', 'Re-verify text contrast ratio when changing the color prop.']
      },
      chakra: {
        additionalChecks: [
          {
            title: 'aria-label on trigger element',
            description: 'If the trigger is an icon-only button, provide aria-label on the trigger instead of relying solely on the tooltip.'
          }
        ],
        notes: [
          'Chakra Tooltip automatically handles hover/focus events.',
          'Adjust display timing with the showDelay/closeDelay props.',
          'Provide the tooltip text via the content prop.'
        ]
      },
      spectrum: {
        additionalChecks: [],
        notes: [
          'React Aria TooltipTrigger handles hover, focus, and keyboard interactions.',
          'Set display delay with the delay prop (default 1200ms).',
          'Tooltip is automatically connected to the trigger via aria-describedby.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Place Tooltip.Provider at the root',
            description: 'Placing Tooltip.Provider at the app root centralizes delay management across all tooltips.'
          },
          {
            title: 'aria-label on Trigger is required',
            description: 'Base UI Tooltip does not auto-connect aria-describedby. Provide an accessible name directly via aria-label on the trigger.'
          }
        ],
        notes: [
          'Tooltips appear on focus/hover automatically and dismiss on Escape.',
          'Base UI Tooltip does not automatically set aria-describedby on the trigger — provide aria-label directly on the trigger.',
          'Use Tooltip.Portal to render into the body and avoid overflow:hidden clipping issues.'
        ]
      }
    }
  }
}
