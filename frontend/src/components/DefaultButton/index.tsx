import React from 'react'
import { Button, ButtonProps } from "@chakra-ui/core"

export const DefaultButton: React.FC<ButtonProps> = ({w = '100%', variantColor = 'blue', mt={mt: 4}, children, ...props}: ButtonProps) => {
    return (
        <Button w={w} variantColor={variantColor} mt={mt} {...props}>{children}</Button>
    )
}