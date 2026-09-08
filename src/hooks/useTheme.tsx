import { useContext } from "react";

import { ThemeContext } from "@/components/context/theme/ThemeContext";

export function useTheme() {
    const context = useContext(ThemeContext)

    if(context === undefined) {
        throw new Error('usetheme deve ser usado dentro de um ThemeProvider')
    }

    return context
}
