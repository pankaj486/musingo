import React, { useState, useRef } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import SearchedExperience from './SearchedExperience';
import ConcertBG from '../../assets/images/concertBg.png'
import './networkSearch.scss'

const NetworkSearch = () => {
  const [experiences, setExperiences] = useState([
    {
      title: 'Learn Djamble like a pro experiences',
      id: 1,
      searchMatch: true
    },
    {
      title: 'Learn Flamenco like a pro experiences',
      id: 2,
      searchMatch: true
    }
  ])
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {
    setDropdownOpen(prevState => !prevState)
    //update experiences
    const updatedExp = [...experiences]
    updatedExp.forEach(exp => {
      exp.searchMatch = true
    })
    setExperiences(updatedExp)
  }
  const [dropdownValue, setDropdownValue] = useState('');
  const [search, setSearch] = useState('')
  const style = {
    background: `url(${ConcertBG}) no-repeat`,
    backgroundSize: 'cover',
    minHeight: '250px',
    minWidth: '400px',
    maxWidth: '500px',
    width: '100%',
    backgroundPosition: 'center',
    borderRadius: '30px'
  }
  const handleSearch = (value) => {
    const updatedExp = [...experiences]
    updatedExp.forEach(exp => {
      exp.searchMatch = exp.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    })
    setExperiences(updatedExp)
  }
  return (
    <div style={{ maxWidth: '500px' }}
         className="defContainer mx-auto d-flex flex-column justify-content-center align-items-center pt-5 network-search-experience-verlinken-container">
      <div style={style} className="mt-5 bg-white">
        <Dropdown className="mt-4 ml-4" isOpen={dropdownOpen} toggle={toggle} style={{position: 'relative'}}>
          <DropdownToggle className="text-primary py-3 bg-white px-5 border-0 font-weight-bold">
            Experience verlinken
          </DropdownToggle>
          <DropdownMenu className="px-4 defBorder">
            <input type="text" className="form-control my-4 musingoo-input" placeholder="Suche experiences" onChange={(event) => handleSearch(event.target.value)}/>
            {
              experiences.map((item, index) => {
                return item.searchMatch ? (
                  <SearchedExperience
                    key={item.id}
                    image={ConcertBG}
                    text={item.title}
                    click={toggle}
                  />
                ) : null
              })
            }
          </DropdownMenu>
        </Dropdown>
      </div>
      <button className="btn btn-block flex-1 mt-4 btn-primary text-white py-3">
        Post it
      </button>
    </div>
  )
}

export default NetworkSearch;
