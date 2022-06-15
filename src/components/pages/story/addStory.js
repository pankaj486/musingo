import React, { useState, useEffect, Fragment } from 'react';
import './addStory.scss';
import AddPerson from './addPerson';
import UploadFile from '../../videoUpload/uploadFile';
import PreviewStory from './previewStory';
import bg from '../../../assets/images/experience-bg.png';
import user from '../../../assets/images/instructor.png';

const AddStory = () => {

    const initialStyle = {
        background: '#a7a7a7',
        borderRadius: '0 0 20px 20px',
        backgroundPosition: 'center',
    }

    const [storyHeader, setStoryHeader] = useState(initialStyle);
    const [preview, setPreview] = useState(false)
    const handleCoverUpload = (url) => {
        const changedStyle = {
            background: `url(${url})`,
            borderRadius: '0 0 20px 20px',
            backgroundPosition: 'top',
            backgroundSize: 'cover'
        }
        setStoryHeader(changedStyle);
    }

    return (
        <div className="pos-relative mb-4">
            {!preview &&
                <Fragment>
                    < div className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center" style={storyHeader}>
                        <div className="py-4 text-center font-weight-bold text-white">
                            <h1 className="pt-4">Cover hochladen</h1>
                            <UploadFile fileType={"image/*"} buttonText={'Tipps, hier klicken'} onUpload={(url) => { handleCoverUpload(url) }} />
                        </div>
                        <div className="align-self-end mr-md-5 my-4">
                            <button className="btn btn-secondary px-5 py-2 font-weight-bold">
                                Follow
                    </button>
                        </div>
                    </div>
                    <div className="container">
                        <div className="d-flex flex-column flex-md-row my-4 align-items-center justify-content-center">
                            <div className="flex-1"></div>
                            <input name="name" id="name" className="form-control musingoo-input text-center flex-1"
                                style={{ maxWidth: '300px', height: '50px', borderRadius: '20px' }} type="text" placeholder="Bandname" />
                            <div className="flex-1 d-flex justify-content-end">
                                <a className="font-weight-bold font-18 cursor-pointer" onClick={() => { setPreview(true) }}>Preview</a>
                            </div>
                        </div>
                        <AddPerson />
                        <div className="d-flex flex-column justify-content-center align-items-center mx-auto mt-4" style={{ maxWidth: '700px' }}>
                            <p className="font-weight-bold font-18">Die Story</p>

                            <textarea className="form-control text-center p-3 font-12"
                                placeholder="Erzähle eine Story über dich/euch als Künstler"
                                style={{ borderRadius: '10px' }}
                                columns="10" rows="8"></textarea>

                            <input name="name" id="name" className="form-control musingoo-input text-center flex-1 mt-4"
                                style={{ maxWidth: '300px', height: '70px', borderRadius: '20px' }} type="text" placeholder="Deine/Eure Email Adresse" />

                            <div className="custom-control custom-checkbox d-flex align-items-center py-2 font-12 mt-2">
                                <input type="checkbox" className="custom-control-input" id="gitarre" />
                                <label className="custom-control-label" htmlFor="gitarre">
                                    Mit dem absenden stimmst du zu, dass die eingetragenen Infos,
                                    personenbezogenen Daten und Bildinhalte auf musingoo.de veröffentlicht werden.
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        style={{ position: 'fixed', bottom: '20px', right: '100px' }}
                        className="btn btn-primary text-white px-5 py-2" disabled>Absenden
                    </button>
                </Fragment>
            }
            {
                preview && <PreviewStory url={bg}
                    bandName={'musingoo'}
                    persons={
                        [
                            { image: user, name: 'Felix Testss' },
                            { image: user, name: 'Felix' },
                            { image: user, name: 'Felix' },
                            { image: user, name: 'Felix' }
                        ]
                    }
                    story='asda asda' />
            }
        </div >
    )
}

export default AddStory;
