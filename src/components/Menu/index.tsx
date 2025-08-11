import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon} from 'lucide-react'
import { useState, useEffect } from 'react'
import { RouterLink } from '../RouterLink'

import styles from './styles.module.css'


type AvailableThemes = 'dark' | 'light'

export function Menu() 
{
  const [theme, setTheme] = useState<AvailableThemes>(() => 
  {
    const storageTheme = (localStorage.getItem('theme') as AvailableThemes) || 'dark'
    return storageTheme
  })

  const nextThemeIcon = 
  {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) 
  {
    event.preventDefault()

    setTheme(prevTheme => 
    {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark'
      return nextTheme
    })
  }

  useEffect(() => 
  {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menu_link}
        href='/'
        aria-label='Ir para a Home'
        title='Ir para a Home'
      >
        <HouseIcon />
      </RouterLink>

      <RouterLink
        className={styles.menu_link}
        href='/history/'
        aria-label='Ver Histórico'
        title='Ver Histórico'
      >
        <HistoryIcon />
      </RouterLink>

      <RouterLink
        className={styles.menu_link}
        href='/settings/'
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </RouterLink>

      <a
        className={styles.menu_link}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  )
}
