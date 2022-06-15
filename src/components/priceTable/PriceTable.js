import React, { useEffect, useState, useRef } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './PriceTable.scss';
import Freunden from '../../assets/images/freunden.png'
import Flag from '../../assets/images/flagGray.png';
import Diamond from '../../assets/images/diamond.png';
import { experienceService } from 'src/services/api';
import { useLocation } from "react-router-dom";

const PriceTable = ({ width, openBooking, uid, experience }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    let [unterrichtChecker, setUnterrichtChecker] = useState(false);


    const location = useLocation();

    let [activePrice, setActivePrice] = useState(1);
    const onUnterrichtClick = () => {
        setUnterrichtChecker(!unterrichtChecker);
    }
    const history = useHistory();
    const { path } = useRouteMatch();

    const booking = () => {
        if (width > 1024) {
            history.push('/booking', {
                width: width,
                uid: uid
            })
        }
        if (width <= 1024) {
            openBooking(true);
        }
    }

    return (
        <div className="col-lg-4 col-xl-4 mt-4">
            {width > 1024 && <button className="btn btn-block mt-4 mb-3 border d-flex align-items-center justify-content-center freundenButton">
                <img src={Freunden} alt="Freunden" width="30px" className="mr-2" /> Jetzt mit Freunden teilen!
            </button>}
            <div className="d-flex flex-column justify-content-center align-items-start priceContainer" style={{

            }}>
                <div className="d-flex flex-column border pt-4 px-5 pb-2 bg-white" style={{ borderRadius: '2rem', width: '100%', boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }}>
                    <h4 className="text-center mb-1">{experience.base_unit_amount}€</h4>
                    <p className="text-center">pro Unit a 45 Minuten</p>
                    <button className="btn btn-primary btn-block text-light font-weight-bold py-3" onClick={booking}>Buchung anfragen</button>
                    <p className="mb-0 text-muted text-small text-center mt-3 pb-4">Dir wird noch nichts berechnet </p>
                    {/* <div className="divider"></div> */}
                    {/* </div><div className="d-flex justify-content-between">
                       <span>Service fee pro Einheit</span>
                       <span>5€</span>
                    </div></div> */}
                    <label htmlFor=""></label>
                    {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                       <DropdownToggle caret className="btn-block btn-outline-dark d-flex justify-content-between align-items-center" color="light">
                           4 Einheiten
                       </DropdownToggle>
                       <DropdownMenu>
                           <DropdownItem header>Header</DropdownItem>
                           <DropdownItem header>Footer</DropdownItem>
                    </div>       <DropdownItem header>Sidebar</DropdownItem>
                       </DropdownMenu>
                    </Dropdown> */}
                    {/* <div className="d-flex flex-column">
                       <div className="d-flex justify-content-between">
                           <p className="mb-0">25€ x 4</p>
                           <p className="mb-0">100€</p>
                       </div>
                       {
                           unterrichtChecker &&
                           <div className="d-flex justify-content-between">
                               <p className="mb-0">10€ Anfahrt x4</p>
                               <p className="mb-0">40€</p>
                           </div>
                       }
                       <div className="d-flex justify-content-between">
                           <p className="mb-0">- 20% Rabatt</p>
                           <p className="mb-0">-8€</p>
                       </div>
                       <div className="divider my-2"></div>
                       <div className="d-flex justify-content-between">
                           <p className="mb-0">Summe pro Monat</p>
                           <p className="mb-0">133,28€</p>
                       </div>
                       {
                           activePrice !== 1 &&
                           <div className="d-flex justify-content-between">
                               <p className="mb-0">Summe 6 Monate(Inkl. MwSt.)</p>
                               <p className="mb-0">799.68€</p>
                           </div>
                       }
                    </div> */}

                </div>

                {/* //           {  width > 1024 && */}
                {/* //             <div className="d-flex justify-content-end pr-5" style={{ width: '90%', margin: '0 auto' }}>
        //                 <button className="btn text-right grayFlag mr-4 mt-1"><img src={Flag} alt="flag" width="15px" className="mr-2" />Dieses Inserat melden</button>
        //             </div>
        //         }*/}
                <div className='diamond-block'>
                    <img src={Diamond} />
                    <p><strong>Einzigartige Experience</strong> <br />Diese Experience ist momentan sehr gefragt</p>
                </div>
            </div>


        </div>
    );
}

export default PriceTable;

