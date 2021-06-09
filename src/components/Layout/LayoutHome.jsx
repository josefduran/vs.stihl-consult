import React from 'react'
import { LateralMenu } from '../LateralMenu'
import { HomePage } from '../Pages/HomePage'

export const LayoutHome = () => {
    return (
        <div className="container_menu">
            <LateralMenu />
            <HomePage />
        </div>
    )
}
