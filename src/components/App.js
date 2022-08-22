import { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { users } = props
    return (
      <>
        <ContactList users={users}/>
      </>
    )
  }
}

export default App