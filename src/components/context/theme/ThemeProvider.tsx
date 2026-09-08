import { ThemeContext, type Theme } from "@/components/context/theme/ThemeContext";
import { useEffect, useState, type PropsWithChildren } from "react";



export function ThemeProvider({children} : PropsWithChildren) {
    const [theme, setTheme] = useState<Theme>(() => {
        const localStorageTheme = localStorage.getItem('theme') as Theme | null

        if(localStorageTheme){
            return localStorageTheme
        }

        const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches

        return systemPrefersDark ? 'dark' : 'light'

    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((currentTheme: Theme) => (currentTheme === 'light' ? 'dark' : 'light'))
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}
