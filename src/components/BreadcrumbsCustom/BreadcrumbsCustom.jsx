import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getThemeSelector } from '../../redux/selector'

const BreadcrumbsCustom = ({ secondary, primary }) => {
    const navigate = useNavigate()
    const theme = useSelector(getThemeSelector)
    return (
        <div className={`text-[${theme.palette.textColor.main}] p-4 flex space-x-2 text-md`}>
            {
                secondary.map(item =>
                    <Fragment>
                        <span className='hover:underline cursor-pointer' onClick={() => navigate(`${item.path}`)} >{item.title}</span>
                        <span>/</span>
                    </Fragment>
                )
            }
            <span className='font-semibold'>{primary}</span>
        </div>
    )
}

export default BreadcrumbsCustom