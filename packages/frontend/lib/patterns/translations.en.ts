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
            title: 'Set id and aria-controls on AccordionSummary',
            description:
              'Per WAI-ARIA guidelines, set id on AccordionSummary and aria-controls pointing to the panel id. MUI derives aria-labelledby automatically from these.'
          },
          {
            title: 'Adjust heading level with slotProps.heading',
            description:
              'MUI Accordion defaults to h3. Change the heading level using slotProps={{ heading: { component: "h2" } }} to match your page hierarchy.'
          }
        ],
        notes: [
          'aria-expanded is managed automatically based on the expanded prop state.',
          'Set id and aria-controls on AccordionSummary; MUI derives aria-labelledby for the panel automatically.',
          'Use slotProps={{ heading: { component: "h3" } }} to adjust heading level to match page structure.',
          'Use slotProps={{ transition: { unmountOnExit: true } }} to remove inactive panels from the DOM for better performance.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Control single/multiple expand with the type prop',
            description:
              'Use type="single" to allow only one panel open at a time, or type="multiple" to allow several. Make this behavior clear through the UI.'
          },
          {
            title: 'Allow full collapse with the collapsible prop',
            description: 'When type="single", adding the collapsible prop lets users click an open panel again to close it.'
          }
        ],
        notes: [
          'The type prop on Accordion.Root controls expansion behavior: "single" (one at a time) or "multiple" (simultaneous). collapsible is only valid with type="single".',
          'Accordion.Header renders as <h3> by default. Use asChild to change the heading level.',
          'aria-expanded and data-state ("open" | "closed") are automatically managed on Accordion.Trigger.',
          'Use defaultValue for uncontrolled or value + onValueChange for controlled open state.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Use accordion prop for single-expand mode',
            description: 'Setting accordion={true} allows only one panel to be open at a time. Make this behavior visually clear to users.'
          },
          {
            title: 'Use items API (v5.6.0+)',
            description: 'Use the items prop with key/label/children objects instead of Collapse.Panel, which is deprecated since v5.6.0.'
          },
          {
            title: 'Use collapsible to disable individual panels',
            description: 'Set collapsible="disabled" on specific items in the items array to prevent users from expanding those panels.'
          }
        ],
        notes: [
          'Ant Design Collapse automatically manages aria-expanded on panel headers.',
          'The items API (v5.6.0+) replaces Collapse.Panel. Use key/label/children in the items array.',
          'expandIconPlacement controls icon position; the icon is rendered as aria-hidden.',
          'Setting accordion={true} applies aria-expanded=false to all inactive panels automatically.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Multiple mode support',
            description:
              'Adding the multiple prop to Accordion.Root allows multiple items to be open simultaneously. aria-expanded is still managed correctly in both modes.'
          }
        ],
        notes: [
          'Chakra Accordion.Root automatically handles keyboard navigation, aria-expanded, and focus management.',
          'ItemIndicator is rendered as aria-hidden and serves as the visual expand/collapse arrow.',
          'Use the collapsible prop to allow all items to be closed simultaneously.',
          'Use the multiple prop to allow multiple panels to be open at the same time.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Heading wraps the trigger Button',
            description:
              'Each Disclosure trigger must be a Button with slot="trigger" nested inside a Heading element to satisfy the WAI-ARIA Accordion pattern.'
          }
        ],
        notes: [
          'React Aria DisclosureGroup implements the WAI-ARIA Accordion pattern using Disclosure, Heading, and DisclosurePanel.',
          'Set defaultExpandedKeys to pre-expand items; use expandedKeys + onExpandedChange for controlled mode.',
          'Use allowsMultipleExpanded to allow more than one panel to be open at the same time.',
          'aria-expanded and aria-controls are managed automatically on the trigger Button.'
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
          'Accordion.Trigger manages aria-expanded automatically. The data-panel-open attribute enables CSS-based styling.',
          'Add the multiple prop to allow multiple panels to be open simultaneously. Default is false (single-expand).',
          'The loopFocus prop (default true) controls whether arrow key navigation cycles at the first and last items.',
          'Use the hiddenUntilFound prop to make closed panel content discoverable via browser Ctrl+F search.'
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
            title: 'Use Snackbar + Alert for toast notifications',
            description:
              'Combine Snackbar for positioning and timing with Alert for role="alert" and severity. Set autoHideDuration to at least 5000ms.'
          },
          {
            title: 'Set minimum autoHideDuration of 5000ms',
            description: 'Values below 5000ms may violate WCAG 2.2.3 (No Timing). Set to null to require manual dismissal.'
          },
          {
            title: 'Distinguish inline alerts from toast alerts',
            description: 'Use standalone Alert for persistent status messages on the page, and Snackbar + Alert for transient toast notifications.'
          }
        ],
        notes: [
          'MUI Alert used standalone automatically receives role="alert" and announces to screen readers.',
          'Snackbar onClose with reason check (reason !== "clickaway") prevents unintentional dismissal.',
          'The severity prop (success/info/warning/error) automatically applies matching icons, colors, and accessible meaning.',
          'Set autoHideDuration={null} to require explicit user action to dismiss.'
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
            title: 'Always set showIcon',
            description:
              'Setting showIcon={true} displays an icon that conveys the severity type (success/warning/error/info). This provides a non-color visual indicator alongside the color change.'
          },
          {
            title: 'closable with aria-* support (v5.15.0+)',
            description:
              'When using closable={true}, pass closeIcon or closable={{ aria-label: "Dismiss alert" }} (v5.15.0+) to provide an accessible label for the close button.'
          },
          {
            title: 'Use App.useApp() for notification API',
            description:
              'Wrap your app in <App> and use App.useApp() to access the notification API. This ensures the notification is rendered within the correct React context.'
          }
        ],
        notes: [
          'Use the title prop for the main heading and description for body text. Both are exposed to assistive technologies.',
          'Combining showIcon with the type prop provides both a visual icon and color to convey severity.',
          'The closable.aria-label prop (v5.15.0+) adds an accessible label to the close button.',
          'Notification API: set duration={0} to keep open until manually closed. Default is 4.5 seconds.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Set role per status',
            description: 'Use role="alert" for urgent alerts (error/warning) and role="status" for informational ones.'
          }
        ],
        notes: [
          'The status prop on Chakra Alert.Root (info/success/warning/error/neutral) sets visual styles and color automatically.',
          'For dynamically inserted alerts, explicitly set role="alert" to ensure immediate screen reader announcement.',
          'Alert.Indicator is automatically given aria-hidden.',
          'neutral is also a valid status value for low-priority informational alerts.'
        ]
      }
    }
  },

  badge: {
    description: 'A non-interactive indicator attached to another element to show status or a count',
    baseline: {
      checklist: {
        must: [
          {
            title: 'Accessible name on the host element',
            description:
              'Provide an aria-label on the element that owns the badge (icon button, avatar). The numeric badge alone does not convey meaning.'
          },
          {
            title: 'Include units in the count',
            description: 'Use phrases like "3 unread notifications" instead of bare numbers so the label has meaningful context.'
          },
          {
            title: 'Do not rely on color alone',
            description:
              'Never use color alone to distinguish success / error / warning states. Always pair color with text or an accessible name (WCAG 1.4.1).'
          }
        ],
        should: [
          {
            title: 'Mark decorative badges aria-hidden',
            description: 'Dot badges that are purely visual should use aria-hidden="true" while the meaning is carried by the parent element.'
          },
          {
            title: 'Use a live region for dynamic badges',
            description: 'When the count updates in real time, announce changes with role="status" or aria-live="polite".'
          }
        ],
        avoid: [
          {
            title: 'Avoid duplicate announcements',
            description: 'Do not expose the badge text to assistive tech when the parent label already contains the same information.'
          },
          {
            title: 'Do not convey status with color only',
            description: 'Colored dots without a visible text label are unreadable for color-blind users.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'Add aria-label on the parent element',
            description: 'MUI does not reliably announce badgeContent. Put the full meaning on the wrapping IconButton or button via aria-label.'
          },
          {
            title: 'variant="dot" needs non-color cues',
            description: 'Dot badges carry no text, so repeat the state in the parent aria-label.'
          },
          {
            title: 'Decide whether to show zero',
            description: 'badgeContent={0} is hidden by default. Opt in with showZero when 0 should still be visible.'
          }
        ],
        notes: [
          'MUI Badge badgeContent is visual-only; always provide the full context via aria-label on the parent IconButton / button.',
          'The max prop automatically renders overflow indicators like "99+".',
          'For variant="dot", color alone carries the state. Provide an aria-label with the meaning so screen reader users are not left guessing.',
          'badgeContent={0} is hidden by default. Use showZero if zero must still be displayed.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Use the title prop to strengthen the name',
            description: "Ant Badge's title prop forwards to the native title attribute and helps assistive tech and hover users."
          },
          {
            title: 'Pair status/color badges with a text label',
            description: 'Prefer <Badge status="success" text="Ready" />. Status color alone is not enough for color-blind users.'
          },
          {
            title: 'Include Ribbon content in accessible names',
            description: 'If Badge.Ribbon is decorative, duplicate its text in the parent card or button aria-label.'
          }
        ],
        notes: [
          'Always pass a descriptive title prop to Ant Badge when using the count variant.',
          'The status + text combination is mandatory for color-blind accessibility — never use status on its own.',
          'overflowCount defaults to 99 and renders "99+" automatically for larger values.',
          'Dot badges (boolean dot prop) require a parent aria-label that describes the state.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Chakra Badge is a text component',
            description:
              'Chakra v3 Badge renders its children as the visible label. When used standalone, the text itself is the accessible name — use meaningful words.'
          },
          {
            title: 'colorPalette alone is not enough',
            description: "Don't rely on colorPalette='red' to mean error. Always include a text label like 'Error' or 'Draft' (WCAG 1.4.1)."
          },
          {
            title: 'Wrap count badges with an accessible name',
            description:
              'If you use Chakra Badge as a floating count over an IconButton, add aria-label to the wrapping button that contains the full meaning.'
          }
        ],
        notes: [
          'Chakra v3 Badge is a simple label component. Its children text becomes the accessible name — use clear words like "Ready" or "Failed".',
          'colorPalette only changes visual style. Screen readers cannot perceive color, so always encode meaning in the text.',
          'variant can be solid / subtle / outline / surface / plain.',
          'When composing a count badge (number + icon), add aria-label on the wrapping button that conveys the full context.'
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
            title: 'Handle aria-busy for loading state',
            description:
              'Add aria-busy="true" to a loading button and apply aria-hidden to the CircularProgress so screen readers do not announce the spinner.'
          },
          {
            title: 'Verify contrast for outlined variant',
            description:
              'The border color of the outlined variant must meet a minimum 3:1 contrast ratio against the background. Verify this in the default theme.'
          },
          {
            title: 'Check role when using component="a"',
            description:
              'Using the component prop to render an <a> makes it a link, not a button. Keep component="button" for actions; use <a> only for navigation.'
          }
        ],
        notes: [
          'MUI Button renders a <button type="button"> element by default.',
          'The disabled prop removes focus from the tab order. Use aria-disabled only if you need to keep focus on the element.',
          'Avoid component="a" for non-navigation actions — it changes the semantic meaning from button to link.',
          'Use sx={{ minHeight: 44 }} to meet the WCAG 2.5.5 touch target size requirement.'
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
            title: 'danger button needs descriptive aria-label',
            description:
              'danger={true} only changes the button color. For destructive actions, add an aria-label that describes the consequence (e.g., aria-label="Delete account permanently").'
          },
          {
            title: 'loading state should set aria-busy',
            description:
              'When loading={true} the spinner is shown but screen readers may not be notified. Add aria-busy={loading} to the Button to announce the pending state.'
          },
          {
            title: 'Use htmlType for form submit buttons',
            description:
              'Set htmlType="submit" on the form submit Button so it participates in the form submission flow and can be triggered with Enter in inputs.'
          }
        ],
        notes: [
          'Ant Design Button renders a semantic <button> element internally.',
          'htmlType prop controls the type attribute: "button" (default), "submit", or "reset".',
          'loading={true} adds a spinner — combine with aria-busy={true} for screen reader awareness.',
          'color + variant props (v5.21.0+) offer more styling options than type alone.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Provide loadingText when loading',
            description: 'Set loadingText on Chakra Button so screen readers announce the loading state instead of staying silent.'
          }
        ],
        notes: [
          'Chakra Button renders a <button> element internally.',
          'When loading is true, the button is automatically disabled and a spinner is displayed.',
          'Setting loadingText provides a text label alongside the spinner for screen readers.',
          'Use colorPalette to apply Chakra brand colors to the button.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Use isPending for pending state',
            description:
              'The isPending prop keeps the button focusable while blocking press/hover events, and announces the pending state to screen readers. Render a ProgressBar alongside it.'
          }
        ],
        notes: [
          'Use onPress instead of onClick. onPress normalizes mouse, keyboard, and touch interactions.',
          'isPending keeps focus while disabling interactions and announces the pending state to assistive technologies.',
          'isDisabled automatically sets aria-disabled and removes focus.',
          'Pass a function to children to access render props like isHovered, isPressed, and isFocusVisible for styling.'
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
          'Base UI Button renders a native <button type="button"> element by default.',
          'Use focusableWhenDisabled to keep the button in the tab sequence even when disabled.',
          'Use the render prop to change the rendered element (e.g., render={<a />}); set nativeButton={false} when doing so.',
          'The data-disabled attribute is set when disabled — use it for CSS styling instead of the :disabled pseudo-class.'
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
            title: 'Checkbox.Indicator only renders when checked',
            description:
              'Checkbox.Indicator mounts only when the checkbox is checked or indeterminate. Always include a visible icon or symbol inside — without it, the checked state will be invisible.'
          },
          {
            title: 'Handle the indeterminate value type in onCheckedChange',
            description:
              'The onCheckedChange callback receives boolean | "indeterminate". Use a type guard when handling this value to avoid unexpected behavior.'
          }
        ],
        notes: [
          'Checkbox.Root automatically manages role="checkbox" and aria-checked. Connect a label via htmlFor/id.',
          'onCheckedChange receives boolean | "indeterminate". Set checked="indeterminate" on Checkbox.Root to express a partial selection state.',
          'Checkbox.Indicator renders only when the state is checked or indeterminate. Always provide a visual indicator inside.',
          'The data-state attribute ("checked" | "unchecked" | "indeterminate") can be used as a CSS selector for state-based styling.'
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

  chip: {
    description: 'An interactive tag or chip component for selection, filtering, or removal',
    baseline: {
      checklist: {
        must: [
          {
            title: 'Interactive chips must be buttons',
            description: 'Clickable / removable chips must render as <button> or role="button" and participate in the Tab sequence.'
          },
          {
            title: 'Label the remove button',
            description: 'Icon-only remove buttons must expose an accessible name like aria-label="Remove <tag name>".'
          },
          {
            title: 'Group chips with a role and label',
            description:
              'When multiple chips are grouped together, use role="group" or role="listbox" with an aria-label that states the group purpose.'
          },
          {
            title: 'Keyboard interaction',
            description: 'Enter/Space must activate the chip, and removable chips must support Backspace/Delete while focused.'
          }
        ],
        should: [
          {
            title: 'Move focus after deletion',
            description: 'After removing a chip, shift focus to an adjacent chip or the parent container so focus is never lost.'
          },
          {
            title: 'Expose selection state',
            description: 'Selectable chips must announce state via aria-pressed or aria-selected.'
          }
        ],
        avoid: [
          {
            title: 'Do not conflate click and delete',
            description:
              'A single chip should not both toggle selection and trigger deletion on the same click. Delete actions belong in a dedicated button.'
          },
          {
            title: 'Icon-only buttons need an accessible name',
            description: 'A × glyph with no aria-label leaves screen reader users without any indication of the action.'
          }
        ]
      }
    },
    designSystems: {
      material: {
        additionalChecks: [
          {
            title: 'onDelete / onClick enable button semantics automatically',
            description:
              'MUI Chip participates in the Tab order and handles Backspace/Delete when onDelete is provided. These behaviors are built in, so rely on them rather than reimplementing.'
          },
          {
            title: 'Verify custom deleteIcon labels',
            description:
              'A custom deleteIcon may drop the default accessible name. Provide an aria-label on the Chip itself so the removal target is still clear.'
          },
          {
            title: 'Never rely on color alone',
            description: 'Do not use the color prop (primary/success/error) as the sole way to communicate state; pair it with a text label or icon.'
          }
        ],
        notes: [
          "Adding onClick or onDelete to a MUI Chip automatically includes it in the Tab order and gives it role='button' semantics.",
          'While focused, Backspace and Delete invoke onDelete, and Escape blurs the chip (built-in MUI behavior).',
          'Default delete icon labels vary by language. Add an aria-label on the Chip or embed the meaning in the label itself for clarity.',
          'Give the Stack role="group" and an aria-label so assistive tech announces the chip group as a single named region.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Closable Tag requires an accessible name',
            description:
              "Ant Tag's default close icon may lack an accessible name. Customize closeIcon and provide an aria-label that references the tag content."
          },
          {
            title: 'Verify CheckableTag semantics',
            description:
              "Tag.CheckableTag toggles its checked state on click and internally sets role='checkbox' with aria-checked. Provide an aria-label on the group container for context."
          },
          {
            title: 'Do not communicate state with color alone',
            description: 'Always include a text label — color cannot carry status meaning on its own.'
          }
        ],
        notes: [
          "Ant Tag's closable prop renders a default close button. Replace it with a custom closeIcon that includes an explicit aria-label when needed.",
          'Call e.preventDefault() inside onClose to block the default close behavior and drive state manually.',
          'Use Tag.CheckableTag for selection-style chips; control state with checked / onChange.',
          'Wrap tags in Space (role="group") with an aria-label to communicate the purpose of the group.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Label Tag.CloseTrigger',
            description:
              'Chakra v3 Tag.CloseTrigger renders as a button. Because only an icon is visible, provide an explicit aria-label that names the chip being removed.'
          },
          {
            title: 'Use meaningful Tag.Label text',
            description: 'Tag.Label is the visible text of the chip. Encode the meaning in the label rather than relying on color or icons alone.'
          },
          {
            title: 'Group containers need a role and label',
            description: 'Add role="group" and aria-label to the Wrap / HStack wrapping multiple tags so the purpose of the group is announced.'
          }
        ],
        notes: [
          'Chakra v3 Tag uses the Tag.Root / Tag.Label / Tag.StartElement / Tag.EndElement / Tag.CloseTrigger namespace.',
          'Tag.CloseTrigger renders a button internally; an aria-label is mandatory because only an icon is visible.',
          'colorPalette and variant (subtle / solid / outline / surface) affect appearance only. The meaning must live in Tag.Label.',
          'Give the HStack/Wrap role="group" and aria-label so the chip collection reads as a single named region.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'TagGroup requires an aria-label',
            description:
              'React Aria TagGroup is a focusable list. Always set <TagGroup aria-label="..."> (or use a <Label>) so screen readers announce the group.'
          },
          {
            title: 'onRemove enables keyboard deletion',
            description:
              'Without an onRemove prop, Backspace / Delete will not remove tags — the key handlers are wired up when the callback is present.'
          },
          {
            title: 'Declare selection semantics explicitly',
            description: "Use selectionMode='single' or 'multiple' to wire aria-selected. Stick with 'none' for plain lists."
          }
        ],
        notes: [
          'TagGroup is a focusable list that automatically provides arrow-key navigation.',
          'Backspace / Delete only trigger removal when onRemove is provided; without it, keyboard deletion does not work.',
          'A Button with slot="remove" is auto-recognized as the delete trigger. Still provide an aria-label so the target is explicit.',
          "selectionMode='single' or 'multiple' wires aria-selected automatically.",
          'The Label component connects aria-labelledby automatically. You can also pass aria-label directly on TagGroup.'
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
        additionalChecks: [
          {
            title: 'Control free-form input with allowsCustomValue',
            description: 'allowsCustomValue={true} allows values not in the list. Default is false, restricting selection to listed items.'
          }
        ],
        notes: [
          'ComboBox automatically manages role="combobox", aria-expanded, aria-autocomplete, and aria-controls.',
          'Compose Label, Group (input wrapper), Input, Button (toggle), Popover, and ListBox as compound components.',
          'Use allowsCustomValue={true} to permit free-form text input not present in the list.',
          'Provide a defaultFilter prop for a custom filter function, or manipulate the items prop directly for server-side filtering.'
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
            title: 'Use the @mui/x-date-pickers package',
            description:
              'MUI DatePicker lives in the separate @mui/x-date-pickers package. LocalizationProvider and a date adapter (e.g., AdapterDateFns) are required.'
          },
          {
            title: 'Pass accessibility props via slotProps.textField',
            description:
              'Use slotProps.textField to pass helperText, required, and error props to the underlying TextField for proper screen reader connections.'
          },
          {
            title: 'Provide format hint via helperText',
            description:
              'Set slotProps.textField.helperText to show the expected date format so users can predict what to enter. It is auto-connected via aria-describedby.'
          }
        ],
        notes: [
          '@mui/x-date-pickers splits the date input into segments (month/day/year) and automatically handles keyboard navigation and screen reader ARIA.',
          'Place LocalizationProvider once at the app root rather than wrapping each individual DatePicker.',
          'Use disablePast, disableFuture, minDate, or maxDate to limit the selectable range — aria-disabled is applied to excluded dates automatically.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Set locale via ConfigProvider',
            description:
              'Wrap with ConfigProvider and set locale={enUS} (or your locale) so calendar labels and navigation buttons are rendered in the correct language.'
          },
          {
            title: 'Use status prop for validation state',
            description:
              'Set status="error" or status="warning" on DatePicker to visually indicate invalid input. Pair with a Form.Item to connect the error message via aria-describedby.'
          },
          {
            title: 'disabledDate callback for restricted dates',
            description: 'Use the disabledDate prop to disable specific dates. Ant Design applies aria-disabled to those dates in the calendar grid.'
          }
        ],
        notes: [
          'Wrapping DatePicker in Form.Item with label + name automatically connects the label via htmlFor.',
          'Ant Design DatePicker supports keyboard navigation inside the calendar but screen reader support may be incomplete.',
          'Use ConfigProvider locale={enUS} to localize the calendar UI. For critical date inputs, also provide a plain text input fallback.',
          'disabledDate receives the candidate date as a Dayjs object — return true to disable it.'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'Add aria-label to prev/next month buttons',
            description: 'Add aria-label to DatePicker.PrevTrigger and DatePicker.NextTrigger so screen readers can identify the navigation controls.'
          }
        ],
        notes: [
          'Add aria-label to DatePicker.PrevTrigger and DatePicker.NextTrigger.',
          'DatePicker.TableCellTrigger automatically sets the full date string as aria-label on each day cell.',
          'Use the @internationalized/date package for date value types.',
          'Wrap DatePicker.Positioner in Portal to prevent z-index stacking issues.'
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
          {
            title: 'Collapsible.Trigger manages aria-expanded automatically',
            description: 'Collapsible.Trigger automatically sets aria-expanded based on the open/closed state. No manual implementation needed.'
          },
          {
            title: 'Use open/onOpenChange for controlled mode',
            description: 'Pass open and onOpenChange together for a controlled component. Use defaultOpen for uncontrolled initial state.'
          }
        ],
        notes: [
          'Collapsible.Trigger automatically manages aria-expanded and aria-controls.',
          'Use open + onOpenChange (controlled) or defaultOpen (uncontrolled) to manage the open state.',
          'Collapsible.Content renders display:none when closed. Use the data-state attribute ("open" | "closed") to apply CSS animations.',
          'Use asChild on Collapsible.Trigger to render it as any HTML element.'
        ]
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
        additionalChecks: [
          {
            title: 'Heading > Button slot="trigger" structure required',
            description: 'The Button inside Heading must have slot="trigger" to automatically manage aria-expanded and aria-controls.'
          }
        ],
        notes: [
          'Set slot="trigger" on the Button inside Heading to automatically manage aria-expanded and aria-controls.',
          'Use isExpanded/onExpandedChange for controlled mode, or defaultExpanded for uncontrolled.',
          'The --disclosure-panel-height CSS variable on DisclosurePanel can be used for height animations.',
          'Use isDisabled to disable individual disclosure items.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Collapsible.Trigger manages aria-expanded automatically',
            description: 'Base UI Collapsible.Trigger automatically sets aria-expanded and aria-controls based on the open/closed state.'
          },
          {
            title: 'Use hiddenUntilFound for browser-searchable panels',
            description: 'The hiddenUntilFound prop makes closed panel content discoverable via browser Ctrl+F search without opening the panel.'
          }
        ],
        notes: [
          'Collapsible.Trigger automatically manages aria-expanded and aria-controls.',
          'Use defaultOpen for uncontrolled mode, or open/onOpenChange for controlled mode.',
          'Collapsible.Panel is removed from the DOM when closed. Use the keepMounted prop to retain it in the DOM.',
          'Use hiddenUntilFound on Collapsible.Panel to make hidden content findable via browser Ctrl+F search.',
          'The data-panel-open attribute is set on Collapsible.Trigger; data-open is set on Collapsible.Panel for CSS styling.'
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
            title: 'Connect aria-labelledby to drawer title',
            description:
              'Pass the drawer heading element id to aria-labelledby on the Drawer component so screen readers correctly identify the dialog.'
          },
          {
            title: 'variant="temporary" is Modal-based',
            description:
              'variant="temporary" (the default) renders on top of a Modal and automatically provides focus trapping, Escape to close, and the backdrop overlay.'
          },
          {
            title: 'aria-label required on icon-only close button',
            description: 'Icon-only close buttons must have an aria-label (e.g., "Close navigation drawer") describing their purpose.'
          }
        ],
        notes: [
          'MUI Drawer variant="temporary" automatically handles focus trapping, Escape key, and backdrop click to close.',
          'Place a <nav aria-label="Main navigation"> inside the Drawer to provide a navigation landmark.',
          'Set aria-haspopup="dialog" on the trigger button so screen readers know it opens a dialog.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'title prop auto-connects aria-labelledby',
            description:
              'Setting the title prop renders a heading in the drawer header and connects it to the drawer via aria-labelledby automatically.'
          },
          {
            title: 'keyboard prop must remain true',
            description:
              'keyboard defaults to true, enabling Escape to close. Setting keyboard={false} breaks WCAG 2.1.2 No Keyboard Trap — do not disable it.'
          },
          {
            title: 'focusable prop for advanced focus control (v6.2.0+)',
            description:
              'Use focusable={{ trap: true, focusTriggerAfterClose: true }} to configure focus trapping and automatic return to the trigger after close.'
          }
        ],
        notes: [
          'Ant Design Drawer automatically renders role="dialog" and handles Escape to close.',
          'The title prop connects the drawer heading to the dialog via aria-labelledby automatically.',
          'keyboard={true} (default) enables Escape to close — do not set it to false.',
          'Use the footer prop to place primary action buttons at the bottom of the drawer.'
        ]
      },
      chakra: {
        additionalChecks: [{ title: 'CloseTrigger aria-label', description: 'Add aria-label="Close drawer" to the CloseTrigger button.' }],
        notes: [
          'Chakra Drawer.Root automatically handles focus trapping, aria-modal, and Escape to close.',
          'Drawer.Title is automatically connected via aria-labelledby — always include it.',
          'Use the placement prop to set the slide-in direction: end (default), start, top, or bottom.',
          'Always add aria-label to the close button.'
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
          {
            title: 'Match Form.Field name with Form.Message',
            description:
              'Form.Message is automatically linked to the input via aria-describedby using the Form.Field name. The name prop must match exactly for the connection to work.'
          },
          {
            title: 'Use the match prop for per-condition error messages',
            description:
              'Provide separate Form.Message elements for each validation condition (e.g., match="valueMissing", match="typeMismatch") to give precise, condition-specific error feedback.'
          }
        ],
        notes: [
          "Form.Message is automatically linked to the corresponding input via aria-describedby based on Form.Field's name.",
          'On submission failure, focus automatically moves to the first invalid field.',
          'The match prop uses HTML5 Constraint Validation API ValidityState properties (valueMissing, typeMismatch, tooShort, etc.). Custom validation functions are also supported.',
          'Form.Control asChild delegates Radix Form validation to the native input element.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Set validateTrigger to onBlur',
            description:
              'Use validateTrigger="onBlur" to run validation when the user leaves a field rather than on every keystroke. This reduces interruptions and aligns with WCAG 3.3.1.'
          },
          {
            title: 'scrollToFirstError for large forms',
            description:
              'Set scrollToFirstError={true} on Form to automatically scroll to and focus the first invalid field on submit, ensuring keyboard users are not left searching for errors.'
          },
          {
            title: 'Form.Item label + name auto-connects input',
            description:
              'Setting both label and name on Form.Item automatically connects the label to the input via htmlFor/id, satisfying WCAG 1.3.1 and 4.1.2.'
          }
        ],
        notes: [
          'Ant Design Form automatically applies aria-invalid and aria-describedby to inputs with validation errors.',
          'scrollToFirstError={true} scrolls and focuses the first error field on form submit.',
          'validateTrigger="onBlur" validates when the user leaves the field, reducing distractions during typing.',
          'Form.Item label + name automatically creates the label–input association via htmlFor.'
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
          'The invalid prop on Field.Root automatically propagates aria-invalid to the child Input.',
          'Add role="alert" to Field.ErrorText to immediately announce errors to screen readers.',
          'Field.RequiredIndicator handles both the visual asterisk and aria-required.',
          'Field.HelperText is automatically connected to the Input via aria-describedby.'
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
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Use Field.Root for complete accessibility wiring',
            description:
              'Field.Root from @base-ui-components/react/field automatically connects Field.Label, Field.Control, Field.Error, and Field.Description via aria-labelledby, aria-describedby, and aria-invalid.'
          },
          {
            title: 'Use Field.Error match prop for HTML5 constraint validation',
            description:
              'Field.Error renders conditionally based on the match prop key (e.g., valueMissing, typeMismatch, tooShort). This integrates with the browser constraint validation API without custom logic.'
          }
        ],
        notes: [
          'Field.Root automatically propagates aria-invalid to the child control when validation fails.',
          'Field.Error match values correspond to the HTML5 ValidityState keys: valueMissing, typeMismatch, tooShort, rangeUnderflow, etc.',
          'Field.Description is connected to the input via aria-describedby for persistent helper text.'
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
            title: 'Set aria-labelledby and aria-describedby explicitly',
            description:
              'Connect aria-labelledby to the DialogTitle id and aria-describedby to the DialogContent id on the Dialog component. MUI does not wire these automatically.'
          },
          {
            title: 'Do not use keepMounted',
            description: 'keepMounted={true} keeps a closed Dialog in the DOM. Screen readers may read hidden content, so avoid this prop.'
          },
          {
            title: 'Use autoFocus for initial focus control',
            description:
              'Add the autoFocus prop to the element that should receive focus when the modal opens — typically the primary confirm button.'
          }
        ],
        notes: [
          'aria-labelledby and aria-describedby are not set automatically by MUI and must be added explicitly to the Dialog.',
          'Add autoFocus to set the initial focus target when the modal opens. The default confirm button is recommended.',
          'DialogContentText automatically applies correct color contrast and typography styling.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Always provide Dialog.Title and Dialog.Description',
            description:
              'Omitting Dialog.Title triggers a Radix console warning. Use VisuallyHidden to hide it visually if needed. Dialog.Description provides supplementary content to screen readers via aria-describedby.'
          },
          {
            title: 'Control outside click behavior with onInteractOutside',
            description: 'Use the onInteractOutside prop on Dialog.Content to explicitly allow or prevent closing when clicking outside.'
          }
        ],
        notes: [
          'Dialog.Trigger automatically manages the trigger reference so focus is restored to it when the dialog closes.',
          'Dialog.Portal renders the dialog at the top of the body, preventing z-index stacking context issues.',
          'Dialog.Title is automatically connected to Dialog.Content via aria-labelledby; Dialog.Description via aria-describedby.',
          'Focus trapping, Escape to close, and aria-modal="true" are all handled automatically. Control the open state via onOpenChange.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'title prop auto-connects aria-labelledby',
            description:
              'Setting the title prop renders the modal heading and automatically connects it via aria-labelledby, satisfying WCAG 4.1.2 for dialog labeling.'
          },
          {
            title: 'Use destroyOnHidden (v5.25.0+)',
            description:
              'destroyOnHidden replaces destroyOnClose as of v5.25.0. Setting it to true removes the modal from the DOM when closed, preventing screen readers from accessing hidden content.'
          },
          {
            title: 'keyboard default true must not be disabled',
            description: 'keyboard={true} enables Escape to close. Disabling it violates WCAG 2.1.2 No Keyboard Trap. Keep the default value.'
          }
        ],
        notes: [
          'Ant Design Modal automatically applies focus trapping, Escape to close, and aria-modal="true".',
          'The title prop connects the heading to the dialog via aria-labelledby automatically.',
          'Use destroyOnHidden={true} (v5.25.0+) to remove the modal from DOM when closed.',
          'focusable={{ trap: true, focusTriggerAfterClose: true }} (v6.2.0+) gives fine-grained focus management control.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Add aria-label to Dialog.CloseTrigger', description: 'If the close button uses only an icon, explicitly add an aria-label.' }
        ],
        notes: [
          'Chakra Dialog.Root automatically handles focus trapping, aria-modal, and Escape to close.',
          'Dialog.Title is automatically connected via aria-labelledby — always include it.',
          'Add aria-label to Dialog.CloseTrigger when using an icon-only close button.',
          'Use closeOnInteractOutside={false} to prevent closing when clicking outside.'
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
          },
          {
            title: 'Use AlertDialog for confirmation actions',
            description:
              'Base UI provides a separate AlertDialog component (@base-ui-components/react/alert-dialog) for destructive or irreversible actions that require user confirmation.'
          }
        ],
        notes: [
          'Dialog.Popup automatically handles focus trapping, Escape key dismissal, and aria-modal="true".',
          'Dialog.Title is auto-connected via aria-labelledby; Dialog.Description via aria-describedby.',
          'Dialog.Portal renders into the document body to prevent z-index conflicts.',
          'Use open/onOpenChange for controlled mode, or defaultOpen for uncontrolled mode.',
          'Use AlertDialog (@base-ui-components/react/alert-dialog) for dangerous actions that require explicit user confirmation.'
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
            title: 'Set component="nav" and aria-label on Toolbar',
            description:
              'Use Toolbar component="nav" with aria-label="Main navigation". This renders as <nav aria-label> and enables screen reader landmark navigation.'
          },
          {
            title: 'Add aria-haspopup and aria-expanded to submenu triggers',
            description:
              'Set aria-haspopup="menu" and aria-expanded on dropdown trigger buttons so screen readers can identify submenus and their open state.'
          },
          {
            title: 'Add aria-current="page" to the active link',
            description: 'MUI does not set aria-current automatically. Add aria-current="page" directly to the link matching the current route.'
          }
        ],
        notes: [
          'Use Toolbar component="nav" to provide the <nav> landmark; add aria-label to distinguish it from other nav elements.',
          'MUI Menu automatically handles arrow key navigation, Escape to close, and focus restoration.',
          'Add aria-current="page" to the active link manually — MUI does not handle this automatically.',
          'Use MenuListProps={{ "aria-label": "..." }} to add an accessible label to the menu list.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Place NavigationMenu.Viewport inside Root but outside List',
            description:
              'NavigationMenu.Viewport is the container that renders Trigger-activated Content. It must be placed inside NavigationMenu.Root but outside NavigationMenu.List, or Content will not display.'
          },
          {
            title: 'Mark the current page with aria-current="page"',
            description: 'Set aria-current="page" on the NavigationMenu.Link corresponding to the current route, or use the active prop.'
          }
        ],
        notes: [
          'NavigationMenu.Trigger automatically manages aria-expanded and aria-controls. Space/Enter opens, Escape closes, ArrowDown enters Content — all built in.',
          'NavigationMenu.Viewport is required for Content to render. Place it inside Root, outside List.',
          'NavigationMenu.Root renders as role="navigation". Add aria-label to describe its purpose.',
          'Use aria-current="page" or the active prop on NavigationMenu.Link to indicate the current page to screen readers.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Wrap in <nav> landmark with aria-label',
            description:
              'Ant Design Menu renders as <ul>. Wrap it in a <nav aria-label="Main navigation"> to provide a navigation landmark that assistive technologies can detect.'
          },
          {
            title: 'selectedKeys provides aria-selected',
            description:
              'Use the selectedKeys prop with the current route key. Ant Design Menu applies aria-selected="true" to the matching item, indicating the current page to screen readers.'
          },
          {
            title: 'Use items API (v4.20.0+)',
            description:
              'Declare menu items via the items prop with key/label/children objects instead of Menu.Item/Menu.SubMenu, which are deprecated since v4.20.0.'
          }
        ],
        notes: [
          'Ant Design Menu renders as a <ul> element. Wrap in <nav aria-label="..."> for a navigation landmark.',
          'selectedKeys automatically applies aria-selected="true" to the active item.',
          'SubMenu items automatically receive aria-expanded and aria-haspopup="true" for keyboard users.',
          'Use <a href> elements as item labels to support native link behavior and keyboard navigation.'
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
      },
      baseui: {
        additionalChecks: [
          {
            title: 'NavigationMenu.Root provides the nav landmark',
            description:
              'NavigationMenu.Root renders as role="navigation". Add an aria-label to distinguish it from other navigation landmarks on the page.'
          },
          {
            title: 'Portal + Positioner + Viewport structure is required',
            description:
              'Submenus must follow the NavigationMenu.Portal → Positioner → Popup → Viewport chain for correct focus management and positioning.'
          }
        ],
        notes: [
          'NavigationMenu.Trigger automatically manages aria-expanded and aria-controls. Space/Enter opens, Escape closes, and ArrowDown moves focus into Content — all built in.',
          'NavigationMenu.Portal → Positioner → Popup → Viewport is the required structure for rendering submenus.',
          'NavigationMenu.Root renders as role="navigation". Add aria-label to describe its purpose.',
          'Use aria-current="page" on NavigationMenu.Link to indicate the current page to screen readers.'
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
            description:
              'Use getItemAriaLabel to provide descriptive labels for all pagination buttons. Include the selected state in page labels (e.g., "Go to page 3, current page").'
          },
          {
            title: 'Add aria-label to the Pagination nav container',
            description:
              'MUI Pagination renders a <nav> without an aria-label. Pass an aria-label via slotProps.root so screen readers can distinguish it from other nav landmarks.'
          }
        ],
        notes: [
          'MUI Pagination renders a <nav> landmark automatically, but you must add aria-label via slotProps.root.',
          'aria-current="page" is automatically applied to the active page button.',
          'Use showFirstButton and showLastButton to add first/last page navigation for large page counts.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Add aria-live region to announce page changes',
            description:
              'When the page changes and content updates dynamically, add a visually hidden aria-live="polite" region to announce the new page number to screen readers.'
          },
          {
            title: 'Set locale via ConfigProvider',
            description:
              'Ant Design Pagination defaults to English aria-labels. Wrap with ConfigProvider locale={enUS} (or your locale) so previous/next button labels match the page language.'
          },
          {
            title: 'showSizeChanger needs accessible label',
            description:
              'When showSizeChanger={true} is enabled, add a Form.Item or aria-label to the size selector to communicate its purpose to screen reader users.'
          }
        ],
        notes: [
          'Ant Design Pagination renders a <ul> list and automatically applies aria-current="page" to the active page button.',
          'ConfigProvider locale={enUS} localizes previous/next button aria-labels.',
          'Add an aria-live="polite" region to announce page changes to screen readers.',
          'showQuickJumper adds a direct page input — useful for keyboard users navigating large datasets.'
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
          'Pagination.Root automatically calculates the total number of pages from count and pageSize.',
          'Use Pagination.Items with a render prop to customize each page button.',
          'Add aria-label to each page button so screen readers can announce the page number.',
          'Use an aria-live region to announce the currently displayed result range to screen readers.'
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
            title: 'Connect trigger and popover with aria-describedby',
            description:
              'Set aria-describedby={popoverId} on the trigger button (only when open) and match it to the Popover id. This lets screen readers understand the association.'
          },
          {
            title: 'Focus management must be implemented manually',
            description:
              'Unlike Modal, MUI Popover does not provide a focus trap. If the popover contains interactive content, move focus into the popover on open and implement focus management yourself.'
          }
        ],
        notes: [
          'MUI Popover automatically closes on Escape key and outside click, and restores focus to the trigger.',
          'Set aria-describedby on the trigger conditionally (open ? id : undefined) to avoid stale references when closed.',
          'Add role="dialog" and aria-label to the inner container for popovers containing interactive content.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Add aria-label to Popover.Close',
            description: 'When using only a symbol or icon for the close button, add aria-label to communicate the action to screen reader users.'
          },
          {
            title: 'Adjust positioning with sideOffset',
            description:
              'Use the sideOffset prop on Popover.Content to control the gap between the trigger and the popover. Values that are too small may cause visual confusion.'
          }
        ],
        notes: [
          'Popover.Trigger automatically manages aria-expanded. Space/Enter to open, Escape to close, and outside click to close are all built in.',
          'Popover.Portal renders at the top of the body, preventing overflow:hidden and z-index issues.',
          'When Popover.Content opens, focus moves to the first focusable element inside. When it closes, focus returns to the Trigger.',
          'Control positioning with the side ("top"|"right"|"bottom"|"left"), align ("start"|"center"|"end"), and sideOffset props.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Manually add aria-expanded to the trigger',
            description:
              'Ant Design Popover does not automatically add aria-expanded to the trigger button. Manage the open state yourself and pass aria-expanded={open} to the trigger.'
          },
          {
            title: 'Include a close button inside the content',
            description:
              'Ant Design Popover does not close on Escape by default. Always include an explicit close button within the popover content so keyboard users can dismiss it.'
          },
          {
            title: 'Use trigger="click" for keyboard access',
            description:
              'trigger="hover" alone prevents keyboard users from opening the popover. Use trigger="click" or trigger={["hover", "focus"]} to ensure full keyboard accessibility.'
          }
        ],
        notes: [
          'trigger="click" allows the popover to be opened with Enter/Space as well as mouse click.',
          'Add aria-expanded={open} and aria-haspopup="dialog" manually to the trigger button.',
          'Ant Design Popover does not close on Escape — include a close button inside the content.',
          'onOpenChange handles closing when the user clicks outside the popover.'
        ]
      },
      chakra: {
        additionalChecks: [{ title: 'CloseTrigger aria-label', description: 'Add aria-label="Close popover" to Popover.CloseTrigger.' }],
        notes: [
          'Chakra Popover.Root automatically handles focus trapping, aria-expanded, and Escape to close.',
          'Add aria-label to Popover.CloseTrigger.',
          'Use the closeOnInteractOutside prop to control whether clicking outside closes the popover.',
          'autoFocus defaults to true — focus moves to the first focusable element when the popover opens.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Use placement and shouldFlip for positioning',
            description:
              "Set the placement prop (e.g. 'bottom start') to control where the popover appears. shouldFlip (default true) automatically repositions it if there is insufficient space."
          }
        ],
        notes: [
          'React Aria Popover is composed with DialogTrigger, Popover, and Dialog.',
          'Placing Heading with slot="title" inside Dialog automatically connects aria-labelledby.',
          'Popover handles focus management, Escape to close, and all WAI-ARIA dialog attributes automatically.',
          'Use the placement prop to control direction; the popover flips automatically when there is not enough space.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Portal + Positioner + Popup structure is required',
            description: 'Always use Popover.Portal → Popover.Positioner → Popover.Popup to ensure correct focus management and z-index isolation.'
          },
          {
            title: 'Add aria-label to Popover.Close',
            description:
              'When the close button contains only an icon or symbol, add aria-label="Close" to communicate its purpose to screen reader users.'
          }
        ],
        notes: [
          'Popover.Trigger automatically manages aria-expanded and aria-haspopup. Space/Enter opens, Escape closes, and outside click closes — all built in.',
          'Popover.Portal renders into the document body, preventing z-index and overflow:hidden issues.',
          'When Popover.Popup opens, focus moves to the first focusable element inside. Focus returns to the Trigger on close.',
          'Use the side and align props on Popover.Positioner to control placement relative to the trigger.'
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
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Connect a label via aria-labelledby on RadioGroup',
            description:
              'Add `aria-labelledby` to `RadioGroup` pointing to a label element id. Without it, screen readers cannot convey the group purpose.'
          },
          {
            title: 'Style Radio.Indicator with CSS using data-checked',
            description: 'Base UI is unstyled. Implement the checked visual for `Radio.Indicator` via CSS using the `data-checked` attribute.'
          }
        ],
        notes: [
          'Control selection with `value` + `onValueChange` on `RadioGroup`.',
          '`aria-labelledby` on `RadioGroup` connects a visible label for screen readers.',
          '`Radio.Indicator` has no default styles — use `data-checked` in CSS to show the selected state.',
          'Arrow key navigation between radios and Space key selection are handled automatically.'
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
            title: 'FormControl + InputLabel + labelId wiring is required',
            description:
              'MUI Select requires FormControl, an InputLabel with a matching id, and the Select labelId prop set to the same value. For the outlined variant, also pass the label prop to Select.'
          },
          {
            title: 'Use error + FormHelperText for error guidance',
            description:
              'Set the error prop on FormControl and provide the error message via FormHelperText. It is automatically connected to the Select via aria-describedby.'
          }
        ],
        notes: [
          'The labelId on Select and the id on InputLabel must be identical for screen readers to announce the label.',
          'For the outlined variant, pass the label prop to Select as well — this is required to render the label cutout in the border.',
          'Disabled MenuItem options automatically receive aria-disabled.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Add aria-label or connect a Label to Select.Trigger',
            description:
              'Add aria-label directly to Select.Trigger, or use @radix-ui/react-label Label.Root with htmlFor pointing to the Trigger id. Without a label, screen readers cannot convey the select purpose.'
          },
          {
            title: 'Always use Select.ItemText inside Select.Item',
            description: 'Select.ItemText provides the accessible option label read by screen readers. Items without it will not announce correctly.'
          }
        ],
        notes: [
          'Select.Trigger automatically manages role="combobox" and aria-expanded. Screen readers announce the selected value via Select.Value.',
          'Adding disabled to Select.Item automatically sets aria-disabled="true", removing it from keyboard navigation.',
          'Select.ItemIndicator renders only on the selected item. Mark it aria-hidden.',
          'Use position="popper" on Select.Content for trigger-relative positioning. Wrap in Select.Portal to avoid z-index issues.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Use Form.Item to auto-connect the label',
            description:
              'Placing Select inside a Form.Item with label + name automatically connects the label to the input via htmlFor, satisfying WCAG 1.3.1 and 4.1.2.'
          },
          {
            title: 'Set virtual={false} for screen reader compatibility',
            description:
              'Ant Design Select uses virtual scrolling by default. Setting virtual={false} renders all options in the DOM so screen readers can read the full list.'
          },
          {
            title: 'showSearch switches to combobox pattern',
            description:
              'Enabling showSearch changes the role to combobox. Provide notFoundContent to give users feedback when no options match the search.'
          }
        ],
        notes: [
          'Form.Item label + name automatically connects the label to the Select input via htmlFor — no separate aria-label needed.',
          'showSearch enables combobox pattern with aria-autocomplete. Use filterOption for custom search logic.',
          'virtual={false} disables virtual scrolling so all options remain in the DOM for screen reader access.',
          'Disabled options automatically receive aria-disabled="true".'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'HiddenSelect for form accessibility',
            description: 'Chakra Select.HiddenSelect is a native element needed for form submission — set the name prop on it.'
          }
        ],
        notes: [
          'Chakra Select.Root automatically handles aria-expanded, aria-selected, and the listbox pattern.',
          'Manage item collections with useListCollection.',
          'Set the name prop on Select.HiddenSelect to enable native form submission.',
          'closeOnSelect defaults to true — the listbox closes automatically after selection.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Label must be inside Select root',
            description: 'Place the Label component inside Select to automatically connect aria-labelledby between the label and the trigger button.'
          }
        ],
        notes: [
          'React Aria Select is a compound component: Label + Button + SelectValue + Popover + ListBox + ListBoxItem.',
          'SelectValue inside Button automatically displays the selected item label.',
          'Use selectedKey and onSelectionChange for controlled mode.',
          'ListBoxItem supports render props (isSelected, isFocused) for dynamic styling without external state.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Select.Label must be inside Select.Root',
            description: 'Place Select.Label inside Select.Root so the label is automatically associated with the trigger via aria-labelledby.'
          },
          {
            title: 'Always use Select.ItemText inside Select.Item',
            description:
              'Select.ItemText provides the accessible label for each option. Items without it will not be announced correctly by screen readers.'
          }
        ],
        notes: [
          'Select.Trigger automatically manages role="combobox" and aria-expanded. Screen readers announce the selected value via Select.Value.',
          'Select.Portal → Select.Positioner → Select.Popup → Select.List is the required structure for the dropdown.',
          'Select.ItemIndicator renders only on the selected item. Mark it aria-hidden to avoid redundant announcements.',
          'Use defaultValue for uncontrolled mode, or value/onValueChange for controlled mode.'
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
          {
            title: 'Connect Tab id and tabpanel aria-labelledby',
            description:
              'Explicitly set id="tab-{n}" on each Tab and aria-labelledby="tab-{n}" on each tabpanel. Use the official a11yProps helper for convenience.'
          },
          {
            title: 'Provide aria-label on Tabs',
            description: 'Add aria-label to the Tabs component to describe the purpose of the tab group so screen readers can identify it.'
          },
          {
            title: 'Use disabled prop on inactive Tabs',
            description: 'The disabled prop automatically applies aria-disabled and removes the tab from the focus order.'
          }
        ],
        notes: [
          'MUI Tabs automatically manages arrow key navigation and roving tabindex.',
          'Use the a11yProps helper to consistently generate id and aria-controls pairs for Tab and TabPanel.',
          'Wrap the tabpanel body with a hidden attribute rather than conditional rendering so the panel stays in the DOM.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Add aria-label to Tabs.List',
            description: 'Add aria-label to Tabs.List to communicate the purpose of the tab group to screen readers.'
          },
          {
            title: 'Separate focus and activation with activationMode="manual"',
            description:
              'With activationMode="manual", arrow keys move focus only; Enter/Space activates the tab. Recommended when tab content is slow to load.'
          }
        ],
        notes: [
          'Tabs.Root automatically manages role="tablist", aria-selected, aria-controls, and aria-labelledby for all sub-components.',
          'Add aria-label to Tabs.List to describe the purpose of the tab group.',
          'activationMode: "automatic" (default, activates on arrow key move) | "manual" (separates focus from activation). Use "manual" when content loads are slow.',
          'Use defaultValue for uncontrolled or value + onValueChange for controlled active tab state.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Use items API (v4.20.0+)',
            description:
              'Declare tabs using the items prop with key/label/children objects. Using TabPane directly is deprecated since v4.20.0 and may be removed in a future version.'
          },
          {
            title: 'Manage active tab with onChange',
            description:
              'Use the onChange callback with activeKey to control the active tab in controlled mode. This ensures screen readers receive up-to-date aria-selected state.'
          },
          {
            title: 'destroyInactiveTabPane for hidden content',
            description:
              'Set destroyInactiveTabPane={true} to remove inactive tab panels from the DOM. This prevents screen readers from accessing hidden content. The default (false) keeps panels in DOM with aria-hidden.'
          }
        ],
        notes: [
          'Ant Design Tabs automatically applies role="tablist", role="tab", role="tabpanel", aria-selected, and aria-controls.',
          'Use the items prop (v4.20.0+) with key/label/children. TabPane is deprecated.',
          'Arrow keys move between tabs; Enter/Space activates the focused tab.',
          'When tabBarExtraContent is used, verify those elements are keyboard-accessible.'
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
          'Chakra Tabs.Root automatically handles keyboard navigation and all WAI-ARIA Tabs attributes.',
          'Add aria-label to Tabs.List to describe the purpose of the tab group.',
          'Tabs.Indicator is rendered as aria-hidden.',
          'Use the lazyMount prop to defer rendering inactive tab content for performance.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'aria-label on TabList is required',
            description: 'Add aria-label to TabList to communicate the purpose of the tab group to screen readers.'
          }
        ],
        notes: [
          'React Aria Tabs automatically implements arrow key, Home, and End navigation and manages aria-selected.',
          'Each Tab id prop is automatically linked to the corresponding TabPanel via aria-controls.',
          "Use keyboardActivation='manual' to separate focus movement from tab activation.",
          'Tab children accept a render prop function with isSelected for dynamic inline styling.'
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
          'Add the activateOnFocus prop to immediately activate a tab when it receives focus via arrow keys.',
          'Use defaultValue for uncontrolled mode, or value/onValueChange for controlled mode.'
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
            title: 'helperText is auto-connected via aria-describedby',
            description:
              'MUI TextField renders helperText as FormHelperText and connects it via aria-describedby automatically. Do not set a manual id on FormHelperText.'
          },
          {
            title: 'Use slotProps.htmlInput for native input attributes',
            description:
              'Pass autoComplete, aria-required, and other HTML input attributes via slotProps.htmlInput. The inputProps prop is deprecated in MUI v7.'
          },
          {
            title: 'Use error + helperText to communicate errors',
            description: 'When the error prop is true, helperText color changes to the error color. Provide the error message in helperText.'
          }
        ],
        notes: [
          'MUI TextField automatically wires aria connections between InputLabel, input, and helperText.',
          'When error={true}, the helperText text color changes to indicate an error state.',
          'Verify that the outlined variant border color meets the minimum 3:1 contrast ratio against the background.'
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
            title: 'Form.Item label + name auto-connects input',
            description:
              'Setting both label and name on Form.Item creates the label–input association via htmlFor/id automatically, satisfying WCAG 1.3.1 and 4.1.2.'
          },
          {
            title: 'Add aria-hidden to decorative prefix/suffix',
            description:
              'Decorative icons in the prefix or suffix slots (e.g., a search icon) should have aria-hidden="true" so screen readers do not announce them redundantly.'
          },
          {
            title: 'status prop for validation state',
            description:
              'Use status="error" or status="warning" on Input to indicate validation state visually. Pair with Form.Item for automatic aria-describedby connection to the error message.'
          }
        ],
        notes: [
          'Ant Design Form.Item automatically connects the label and input via htmlFor/id.',
          'Form validation errors are connected via aria-describedby by Form.Item.',
          'Input.Password provides a visibility toggle with an accessible button for the show/hide action.',
          'Add aria-hidden to decorative prefix/suffix icons to avoid redundant screen reader announcements.'
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
          "Field.Root's invalid prop automatically propagates aria-invalid to the child Input.",
          'Field.ErrorText is connected to the Input via aria-describedby; add role="alert" for immediate announcement.',
          'The required prop handles both Field.RequiredIndicator (visual asterisk) and aria-required.',
          'Field.HelperText is automatically connected to the Input via aria-describedby.'
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
            description:
              'Wrapping with Field.Root from @base-ui-components/react/field provides automatic label-input association, aria-invalid propagation, and error message wiring via aria-describedby.'
          },
          {
            title: 'Connect a label when using Input standalone',
            description:
              'When using Input (@base-ui-components/react/input) without Field, connect a label via <label htmlFor> or add aria-label directly.'
          }
        ],
        notes: [
          'Field.Root automatically connects Field.Label and Field.Control and propagates aria-invalid to the child input.',
          'Field.Error uses HTML5 constraint validation API keys for the match prop (valueMissing, typeMismatch, tooShort, etc.).',
          'Field.Control wires aria-invalid and aria-describedby automatically from the Field context.',
          'Input (@base-ui-components/react/input) can be used standalone, but label association must be handled manually.'
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
          {
            title: 'Use FormControlLabel to connect a label',
            description:
              'Pair MUI Switch with FormControlLabel and use its label prop to associate the label. When used standalone, add aria-label via slotProps.input.'
          },
          {
            title: 'ToggleButtonGroup requires aria-label',
            description: 'Add aria-label to ToggleButtonGroup to describe the group purpose, and add aria-label to each ToggleButton.'
          },
          {
            title: 'role="switch" is not applied automatically',
            description:
              'MUI Switch renders an <input type="checkbox"> internally. role="switch" is not applied automatically — add it via slotProps.input if semantic switch behavior is needed.'
          }
        ],
        notes: [
          'MUI Switch renders an <input type="checkbox"> internally.',
          'FormControlLabel automatically connects the label to the input via aria association.',
          'For ToggleButtonGroup with exclusive={true}, aria-pressed is managed automatically per button.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Connect a label to Switch.Root',
            description: 'Wrap Switch.Root in a <label> or connect via htmlFor/id. Without a label, screen readers cannot convey the purpose.'
          },
          {
            title: 'Maintain sufficient color contrast on Switch.Thumb',
            description: 'Switch.Thumb is aria-hidden. Verify a minimum 3:1 contrast ratio in both on and off states.'
          }
        ],
        notes: [
          'Switch.Root automatically manages role="switch" and aria-checked. Space key toggles by default.',
          'Connect a label via htmlFor/id or wrap Switch.Root in a <label> for an accessible name.',
          'Switch.Thumb is automatically aria-hidden.',
          'Use checked + onCheckedChange (controlled) or defaultChecked (uncontrolled) to manage state.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Connect a label to the Switch',
            description:
              'Add an aria-label directly, or connect via htmlFor/id with a <label> element. Without a label, screen readers cannot convey the switch purpose.'
          },
          {
            title: 'checkedChildren/unCheckedChildren for non-color state indication',
            description:
              'Use the checkedChildren and unCheckedChildren props to display text (e.g., "On"/"Off") for the switch state. This helps color-blind users and screen reader users alike.'
          },
          {
            title: 'loading state should set aria-busy',
            description: 'When loading={true} displays a spinner, add aria-busy="true" to the Switch to announce the pending state to screen readers.'
          }
        ],
        notes: [
          'Ant Design Switch automatically applies role="switch" and aria-checked internally.',
          'Connect a <label htmlFor> or use aria-label to provide an accessible name.',
          'checkedChildren/unCheckedChildren display text labels for on/off state — useful for color-blind users.',
          'Add aria-busy="true" when using the loading prop to notify screen readers of the pending state.'
        ]
      },
      chakra: {
        additionalChecks: [
          { title: 'Use Switch.Label', description: 'Switch.Label automatically connects the label to the input — no separate htmlFor needed.' }
        ],
        notes: [
          "Chakra Switch.Root automatically manages role='switch' and aria-checked.",
          'Switch.Label automatically connects the label to the input — no separate htmlFor is needed.',
          'Switch.HiddenInput is the actual input element required for form submission.',
          'Update state using the e.checked value from the onCheckedChange callback.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Distinguish Switch from ToggleButton',
            description:
              "Use Switch with role='switch' for on/off settings, and ToggleButton with aria-pressed for toggle button interactions. Choose based on context."
          }
        ],
        notes: [
          "Switch automatically manages role='switch' and aria-checked. Use isSelected/onChange to control state.",
          'ToggleButton automatically manages aria-pressed. The isSelected/onChange pattern is identical.',
          'Pass a function to Switch children to access the isSelected render prop for custom styling.',
          'Use isReadOnly to create a read-only switch without user interaction.'
        ]
      },
      baseui: {
        additionalChecks: [
          {
            title: 'Connect a label to Switch.Root',
            description:
              'Wrap Switch.Root in a <label> element or use htmlFor/id to associate an accessible name. Without a label, the switch purpose is not conveyed to screen reader users.'
          },
          {
            title: 'Toggle uses aria-pressed; Switch uses role="switch"',
            description:
              'Toggle (@base-ui-components/react/toggle) is an aria-pressed toggle button for UI actions. Switch (@base-ui-components/react/switch) uses role="switch" for settings. Choose based on semantics, not appearance.'
          }
        ],
        notes: [
          'Switch.Root renders as <span> by default. Wrap in a <label> for the wrapping label pattern; role="switch" and aria-checked are managed automatically.',
          'role="switch" and aria-checked are managed automatically.',
          'Set nativeButton={true} and render={<button />} to render Switch.Root as a semantic button element.',
          'Use the Toggle component (@base-ui-components/react/toggle) for aria-pressed toggle buttons instead.',
          'The data-checked and data-unchecked attributes are available for CSS-based styling.'
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
          {
            title: 'Set enterDelay to 300ms or more',
            description: 'Set enterDelay to at least 300ms to prevent accidental tooltip display. The default value of 100ms may be too short.'
          },
          {
            title: 'aria-label required on icon-only button triggers',
            description:
              'The Tooltip title supplements the visible description but does not replace an accessible name. Always provide aria-label on icon-only buttons.'
          },
          {
            title: 'Implement forwardRef for custom children',
            description:
              'Tooltip injects DOM event listeners into its children. Custom components used as children must implement React.forwardRef to pass the ref correctly.'
          }
        ],
        notes: [
          'MUI Tooltip automatically sets role="tooltip" and aria-describedby.',
          'enterDelay (default 100ms) controls show delay; leaveDelay (default 0ms) controls hide delay.',
          'To show a tooltip on a disabled button, wrap the button in a <span> — disabled buttons do not receive pointer events.',
          'Custom children components must implement React.forwardRef for event listeners to attach correctly.'
        ]
      },
      radix: {
        additionalChecks: [
          {
            title: 'Place Tooltip.Provider to manage delayDuration globally',
            description: 'Wrap your app or component root with Tooltip.Provider to apply a consistent delay across all tooltips.'
          },
          {
            title: 'Provide an accessible name on the trigger',
            description:
              'For icon-only triggers, add aria-label. Tooltip text is linked via aria-describedby and does not replace the accessible name.'
          }
        ],
        notes: [
          "Tooltip.Content renders as role='tooltip' and is automatically linked to Tooltip.Trigger via aria-describedby.",
          "Tooltip.Provider's delayDuration (default 700ms) sets the show delay. 300ms is recommended.",
          'Tooltip.Portal renders into the body, preventing overflow:hidden and z-index issues.',
          'Icon-only triggers must have aria-label. Tooltip text is supplementary description, not the accessible name.'
        ]
      },
      antd: {
        additionalChecks: [
          {
            title: 'Include "focus" in trigger prop',
            description:
              'The trigger prop defaults to "hover". Set trigger={["hover", "focus"]} so keyboard users can also see the tooltip when focusing the trigger element, satisfying WCAG 1.4.13.'
          },
          {
            title: 'Set mouseEnterDelay to 0.3 or more',
            description:
              'The default mouseEnterDelay is 0.1 seconds, which may be too short. Set it to at least 0.3 seconds (300ms) per WCAG 1.4.13 to prevent accidental tooltip triggers.'
          },
          {
            title: 'aria-label is required on icon-only triggers',
            description:
              'Tooltip title is connected via aria-describedby and is supplementary — it does not replace the accessible name. Add aria-label to icon-only trigger buttons.'
          }
        ],
        notes: [
          'Ant Design Tooltip automatically connects the title text to the trigger via aria-describedby.',
          'trigger={["hover", "focus"]} ensures keyboard users can access the tooltip.',
          'mouseEnterDelay should be 0.3 seconds or more to comply with WCAG 1.4.13.',
          'When using the color prop, re-verify text contrast ratio (4.5:1 minimum for normal text).'
        ]
      },
      chakra: {
        additionalChecks: [
          {
            title: 'aria-label on trigger element',
            description: 'If the trigger is an icon-only button, provide aria-label on the trigger instead of relying solely on the tooltip.'
          }
        ],
        notes: [
          'Chakra Tooltip.Root automatically handles hover and focus events.',
          'Use the openDelay (default 400ms) and closeDelay (default 150ms) props to control display timing.',
          'Always provide aria-label on icon-only triggers. Tooltip text is supplementary via aria-describedby, not the accessible name.',
          'Tooltip.Content renders as role="tooltip" automatically.'
        ]
      },
      spectrum: {
        additionalChecks: [
          {
            title: 'Tooltip is not shown on touch screens',
            description:
              'React Aria Tooltip is intentionally not triggered on touch devices. Do not rely on tooltip text as the sole accessible name for icon-only buttons.'
          }
        ],
        notes: [
          'React Aria TooltipTrigger handles hover, focus, and keyboard interactions automatically.',
          'Control display timing with the delay prop (default 1200ms) and closeDelay prop (default 500ms).',
          'Tooltip is automatically connected to the trigger element via aria-describedby.',
          'Wrap each trigger + tooltip pair in its own TooltipTrigger — do not share one trigger across multiple tooltips.'
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
