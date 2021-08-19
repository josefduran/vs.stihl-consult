import React from 'react'
import {LateralMenu} from '../LateralMenu'
import { LayoutProducts } from '../Layout/LayoutProducts'

export const OptionsPage = () => {
    return (
        <div className="container_menu">
            <LateralMenu/>
            <LayoutProducts/>
        </div>
    )
}
