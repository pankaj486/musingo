import React from 'react'
import model from '../../../assets/images/model.png'

const Review = ({lerninhalteReview, freundlichkeitReview, rerminfindungReview, räumlichkeitenReview, reviews}) => {
    return (
        <div className="d-flex flex-column px-5 px-md-0 pr-md-5 py-xs-3 px-xs-2">
            <h4 className="text-center mt-4 font-weight-bold">Bewertungen</h4>
            <div className="d-flex justify-content-between mt-4">
                <span>Lerninhalte </span>
                <span>
                    {
                        [...Array(lerninhalteReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-d pr-1" aria-hidden="true"></i>
                        )
                    }
                    {
                        [...Array(5 - lerninhalteReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-a pr-1" aria-hidden="true"></i>
                        )
                    }
                </span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Freundlichkeit </span>
                <span>
                    {
                        [...Array(freundlichkeitReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-d pr-1" aria-hidden="true"></i>
                        )
                    }
                    {
                        [...Array(5 - freundlichkeitReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-a pr-1" aria-hidden="true"></i>
                        )
                    }
                </span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Terminfindung</span>
                <span>
                    {
                        [...Array(rerminfindungReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-d pr-1" aria-hidden="true"></i>
                        )
                    }
                    {
                        [...Array(5 - rerminfindungReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-a pr-1" aria-hidden="true"></i>
                        )
                    }
                </span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Räumlichkeiten </span>
                <span>
                    {
                        [...Array(räumlichkeitenReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-d pr-1" aria-hidden="true"></i>
                        )
                    }
                    {
                        [...Array(5 - räumlichkeitenReview)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-a pr-1" aria-hidden="true"></i>
                        )
                    }
                </span>
            </div>

            {reviews.map(
                (review, index) =>
                    <div key={index}>
                        <div className="d-flex mt-5 mb-4">
                            <div className="d-flex align-items-start">
                                <img src={model} alt="" width="60px"/>
                                <div className="d-flex flex-column ml-3">
                                    <p className="mb-0 font-weight-bold">Anna</p>
                                    <p>{review.text}</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        {index !== 2 && <div className="divider"></div>}
                    </div>
            )
            }


        </div>
    )
}

export default Review
