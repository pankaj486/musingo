import React from 'react'

const StatPol = ({ stat, label }) => {
    return (
        <div className="defBorder px-4 py-3 text-center">
            <h4 className="mb-0">{stat}</h4>
            <p className="font-12 mb-0">{label}</p>
        </div>
    )
}

export default StatPol;
