import React from 'react'

const Total = ({ course }) => {
    const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return (
        <p>
            <b>Number of exercises {total}</b>
        </p>
    )
}

export default Total