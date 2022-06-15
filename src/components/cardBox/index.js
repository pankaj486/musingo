import React from 'react'
import './style.scss'

const CardBox = ({
    title,
    customHeader,
    headerActionContent,
    classes,
    bodyMaxHeight,
    children,
    height,
    padd,
    ...rest
}) => {
    return (
        <div className={`cardBox ${classes?.root || ''}`} {...rest} style={{ height: height ? height : 'auto' }}>
            {
                (title || headerActionContent) &&
                <div className={`cardBoxHeader ${classes?.header || ''}`}>
                    {
                        title &&
                        <h5 className={`cardBoxHeaderTitle ${classes?.title || ''}`}>
                            {title}
                        </h5>
                    }
                    {
                        headerActionContent &&
                        <div className={`cardBoxHeaderActionContent ${classes?.actionContent || ''}`}>
                            {headerActionContent}
                        </div>
                    }
                </div>
            }
            <div
                className={`cardBoxBody ${classes?.body || ''}`}
                style={{ maxHeight: `${bodyMaxHeight}px`, padding: `${padd}` }}
            >
                {children}
            </div>
        </div>
    )
}

CardBox.defaultProps = {
    bodyMaxHeight: 500,
}

export default CardBox