const accordion = `.accordion-item { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.accordion-trigger { width: 100%; padding: 12px 16px; background: white; border: none; text-align: left; cursor: pointer; font-size: 14px; display: flex; justify-content: space-between; align-items: center; }
.accordion-trigger:hover { background: #f9fafb; }
.accordion-panel { padding: 12px 16px; font-size: 14px; color: #374151; border-top: 1px solid #e5e7eb; }
.accordion-root { width: 100%; max-width: 560px; }
.accordion-item-sep { border-bottom: 1px solid #e2e8f0; }
.accordion-trigger-btn { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 14px 0; background: none; border: none; cursor: pointer; font-size: 15px; font-weight: 500; text-align: left; }
.accordion-trigger-btn:hover { background: none; }
.accordion-content-text { padding: 0 0 14px; font-size: 14px; color: #4a5568; line-height: 1.6; }
.accordion-trigger-padded { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 12px 16px; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; }
.accordion-trigger-padded:hover { background: none; }`

const alert = `.toast-viewport { position: fixed; bottom: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 50; max-width: 360px; }
.toast-root { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.toast-container-tr { position: fixed; top: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; }
.toast-item { padding: 12px 16px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.toast-success { background-color: #dcfce7; border-color: #86efac; }
.toast-error { background-color: #fee2e2; border-color: #fca5a5; }`

const checkbox = `.checkbox-root { width: 20px; height: 20px; border-radius: 4px; border: 2px solid #c4c4c4; display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; flex-shrink: 0; }
.checkbox-root[data-state="checked"] { background: #6e56cf; border-color: #6e56cf; }
.checkbox-indicator { color: white; font-size: 14px; line-height: 1; }
.checkbox-row { display: flex; align-items: center; gap: 10px; }`

const combobox = `.combobox-group { display: inline-flex; align-items: center; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; overflow: hidden; }
.combobox-input { border: none; outline: none; font-size: 14px; padding: 6px 10px; min-width: 160px; }
.combobox-btn { background: none; border: none; border-left: 1px solid #e5e7eb; cursor: pointer; padding: 6px 10px; font-size: 13px; }
.combobox-item { padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; list-style: none; }
.combobox-item[data-focused] { background: #fef2f2; }
.combobox-item[data-selected] { background: #e03; color: #fff; }`

const datePicker = `.datepicker-group { display: inline-flex; align-items: center; gap: 2px; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 8px; background: #fff; }
.datepicker-input { display: flex; gap: 1px; }
.datepicker-segment { padding: 1px 2px; border-radius: 2px; outline: none; font-size: 14px; }
.datepicker-segment:focus { background: #e0e7ff; }
.datepicker-btn { background: none; border: none; cursor: pointer; padding: 2px 6px; border-radius: 4px; font-size: 16px; }
.calendar-popover { background: #fff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,.15); padding: 16px; outline: none; }
.calendar-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.calendar-nav-btn { background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 16px; }
.calendar-heading { font-weight: 600; font-size: 14px; }
.calendar-grid { border-collapse: collapse; width: 100%; }
.calendar-header-cell { padding: 6px; font-size: 12px; font-weight: 600; color: #6b7280; text-align: center; }
.calendar-cell { text-align: center; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; color: #374151; }
.calendar-cell[data-selected] { background: #e03; color: #fff; }
.calendar-cell[data-outside-month] { color: #d1d5db; }
.calendar-cell[data-focused] { outline: 2px solid #18181b; }`

