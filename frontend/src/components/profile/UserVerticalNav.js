import user from 'assets/img/user.png'

const UserVerticalNav = (props)=>{
    return(
        <a href='#' className='text-decoration-none'>
        <div class="d-flex mt-2 align-items-center">
            <div class="flex-shrink-0">
                <img className="rounded-circle" src={user} width="50" />
            </div>
            <div class="flex-grow-1   px-2 py-1  rounded-3">
                <h5 className='text-dark'>Mahfoud</h5>
            </div>
        </div>
    </a>
    )
}

export default UserVerticalNav;