import React from 'react'

const ProblemDetails = ({problem}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{problem.title}</h2>
      <p className="text-gray-600">Difficulty: {problem.difficulty}</p>
      <p className="text-gray-600">Points: {problem.points}</p>
    </div>
  )
}

export default ProblemDetails
