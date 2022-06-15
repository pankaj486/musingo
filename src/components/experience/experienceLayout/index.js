import { IconButton } from '@material-ui/core'
import React from 'react'
import DotSidebarBox from '../dotSidebarBox'
import './style.scss'
import LeftArrowIcon from 'src/assets/images/new/icon-left-arrow-dark.png'

const ExperienceLayout = ({
    children,
    bgImage,
    dotSidebarItems
}) => {
    return (
        <div className="container-fluid">
            <IconButton aria-label="delete" size="large" classes={{ root: 'experienceArrowIconButtonRoot' }}>
                <img src={LeftArrowIcon} className="experienceArrowIconButtonIcon" />
            </IconButton>
            {/* <DotSidebarBox 
                items={dotSidebarItems}
            /> */}

            <div className="row">
                <div className="col-12">
                   

                    <div className="experienceWrapperTop" id="experienceWrapperTop"></div>

                    <div className="experienceWrapper experienceWrapper--bg experienceWrapper--parallax">

                        <div className="experienceTopBg"></div>

                        <div className="experienceInner">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ExperienceLayout.defaultProps = {
    bgImage: ''
}

export default ExperienceLayout