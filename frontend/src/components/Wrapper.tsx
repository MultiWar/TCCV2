import React from 'react'
import {Box} from '@chakra-ui/core'

interface WrapperProps {
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant="regular" }) => {
    return (
        <Box maxW={variant === 'small' ? "500px" : "800px"} w="100%" mt={8} mx="auto">{children}</Box>
    )
}