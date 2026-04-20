function NavigationMenuDemo() {
  const [openMenu, setOpenMenu] = useState(null)
  const currentPath = '/about'
  const items = [
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'about',
      label: 'About',
      href: '/about',
      children: [
        { id: 'team', label: 'Team', href: '/about/team' },
        { id: 'history', label: 'History', href: '/about/history' }
      ]
    },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]

  return (
    <nav aria-label='Main navigation'>
      <ul className='nav-toplist'>
        {items.map((item) => (
          <li
            key={item.id}
            className='nav-item-rel'>
            {item.children ? (
              <>
                <button
                  aria-haspopup='menu'
                  aria-expanded={openMenu === item.id}
                  onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                  onKeyDown={(e) => e.key === 'Escape' && setOpenMenu(null)}>
                  {item.label} ▾
                </button>
                {openMenu === item.id && (
                  <ul
                    role='menu'
                    className='nav-submenu'>
                    {item.children.map((child) => (
                      <li
                        key={child.id}
                        role='none'>
                        <a
                          href={child.href}
                          role='menuitem'
                          aria-current={currentPath === child.href ? 'page' : undefined}
                          className='nav-menu-link-block'>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a
                href={item.href}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className='nav-top-link'>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
