import { useState } from 'react';
import { fetchBooks } from '../services/bookService';

import '../styles/styles.css';

const SearchBar = ({ setBooks }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        fetchBooks(e.target.value).then(data => setBooks(data));
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by title, author, or genre"
            className='search-input'
        />
    );
};

export default SearchBar;
