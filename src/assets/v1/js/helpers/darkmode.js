export function colorModeSetup () {
  const htmlElement = document.documentElement
  if (window.localStorage.theme === 'dark') {
    htmlElement.classList.add('dark')
  }

  document.querySelector('[data-color-mode]').addEventListener('click', () => {
      if (!htmlElement.classList.contains('dark')) {
        htmlElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        htmlElement.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }
  )
}
