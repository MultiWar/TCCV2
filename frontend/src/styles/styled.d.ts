import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,
        colors: {
            background: string,
            primary: string,
            secondary: string,
            primaryText: string,
            secondaryText: string,
        },
        sizes: {
            regularText: string,
            label: string,
            title: string
        }
    }
}