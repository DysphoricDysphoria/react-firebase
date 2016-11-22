import React, { Component, PropTypes } from 'react'
import { connect } from '../../src'
import { getSandBoxedPath } from '../common'

const usersPath = getSandBoxedPath('complex/users')

class AddUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
    }
  }

  onChange(event) {
    const { name, value } = event.target

    this.setState({
      [name]: value,
    })
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.addUser(this.state.name)
  }

  render() {
    const { name } = this.state

    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <input name="name" value={name} onChange={event => this.onChange(event)} />
        <button type="submit" disabled={!name}>Add user</button>
      </form>
    )
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
}

const mapDatabaseToProps = database => ({
  addUser: name => database.ref(usersPath).push({ name }),
})

export default connect(null, mapDatabaseToProps)(AddUser)