const navigationMenu = `.nav-toplist { list-style: none; display: flex; gap: 8px; padding: 0; margin: 0; }
.nav-item-rel { position: relative; }
.nav-submenu { list-style: none; padding: 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; position: absolute; background: white; }
.nav-top-link { text-decoration: none; color: inherit; font-weight: normal; }
.nav-top-link[aria-current="page"] { color: #6d28d9; font-weight: bold; }
.nav-menu-link-block { display: block; padding: 4px 8px; text-decoration: none; color: inherit; }
.nav-menu-link-block[aria-current="page"] { color: #6d28d9; font-weight: bold; }
.nav-relative-pad { position: relative; padding: 12px 16px; }
.nav-radix-list { list-style: none; margin: 0; padding: 0; border-bottom: none !important; gap: 4px !important; }
.nav-link-block { display: block; text-decoration: none; }
.nav-content-min180 { min-width: 180px; gap: 4px !important; }
.nav-viewport { position: absolute; top: 100%; left: 0; }
.nav-ant-menu-border-none { border-bottom: none !important; }
.nav-spectrum-popover { padding: 4px; outline: none; min-width: 180px; }
.nav-spectrum-menu { list-style: none; margin: 0; padding: 0; }
.nav-spectrum-section-header { padding: 4px 12px; text-transform: uppercase; font-size: 11px; color: #6b7280; }
.nav-spectrum-menuitem { padding: 8px 14px; border-radius: 4px; cursor: pointer; outline: none; background: transparent; }
.nav-spectrum-menuitem:focus-visible { background: #fef2f2; }
.nav-spectrum-quit { color: #dc2626; }
.nav-spectrum-separator { height: 1px; background: #e5e7eb; margin: 4px 0; }
.nav-baseui-root { position: relative; padding: 1rem; }
.nav-baseui-list { list-style: none; margin: 0; padding: 0; gap: 4px !important; }
.nav-baseui-trigger { gap: 4px !important; font-weight: 500; }
.nav-baseui-link { display: block; text-decoration: none; color: #374151; }
.nav-minw-180 { min-width: 180px; }`

const pagination = `.pagination { display: flex; gap: 4px; list-style: none; padding: 0; margin: 0; }
.page-btn { padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; color: #374151; cursor: pointer; font-size: 14px; }
.page-btn[aria-current="page"] { background: #2563eb; color: #fff; font-weight: 700; border-color: #2563eb; }
.page-btn:disabled, .page-btn[aria-disabled="true"] { opacity: 0.4; cursor: default; }`

const popover = `.popover-close { position: absolute; top: 6px; right: 6px; }
.popover-arrow { fill: white; filter: drop-shadow(0 -1px 0 #e5e7eb); }
.popover-arrow-bordered { fill: #fff; stroke: #e5e7eb; stroke-width: 1; }`

const radioGroup = `.radio-btn { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d1d5db; background: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
.radio-btn[data-checked] { border-color: #18181b; }
.radio-indicator { width: 10px; height: 10px; border-radius: 50%; background: #18181b; }`

const select = `.select-trigger { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 14px; min-width: 200px; }
.select-popup { background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); padding: 4px; min-width: 200px; z-index: 100; outline: none; }
.select-item { padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; display: flex; align-items: center; gap: 8px; list-style: none; }
.select-item:hover, .select-item:focus { background: #f3f4f6; }
.select-item[data-selected] { background: #e03; color: #fff; }
.select-item[data-focused] { background: #fef2f2; }
.item-indicator { width: 16px; }`

const tabs = `.tab-content { padding: 20px 4px; font-size: 14px; line-height: 1.6; color: #374151; }
.tab-aria { padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 500; border: none; background: none; border-bottom: 2px solid transparent; margin-bottom: -2px; color: #374151; outline: none; }
.tab-aria[data-selected] { border-bottom-color: #e03; color: #e03; }
.tabs-indicator { position: absolute; bottom: -1px; left: var(--active-tab-left); width: var(--active-tab-width); height: 2px; background: #18181b; transition: left 0.2s, width 0.2s; }`

