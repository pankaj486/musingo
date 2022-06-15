import { BuilderComponent, builder } from '@builder.io/react'
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

builder.init(process.env.REACT_APP_BUILDER_API_KEY)

export const CatchAllPage = ({showNavbar, setShowNavBar}) => {
    const [pageJson, setPage] = useState()
    const location = useLocation()

    useEffect(() => {
        const showNavbarPrev = showNavbar
        setShowNavBar(false)
        builder.get('page', {url: location.pathname})
            // The value will be `null` if no page was found
            .promise().then((page) => {
                setPage(page);
                console.log(page)
        })
        return () => setShowNavBar(showNavbarPrev)
    }, [])

    return pageJson === undefined
        ? <div> Loading </div>
        : pageJson
            ? <BuilderComponent model="page" content={pageJson} contentLoaded={data => {
                document.title = data.title; // E.g. if your custom field is called `title`
                setShowNavBar(data.showNavBar);
            }}
            />
            : <div> ERROR 404 </div>
}
