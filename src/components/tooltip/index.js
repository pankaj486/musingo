import React from 'react'
import { makeStyles, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'

const UiTooltip = ({
    title,
    content,
    arrow,
    placement,
    children,
    ...rest
}) => {
    const tooltipClasses = overrideDefaultStyle()
    return (
        <Tooltip
            title={title} arrow={arrow}
            classes={tooltipClasses}
            placement={placement}
            interactive
            {...rest} 
        >
            {children}
        </Tooltip>
    )
}

UiTooltip.defaultProps = {
    arrow: false,
    title: 'Tooltip text',
    placement: 'top-end',
}

const overrideDefaultStyle = makeStyles(() => ({
    tooltip: {
        backgroundColor: '#fff',
        fontSize: 15,
        borderRadius: '13px !important',
        border: '1.5px solid #D6D5D5',
        boxShadow: '2px 5px 5px rgba(0,0,0, 0.15)',
        whiteSpace: 'nowrap',
        color: '#5e5e5e',
        fontWeight: 600,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: '2px',
    },
    arrow: {
        color: '#fff',
    },
}))

export default UiTooltip