// import {posts} frsom 'data/posts/posts'
// import { useGetPostsQuery } from 'features/posts/posts';
import { getPosts } from 'features/posts/postsSlice';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import VerticalNavbar from './navbar/vertical/VerticalNavbar';
import NewPost from './posts/NewPost';
import Post from './posts/Post';

const Home = () => {
    const { posts } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    console.log('home rendre')
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    if (!posts) {
        return <div>No posts :(</div>
    }
    return (
        <>
            <Row className="py-3">
                <Col className="min-vh-100 sticky-top"
                    xs={{ order: '2', span: 12 }}
                    lg={{ order: '1', span: 3 }}
                    xl={3}>
                    <VerticalNavbar />
                </Col>
                <Col className=""
                    xs={{ order: '1', span: 12 }}
                    lg={{ order: '2', span: 6 }}
                    xl={6} >
                    <div className="overflow-auto px-3">
                        <NewPost />
                        {
                            Array.isArray(posts) && posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                        }
                    </div>
                </Col>
                <Col xs={{ order: '3', span: 12 }} lg={{ order: '3', span: 3 }} xl={3} >
                    <VerticalNavbar />
                </Col>
            </Row>

        </>
    )
}

export default React.memo(Home);