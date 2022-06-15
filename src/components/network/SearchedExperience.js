import React from 'react';

const SearchedExperience = ({ image, text, click }) => {
    const style = {
        borderRadius: '0 10px 10px 0'
    }
    
    return (
        <div className="d-flex defBorder mb-2" style={{maxWidth:'250px', cursor: 'pointer'}} onClick={click}>
            <img style={style} src={image} width="70px" alt="text" />
            <p className="py-4 mb-0 ml-3 pr-3">{text}</p>
        </div>
    )
}

export default SearchedExperience
