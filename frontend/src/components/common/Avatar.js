import user from 'assets/img/user.png'
const Avatar = ({
    src=user,
    size=35,
    rounded='circle',
}) => {
    return (
        <span>
            <img width={size} height={size} src={src} className="rounded-circle " />
        </span>
    )
}

export default Avatar;