import { Form } from 'react-bootstrap';
import user from '../../assets/img/user.png'
const Comments = () => {
    return (
        <>
            <div class="d-flex mt-2 ">
                <div class="flex-shrink-0">
                    <img className="rounded-circle" src={user} width="35 " />
                </div>
                <div class="flex-grow-1 ms-3 bg-light px-2 py-1 text-body rounded-3">
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