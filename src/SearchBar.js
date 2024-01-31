import { Box, TextField } from "@mui/material"
import React, { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchList, onSearch }) => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e) => {  
    const searchString = e.target.value;
    setSearchText(searchString);

    const filteredProducts = searchList?.filter((product) => {
      const productName = product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      const productDescription = product.description.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      return productName || productDescription
    })

    console.log(filteredProducts)

    //if onSearch fn is passed from calling component, call onSearch() with filtered products as args
    //this returns the filtered products to the calling component
    //the calling component uses the data to set it to the state and renders the page with results
    if (onSearch) {
      searchString ? onSearch(filteredProducts) : onSearch();
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField label="Search cake name here" variant="standard" sx={{width:'25rem'}}  value={searchText} onChange={handleSearch}></TextField>
    </Box>

  )
}
export default SearchBar;