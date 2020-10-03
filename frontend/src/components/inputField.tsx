import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/core"
import { useField } from "formik"
import React, { InputHTMLAttributes, useContext } from "react"
import { ThemeContext } from "styled-components"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    type?: string
    label: string
    placeholder: string
    name: string
    isTextArea?: boolean 
}

export const InputField: React.FC<InputProps> = (props) => {
    const themeContext = useContext(ThemeContext)
    const [field, {error}] = useField(props)
    let InputOrTextArea = Input
    if(props.isTextArea) {
        InputOrTextArea = Textarea
    }
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name} fontSize='20px'>{props.label}</FormLabel>
            <InputOrTextArea {...field} id={field.name} placeholder={props.placeholder} type={props.type} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}