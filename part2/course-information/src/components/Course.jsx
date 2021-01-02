import React from 'react';
import Header from "./Header";
import Content from "./Content";
import {uid} from 'react-uid';

const Course = (props) => {
    const courses = props.courses.map(courses => (
        <React.Fragment key={uid(courses.name)}>
            <Header key={courses.id} courseHeader={courses.name}/>
            <Content parts={courses.parts}/>
        </React.Fragment>
    ));
    return (
        <>
            {courses}
        </>
    )
}

export default Course;