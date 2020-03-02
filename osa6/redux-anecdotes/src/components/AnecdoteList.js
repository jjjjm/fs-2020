import React from 'react'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = async (anecdote) => {
        await props.addVoteTo(anecdote)
        await props.setNotification(`you liked ${anecdote.content}`, 5000)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter.length === 0) {
        return { anecdotes: state.anecdotes }
    }
    return {
        anecdotes: state.anecdotes
        .filter(anecdote => 
            anecdote.content.toUpperCase()
            .indexOf(state.filter.toUpperCase()) >= 0)
    }//includes() doesnt work?
}
const mapDispatchToProps = {
    addVoteTo,
    setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList