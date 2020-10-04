import React from 'react'
import { Button, ButtonProps } from "@chakra-ui/core"

export const DefaultButton: React.FC<ButtonProps> = 
    ({w = '100%', backgroundColor = 'blue.400', color = 'gray.200', mt={mt: 4}, children, _hover={backgroundColor: 'blue.600'}, ...props}: ButtonProps) => {
    return (
        <Button w={w} backgroundColor={backgroundColor} color={color} mt={mt} {...props} _hover={_hover}>
            {children}
        </Button>
    )
}