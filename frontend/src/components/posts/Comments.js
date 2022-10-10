import Avatar from 'components/common/Avatar';
const Comments = () => {
    return (
        <>
            <div className="d-flex mt-2 ">
                <div className="flex-shrink-0">
                    <Avatar/>
                </div>
                <div className="flex-grow-1 ms-3 bg-light px-2 py-1 text-body rounded-3">
                    <span className='text-dark'>Mahfoud</span>
                    <div>
                        <p>
                            Quickly manage the layout, alignment, and sizing of grid columns,
                            navigation, components, and more with a full suite of responsive flexbox utilities
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments;