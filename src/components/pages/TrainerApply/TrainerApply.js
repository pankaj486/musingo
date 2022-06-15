import './TrainerApply.scss';
import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from "react-router-dom";
import useWindowResize from '../../../custom-hooks/useWindowResize';
import InputAgreement from 'src/components/inputAgreement/inputAgreement';
import VideoUpload from '../../videoUpload/videoUpload';
import InputAgreementSummary from '../../inputAgreementSummary/inputAgreementSummary';
import FormProgressBar from '../../formProgressBar/FormProgressBar';
import { getAgeGroup, getLessonLevel, getinstrument, becomeTeacherApi } from 'src/services/trainerApply/trainerGetApi';
// import { arrayFilter } from "../../../utils/helpers";
import {trainerService, instrumentService,lessonTypeService} from "../../../services/api";

const TrainerApply = (props) => {
    let history = useHistory();
    const [formData, setFormData] = useState({
        duration: '',
        teachingExperience: '',
        instrumentExperience: '',
        organizeFirstLesson: '',
        motivation: '',
        instrumentType: [],
        ageGroup: [],
        // level: '',
        lessonType: [],
    })

    const [instrumentValue, setInstrumentValue] = useState([]);
    const [ageGroupValue, setAgeGroupValue] = useState([]);
    const [lessonLevelValue, setLessonLevelValue] = useState([]);
    const [lessonTypeValue, setLessonTypeValue] = useState([]);
    const [active, setActive] = useState(1);
    const { dimensions } = useWindowResize();
    const width = dimensions.width;
    let [progress, setProgress] = useState(1);
    const [videoSrc, setVideoSrc] = useState(null);
    const [instrumentType, setInstrumentType] = useState();
    const [instruments, setInstruments] = useState([]);
    const [lessonTypes, setLessonTypes] = useState([]);
    const [lessonType, setLessonType] = useState([]);
    const [lessonLevel, setLessonLevel] = useState([]);

    const [lessonLevels, setLessonLevels] = useState();
    const [ageGroups, setAgeGroups] = useState();



    const getDropdownvalue = (inputFieldName, value) => {

        setFormData({
            ...formData,
            [inputFieldName]: value,
        });

    }

    const handleChange = (inputFieldName,e) => {
        e.persist();
        const { value } = e.target;

        setFormData({
            ...formData,
            [inputFieldName]: value,
        });
    };


    useEffect(() => {
        (async function () {
            Promise.all([
                lessonTypeService.getAll(),
                instrumentService.getAll()
            ]).then(res => {
                setLessonType(res[0].results)
                // setInstruments(res[0].results)
            })
                .catch(error => console.log(`Error in promises ${error}`))
        })()
        getInfoAgeLevel();
    }, [])

    const getInfoAgeLevel = async () => {
        getAgeGroup().then((response) => {
            setAgeGroups(response.data.results)
        });
        getLessonLevel().then((response) => {
            setLessonLevel(response.data.results)
        });
        getinstrument().then((response) => {
            setInstruments(response.data.results);
        })
    };


    const steps = 13
    const headers = ['Erfahrung', 'Pädagogik', 'Dein Unterricht'];

    const handleProgress = (value) => {
        setProgress(value);
        setActive(value);
    }



    const submitForm = () => {


        const data = {
            experience_musician: formData.duration,
            experience_teaching: formData.teachingExperience,
            experience_instruments: formData.instrumentExperience,
            education_first_class: formData.organizeFirstLesson,
            education_motivation: formData.motivation,

            instruments: [formData.instrumentType.uid],
            age_groups: [formData.ageGroup.uid],

            lesson_levels: [formData.lessonLevels.uid], //not in API

            lesson_types: [formData.lessonType.uid]
        }




        // trainerService.post(data)
        //     .then(res => {
        //         console.log('response', res)
        //         alert('Trainer Applied Successfully!')
        //     }).catch(e => {
        //         //   <Alert type={error.type} message={error.message} />
        //         // Conditionally render our errors
        //         let errors = e.response.data || []
        //         for (const property in errors) {
        //             // console.log(`${property}: ${errors[property]}`);
        //             alert(errors[property])
        //           }

        //     }).finally(() => {        
        //         history.push('/createExperience')
        //     })


        becomeTeacherApi(data).then((response) => {
            alert('Trainer Applied Successfully!');
            console.log("checking", response);
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            history.push('/createExperience')
        })

    }

    return (
        <div className="d-flex text-center flex-column justify-content-center align-items-center container">
            <div className="trainerContainer">
                {active !== 1 &&
                    <div className='trainer-form-progress'>
                        <FormProgressBar
                            headers={headers}
                            width={width}
                            progress={progress}
                            handleProgress={setProgress}
                            progressPercentage={`${(100 / steps) * progress}%`}
                        />
                    </div>}
                {
                    active === 1 &&
                    <InputAgreement
                        header={'Cool, dass du Trainer werden willst!'}
                        welcomeText={'Hey ANNA,'}
                        text={`wir freuen uns sehr, dass du Trainer bei MUSINGOO werden willst. Als
                Musingoo Trainer kannst du Musikunterricht zu deinen eigenen Vorstellungen
                flexibel im Alltag anbieten. MUSINGOO versorgt dich mit Schüleranfragen,
                die genau zu deinen Kursen passen. Musik ist eine Kunst und wir glauben
                daran, dass jeder Musiker, egal ob Hobbymusiker, Musikstudent,
                Bandmusiker oder Professioneller Musiklehrer seine musikalischen
                Fähigkeiten teilen kann, um Geld zu verdienen, jedoch umso wichtiger
                gemeinsam Musik zu machen. Respect the Music.`}
                        buttonText={'Weiter'}
                        returnFunction={() => { handleProgress(2) }}
                    />

                }
                {
                    active === 2 &&
                    <InputAgreement
                        header={'Bekenntnis in der Community'}
                        text={`Musingoo ist eine Community des Vertrauens. Menschen verbinden sich,
                um anderen Menschen ein Instrument beizubringen. Um gemeinsam eine
                starke Community aufzubauen, ist es wichtig, dass du dich, sowie jedes
                Mitglied an höfliche, sowie ethische Grundverhaltensregeln hälst.
                Als Musingoo Trainer wirst du ein sehr wichtiger Bestandteil unserer
                Community und bekommst ebenso hohe Verantwortung. Wir freuen uns
                sehr auf deinen Unterricht.`}
                        buttonText={'Zustimmen'}
                        returnFunction={() => { handleProgress(3) }}
                    />
                }

                {
                    active === 3 &&
                    <InputAgreement
                        header={'Musikalische Erfahrung'}
                        text={`Seit wann machst du Musik?`}
                        inputField={true}
                        inputValue={formData.duration}
                        inputFieldName={'duration'}
                        handleChange={handleChange}
                        buttonText={'Weiter'}
                        returnFunction={() => { handleProgress(4); }}
                    />
                }

                {
                    active === 4 &&
                    <InputAgreement
                        header={'Unterrichtserfahrung'}
                        text={`Hast du bereits Unterrichtet - Falls ja, wie lange?`}
                        inputField={true}
                        inputValue={formData.teachingExperience}
                        inputFieldName={'teachingExperience'}
                        handleChange={handleChange} buttonText={'Weiter'}
                        returnFunction={() => { handleProgress(5); }}
                    />
                }

                {
                    active === 5 &&
                    <InputAgreement
                        header={'Erfahrung mit deinem Instrument'}
                        text={`Seit wie vielen Jahren spielst du das/die Instrument/e, dass/die du unterrichten möchtest?`}
                        inputField={true}
                        inputValue={formData.instrumentExperience}
                        inputFieldName={'instrumentExperience'}
                        handleChange={handleChange} buttonText={'Weiter'}
                        returnFunction={() => { handleProgress(6); }}
                    />
                }

                {
                    active === 6 &&
                    <InputAgreement
                        header={'Dein künftiger Unterricht'}
                        text={`Wie würdest du deine erste Unterrichtsstunde gestalten?`}
                        inputField={true}
                        inputValue={formData.organizeFirstLesson}
                        inputFieldName={'organizeFirstLesson'}
                        handleChange={handleChange}
                        buttonText={'Weiter'}
                        returnFunction={() => { handleProgress(7); }}
                    />
                }

                {
                    active === 7 &&
                    <InputAgreement
                        header={'Problemsituation'}
                        text={`Wie würdest du mit fehlender Motivation deines Schülers umgehen?
                    Beispiel: Du unterrichtest einen 8 Jährigen Schüler und dein Schüler`}
                        inputField={true}
                        inputValue={formData.motivation}
                        inputFieldName={'motivation'}
                        handleChange={handleChange} buttonText={'Weiter'}
                        returnFunction={() => { handleProgress(8); }}
                    />
                }

                {
                    active === 8 &&
                    <InputAgreement
                        header={'Instrumente'}
                        text={`Welche Instrumente möchtest du unterrichten?`}
                        dropdownField={true}
                        inputValue={formData.instrumentType}
                        inputFieldName={'instrumentType'}
                        buttonText={'Weiter'}
                        getDropdownvalue={getDropdownvalue}
                        dropdownItems={instruments}
                        handleChange={handleChange} returnFunction={() => { handleProgress(9); }}
                    />
                }

                {
                    active === 9 &&
                    <InputAgreement
                        header={'Altersgruppe'}
                        text={`Welche Altergruppe willst du generell unterrichten?`}
                        dropdownField={true}
                        buttonText={'Weiter'}
                        inputValue={formData.ageGroup}
                        inputFieldName={'ageGroup'}
                        dropdownItems={ageGroups}
                        getDropdownvalue={getDropdownvalue}
                        handleChange={handleChange}
                        returnFunction={() => { handleProgress(10); }}
                    />
                }

                {
                    active === 10 &&
                    <InputAgreement
                        header={'Unterrichts-Level'}
                        text={`Unterrichtest du Anfänger, fortgeschrittene oder beides?`}
                        dropdownField={true}
                        buttonText={'Weiter'}
                        inputValue={formData.lessonLevels}
                        inputFieldName={'lessonLevels'}
                        getDropdownvalue={getDropdownvalue}
                        dropdownItems={lessonLevel}
                        handleChange={handleChange} returnFunction={() => { handleProgress(11); }}
                    />
                }

                {
                    active === 11 &&
                    <InputAgreement
                        header={'Unterrichtsarten'}
                        text={`Welche Unterrichtsarten möchtest du unterrichten?`}
                        dropdownField={true}
                        inputValue={formData.lessonType}
                        inputFieldName={'lessonType'}
                        buttonText={'Weiter'}
                        getDropdownvalue={getDropdownvalue}
                        dropdownItems={lessonType}
                        handleChange={handleChange} returnFunction={() => { handleProgress(12); }}
                    />
                }

                {
                    active === 12 &&
                    <VideoUpload
                        header={'Video Upload'}
                        text={`Lade ein video von 1 Minute hoch. Beschreibe hierbei deine Person als Musiker/in,  deine Stärken und Schwächen und deine Motivation, Musikunterricht via MUSINGOO zu geben. Gerne kannst du auch noch eine Anekdote von dir erzähelen (ist aber keine Vorraussetzung)

                    `}
                        returnFunction={(video) => { handleProgress(13); setVideoSrc(video) }}
                    />
                }
            </div>
            {
                active === 13 && <Fragment>

                    <InputAgreementSummary
                        header={'Hier kannst du nocheinmal alles prüfen, bevor du fortfährst.'}
                        title={`Zusammenfassung`}
                        items={
                            [
                                { question: 'Seit wann machst du Musik?', answer: formData.duration, type: 'input' },
                                { question: 'Hast du bereits Unterrichtet - Falls ja, wie lange?', answer: formData.teachingExperience, type: 'input' },
                                { question: 'Seit wie vielen Jahren spielst du das/die Instrument/e, dass/die du unterrichten möchtest?', answer: formData.instrumentExperience, type: 'input' },
                                { question: 'Wie würdest du deine erste Unterrichtsstunde gestalten?', answer: formData.organizeFirstLesson, type: 'input' },
                                { question: 'Wie würdest du mit fehlender Motivation deines Schülers umgehen?', answer: formData.motivation, type: 'input' },
                                { question: 'Welche Instrumente möchtest du unterrichten?', answer: formData.instrumentType.name || '', type: 'input' },
                                { question: 'Welche Altergruppe willst du generell unterrichten?', answer: formData.ageGroup.name || '', type: 'input' },
                                { question: 'Unterrichtest du Anfänger, fortgeschrittene oder beides?', answer: formData.lessonType.name || '', type: 'input' },
                                //{ question: 'Welche Unterrichtsarten möchtest du unterrichten?', answer: lessonTypeValue[0].name || '', type: 'input' },
                                { question: 'Wie würdest du deine erste Unterrichtsstunde gestalten?', videoSrc: videoSrc, type: 'video' }




                            ]
                        }
                    />
                    <div className="py-3 d-flex justify-content-center absendenButton">
                        <button className="btn btn-primary text-white p-2 px-5 px-md-4 mb-2" onClick={submitForm} >Absenden</button>
                    </div>
                </Fragment>

            }
        </div>
    )
}
export default TrainerApply;