import {ReactNode, createContext, useState} from 'react'
import { Result } from '../models/Result'

/**
 * Define o que vai ser armazenado
 * no contexto (state) compartilhado
 */
type UserContextType = {
    lastResult: Result 
    setLastResult: (newValue: Result) => void
    query: string
    setQuery: (newValue: string) => void
}

/**
 * Atribui um valor inicial às propriedades
 * do contexto (state) compartilhado
 */
const initialValue: UserContextType = {
    lastResult: {
        photos: [],
        totalPages: 0
    },
    setLastResult: () => {},
    query: '',
    setQuery: () => {}
}

export const UserContext = createContext(initialValue)

type Props = {
    children: ReactNode
}

/**
 * Cria o provider, ou seja, o nosso contexto (state) compartilhado
 */
export const UserContextProvider = ({children}: Props) => {
    const [lastResult, setLastResult] = useState(initialValue.lastResult)
    const [query, setQuery] = useState(initialValue.query)

    return <UserContext.Provider value={{
        lastResult, setLastResult, query, setQuery
        }}>
        {children}
    </UserContext.Provider>
}