// {
//     (path === '/booking/group') &&
//     <div className="col-lg-6 col-xl-4 d-flex justify-content-center align-items-start priceContainer">
//         <div className="d-flex flex-column border px-5 pt-4 pb-5 bg-white" style={{ borderRadius: '2rem' }}>
//             <h4 className="text-center mb-1">20€</h4>
//             <p className="text-center ">pro Unit a 45 Minuten</p>
//             <div className="divider mb-3"></div>
//             <div className="d-flex justify-content-between mb-2">
//                 <span>Service fee pro Einheit</span>
//                 <span>5€</span>
//             </div>
//             <label htmlFor="">Gruppe</label>
//             <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//                 <DropdownToggle caret className="btn-block btn-outline-dark d-flex justify-content-between align-items-center" color="light">
//                     Gruppe A
//         </DropdownToggle>
//                 <DropdownMenu>
//                     <DropdownItem header>Header</DropdownItem>
//                     <DropdownItem header>Footer</DropdownItem>
//                     <DropdownItem header>Sidebar</DropdownItem>
//                 </DropdownMenu>
//             </Dropdown>
//             <label htmlFor="">Anzahl Schüler</label>
//             <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//                 <DropdownToggle caret className="btn-block btn-outline-dark d-flex justify-content-between align-items-center" color="light">
//                     1 Schüler
//         </DropdownToggle>
//                 <DropdownMenu>
//                     <DropdownItem header>Header</DropdownItem>
//                     <DropdownItem header>Footer</DropdownItem>
//                     <DropdownItem header>Sidebar</DropdownItem>
//                 </DropdownMenu>
//             </Dropdown>

//             <label htmlFor="">Einheiten pro Monat</label>

//             <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//                 <DropdownToggle caret className="btn-block btn-outline-dark d-flex justify-content-between align-items-center" color="light">
//                     4 Einheiten
//         </DropdownToggle>
//                 <DropdownMenu>
//                     <DropdownItem header>Header</DropdownItem>
//                     <DropdownItem header>Footer</DropdownItem>
//                     <DropdownItem header>Sidebar</DropdownItem>
//                 </DropdownMenu>
//             </Dropdown>
//             <p className={width <= 1024 ? 'text-center' : 'text-left'}>Abonnement</p>
//             <div className="row mb-3 justify-content-center" style={{ fontSize: '.8rem' }}>
//                 <div className="col-sm-3 col-6 px-1 mb-1">
//                     <div className={"priceBox p-1 cursor-pointer mb-1 d-flex flex-column align-items-center justify-content-center " + (activePrice === 1 ? 'is-active' : '')}
//                         onClick={() => { setActivePrice(1) }}>
//                         <p className="mb-0 text-center pt-1">Kein Abo</p>
//                         <p>- 0%</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-3 col-6 px-1 mb-1">
//                     <div className={"priceBox p-1 cursor-pointer mb-1 d-flex flex-column align-items-center justify-content-center " + (activePrice === 2 ? 'is-active' : '')}
//                         onClick={() => { setActivePrice(2) }}>
//                         <p className="mb-0 text-center pt-1">3 Monate</p>
//                         <p>- 10%</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-3 col-6 px-1 mb-1">
//                     <div className={"priceBox p-1 cursor-pointer mb-1 d-flex flex-column align-items-center justify-content-center " + (activePrice === 3 ? 'is-active' : '')}
//                         onClick={() => { setActivePrice(3) }}>
//                         <p className="mb-0 text-center pt-1">6 Monate</p>
//                         <p>- 20%</p>
//                     </div>
//                 </div>
//                 <div className="col-sm-3 col-6 px-1 mb-1">
//                     <div className={"priceBox p-1 cursor-pointer mb-1 d-flex flex-column align-items-center justify-content-center " + (activePrice === 4 ? 'is-active' : '')}
//                         onClick={() => { setActivePrice(4) }}>
//                         <p className="mb-0 text-center pt-1">12 Monate</p>
//                         <p>- 30%</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="d-flex justify-content-between">
//                 <p className="mb-0">25€ x 4</p>
//                 <p className="mb-0">100€</p>
//             </div>
//             <div className="d-flex justify-content-between">
//                 <p className="mb-0">- 20% Rabatt</p>
//                 <p className="mb-0">-8€</p>
//             </div>
//             <div className="divider my-2"></div>
//             <div className="d-flex justify-content-between">
//                 <p className="mb-0">Summe pro Monat</p>
//                 <p className="mb-0">133,28€</p>
//             </div>
//             {
//                 activePrice !== 1 &&
//                 <div className="d-flex justify-content-between">
//                     <p className="mb-0">Summe 6 Monate(Inkl. MwSt.)</p>
//                     <p className="mb-0">799.68€</p>
//                 </div>
//             }
//             <button className="btn btn-primary btn-block text-light mt-3 font-weight-bold" onClick={booking}>Buchung anfragen</button>
//             <p className="mb-0 text-muted text-small text-center mt-3 pb-4">Dir wird noch nichts berechnet</p>
//         </div>
//     </div>

// }



