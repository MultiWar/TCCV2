import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, Textarea } from "@chakra-ui/core"
import { useField } from "formik"
import React, { InputHTMLAttributes, useContext } from "react"
import { ThemeContext } from "styled-components"

type CustomInputProps = InputProps & {
    type?: string
    label?: string
    placeholder: string
    name: string
    isTextArea?: boolean 
}

export const InputField: React.FC<CustomInputProps> = ({isTextArea=false, placeholder, type='text', ...props}) => {
    const themeContext = useContext(ThemeContext)
    const [field, {error}] = useField(props)
    let InputOrTextArea = Input
    if(isTextArea) {
        InputOrTextArea = Textarea
    }
    return (
        <FormControl isInvalid={!!error}>
            {props.label ? <FormLabel htmlFor={field.name} fontSize='xl' >{props.label}</FormLabel> : null}
            <InputOrTextArea {...field} id={field.name} placeholder={placeholder} type={type} {...props} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}