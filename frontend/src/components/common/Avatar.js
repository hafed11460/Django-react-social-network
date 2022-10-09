import user from 'assets/img/user.png'
const Avatar = ()=>{
    return (
        <span className="bg-dark ">
            <div className="user-menu d-flex">
                <div className="user-img d-flex align-items-center">
                    <div className="avatar avatar-md">
                        <img width={35} src={user} className="rounded-circle" />
                    </div>
                </div>
            </div>
        </span>
    )
}

export default Avatar;