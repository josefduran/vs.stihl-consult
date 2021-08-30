

export const NavSection = ({sectionSelect, handleChangeSelectNav}) => {
    return (
        <nav className="nav_ps">
            <p
                className={`item_nav_ps ${(sectionSelect == 1) && 'selected_item_nav_ps'}`}
                onClick={handleChangeSelectNav}
                id="1"
            >Info</p>
            <p
                className={`item_nav_ps ${(sectionSelect == 2) && 'selected_item_nav_ps'}`}
                onClick={handleChangeSelectNav}
                id="2"
            >Specs</p>
            <p
                className={`item_nav_ps ${(sectionSelect == 3) && 'selected_item_nav_ps'}`}
                onClick={handleChangeSelectNav}
                id="3"
            >Features</p>
            <p
                className={`item_nav_ps ${(sectionSelect == 4) && 'selected_item_nav_ps'}`}
                onClick={handleChangeSelectNav}
                id="4"
            >Accesories</p>
        </nav>
    )
}
