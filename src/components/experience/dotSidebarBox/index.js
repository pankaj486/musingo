import React, { useEffect, useState } from 'react'

const DotSidebarBox = ({
    items
}) => {


    useEffect(() => {
        getInitSidebarDotActive()
    }, [])

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY);
            handleScroll()
        });
    }, [scroll]);

    const handleScroll = () => {
        const navItems = document.querySelectorAll('.experienceDotSidebarItem')
        navItems.forEach((singleItem, i) => {
            singleItem.classList.remove('active')
            if (scroll < 400 && singleItem.classList.contains('control-panel')) {
                singleItem.classList.add('active')
            }else if (scroll > 400 && scroll < 700 && singleItem.classList.contains('share-chat')) {
                singleItem.classList.add('active')
            }else if (scroll > 700 && scroll < 1000  && singleItem.classList.contains('activity')) {
                singleItem.classList.add('active')
            }else if (scroll > 1000 && singleItem.classList.contains('experience')) {
                singleItem.classList.add('active')
            }
        })
    }

    const getInitSidebarDotActive = () => {
        console.log('Init Active dot sidebar')
        const activeItemHash = window?.location?.hash
        let activeItem = activeItemHash?.substring(1) || (items?.length > 0 && items[0].className || '')

        console.log('activeItem---', activeItem)

        const navItems = document.querySelectorAll('.experienceDotSidebarItem')

        navItems.forEach((singleItem, i) => {
            singleItem.classList.remove('active')
            if (singleItem.classList.contains(activeItem)) {
                singleItem.classList.add('active')
            }
        })
    }

    const onClickSidebarDot = menuItem => {
        console.log('clicked dot sidebar')

        const navItems = document.querySelectorAll('.experienceDotSidebarItem')

        navItems.forEach((singleItem, i) => {
            singleItem.classList.remove('active')
            if (singleItem.classList.contains(menuItem?.className)) {
                singleItem.classList.add('active')
            }
        })
    }


    return (
        <>
            {
                items?.length > 0 &&
                <div className="experienceDotSidebar">
                    {
                        items.map((item, index) => {
                            return (
                                <a
                                    href={`#${item?.href}`}
                                    className={`experienceDotSidebarItem ${item?.className}`}
                                    onClick={() => onClickSidebarDot(item)}
                                    key={index}
                                >
                                </a>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default DotSidebarBox