const toggle = `.switch-root { width: 44px; height: 24px; border-radius: 9999px; border: none; padding: 2px; cursor: pointer; flex-shrink: 0; position: relative; transition: background-color 0.15s; }
.switch-thumb { display: block; width: 20px; height: 20px; border-radius: 9999px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform 0.15s; }
.switch-sm { width: 40px; height: 22px; border-radius: 11px; border: none; padding: 2px; cursor: pointer; flex-shrink: 0; transition: background .2s; }
.switch-thumb-sm { width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .2s; }
.switch-root[data-state="checked"] { background-color: #6e56cf; }
.switch-root[data-state="unchecked"] { background-color: #d1d5db; }
.switch-root[data-state="checked"] .switch-thumb,
.switch-root[data-checked] .switch-thumb { transform: translateX(20px); }
.switch-root[data-state="unchecked"] .switch-thumb,
.switch-root[data-unchecked] .switch-thumb { transform: translateX(0); }
.switch-root[data-checked] { background-color: #18181b; }
.switch-root[data-unchecked] { background-color: #d1d5db; }
.switch-root[aria-checked="true"] { background-color: #2563eb; }
.switch-root[aria-checked="false"] { background-color: #d1d5db; }
.switch-root[aria-checked="true"] .switch-thumb { transform: translateX(20px); }
.switch-root[aria-checked="false"] .switch-thumb { transform: translateX(0); }
.switch-sm { background-color: #d1d5db; }
[data-selected] .switch-sm { background-color: #e03; }
[data-selected] .switch-thumb-sm { transform: translateX(18px); }
.btn-toggle[data-selected] { background: #e03; color: white; border-color: #e03; }`

const badge = `.badge-wrap { position: relative; display: inline-flex; }
.badge-icon { width: 40px; height: 40px; border-radius: 8px; border: 1px solid #d1d5db; background: white; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; cursor: pointer; }
.badge-count { position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9999px; background: #dc2626; color: #fff; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }
.badge-dot { position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; border-radius: 50%; background: #dc2626; }
.badge-status { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; }
.badge-status-dot { width: 8px; height: 8px; border-radius: 50%; }
.badge-status-dot.success { background: #16a34a; }
.badge-status-dot.error { background: #dc2626; }
.badge-status-dot.warning { background: #d97706; }`

const chip = `.chip-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 9999px; border: 1px solid #d1d5db; background: #f3f4f6; color: #111; font-size: 13px; }
.chip-btn { cursor: pointer; font: inherit; }
.chip-btn:hover { background: #e5e7eb; }
.chip-btn:focus-visible { outline: 2px solid #18181b; outline-offset: 2px; }
.chip[data-selected="true"] { background: #18181b; color: #fff; border-color: #18181b; }
.chip-remove { border: none; background: transparent; cursor: pointer; padding: 0; width: 16px; height: 16px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: inherit; font-size: 14px; line-height: 1; }
.chip-remove:hover { background: rgba(0,0,0,0.12); }
.chip-remove:focus-visible { outline: 2px solid #18181b; outline-offset: 1px; }`

const toast = `.toast-viewport { position: fixed; bottom: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 50; max-width: 360px; }
.toast-root { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.toast-container-tr { position: fixed; top: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; }
.toast-item { padding: 12px 16px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.toast-success { background-color: #dcfce7; border-color: #86efac; }
.toast-error { background-color: #fee2e2; border-color: #fca5a5; }`

const tooltip = `.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip-popup { position: absolute; bottom: 100%; left: 0; white-space: nowrap; background: #1f2937; color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 12px; }
.btn-icon { width: 36px; height: 36px; border-radius: 6px; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 16px; display: inline-flex; align-items: center; justify-content: center; }
.btn-icon-danger { border-color: #fca5a5; color: #dc2626; }
.tooltip-content-dark { background: #1f2937; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; line-height: 1.4; max-width: 200px; }
.tooltip-content-error { background: #dc2626; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; line-height: 1.4; max-width: 200px; }
.tooltip-arrow-dark { fill: #1f2937; }
.tooltip-arrow-error { fill: #dc2626; }`

export const patternCss: Record<string, string> = {
  accordion,
  alert,
  checkbox,
  combobox,
  'date-picker': datePicker,
  'navigation-menu': navigationMenu,
  pagination,
  popover,
  'radio-group': radioGroup,
  select,
  tabs,
  toggle,
  badge,
  chip,
  toast,
  tooltip
}
