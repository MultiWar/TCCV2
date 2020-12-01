import React, { useRef } from 'react';
import { motion } from 'framer-motion'

import { Container, Search, SearchIcon } from './styles';
import { useHistory } from 'react-router-dom';
import { DefaultButton } from '../DefaultButton';
import { useRecoilState } from 'recoil';
import { isSearchBarVisible } from '../Header'
import { searchQuery } from '../../atoms/searchQuery';

const SearchBar: React.FC = () => {
  const [isVisible, setIsVisible] = useRecoilState(isSearchBarVisible)
  const [, setQuery] = useRecoilState(searchQuery)
  const searchInput = useRef<HTMLInputElement>(null)
  const history = useHistory()

  const handleButtonClick = (query?: string) => {
    if(!isVisible) {
      setIsVisible(true)
      return
    }
    if(query) {
      setQuery(query)
      // history.push({search: `?query=${query}`})
      history.push(`/?query=${query}`)
    }
    setIsVisible(false)
  }

  return (
    <Container
      animate={{
        width: isVisible ? '100%' : 40,
        maxWidth: 1000
      }}
      transition={{
        duration: 0.37,
        ease: 'easeInOut'
      }}
    >
      <motion.div
        initial={{
          paddingLeft: 0
        }}
        animate={{
          paddingLeft: isVisible ? 20 : 0
        }}
      >
        <Search ref={searchInput} placeholder='DIGITE AQUI SUA BUSCA' />
      </motion.div>
      <DefaultButton
        w='40px'
        h='40px'
        borderRadius='50%'
        border='1px solid black'
        mt={0}
        p={3}
        onClick={ () => handleButtonClick(searchInput.current?.value) }
      ><SearchIcon /></DefaultButton>
    </Container>
  );
}

export default SearchBar;