import React, { useState, useEffect, useRef } from 'react'
import AddPic from '../../../assets/images/addPic.png';
import user from '../../../assets/images/instructor.png';

const AddPerson = () => {
    const [persons, setPersons] = useState(
        [
            { image: AddPic, selected: false },
            { image: AddPic, selected: false },
            { image: AddPic, selected: false },
            { image: AddPic, selected: false }
        ]
    );


    const addPerson = (index) => {
        setPersons([...persons, { image: AddPic, selected: false }])
    }

    const addImage = (index) => {
        const tempPersonsForReset = persons;
        tempPersonsForReset.map(person => person.selected = false);
        setPersons(tempPersonsForReset.slice());

        const tempPersons = persons;
        tempPersons[index].selected = !tempPersons[index].selected;
        setPersons(tempPersons.slice());
    }

    const handleTimClick = (index) => {
        const tempPersons = persons;
        tempPersons[index].image = user;
        tempPersons[index].selected = false;
        setPersons(tempPersons.slice());
    }


    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // if (ref.current && !ref.current.contains(event.target)) {
            //     const tempPersons = persons;
            //     tempPersons.map(person => person.selected = false);
            //     setPersons(tempPersons.slice());
            // }
            if (!ref.current.contains(event.target)) {
                const tempPersons = [...persons]
                const index = tempPersons.findIndex(person => person.selected)
                if (index !== -1) {
                    tempPersons[index].selected = false
                }
                setPersons(tempPersons)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, persons]);

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center" >
            <div className="pos-relative d-flex align-items-center justify-content-center flex-wrap" ref={ref}>
                {
                    persons.map(
                        (person, index) => {
                            return <div >
                                <button className="btn px-1 pos-relative" onClick={() => addImage(index)}>
                                    <img className="rounded-circle" src={person.image} alt="addPic" width="60px" />
                                </button>
                                {person.selected && <div className="defBorder p-4 bg-white" style={{ position: 'absolute', width: '240px', backgroundColor: '#fff' }}>
                                    <input name="name" id="name"
                                        style={{ borderRadius: '15px' }}
                                        className="form-control musingoo-input text-center flex-1 mb-4" type="text" placeholder="Tim" />
                                    <div className="d-flex align-items-center justify-content-start timItem mb-3" onClick={() => { handleTimClick(index) }}>
                                        <img width="30px" height="30px" src={user} className="rounded-circle" alt="user" />
                                        <p className="mb-0 ml-2"><span className="font-weight-bold">Tim,</span>KNAME</p>
                                    </div>
                                </div>}
                            </div>
                        }
                    )}
                <a className="font-weight-bold font-18 ml-4 addNewPerson cursor-pointer" onClick={() => addPerson()}>Hinzufügen</a>
            </div>
        </div>
    )
}

export default AddPerson
