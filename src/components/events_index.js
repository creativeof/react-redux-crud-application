import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { readEvents } from '../actions'

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents()
  }

  renderEvents() {
    // this.props.events
    // {
    //   1: {"id":1,"title":"Let's have an event 1!","body":"This is the body for event 1."},
    //   2: {"id":2,"title":"Let's have an event 2!","body":"This is the body for event 2."}
    // }
    return _.map(this.props.events, event => (
      <tr key={event.id} >
        <td>{event.id}</td>
        <td>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEvents()}
          </tbody>
        </table>

        <Link to="/events/new">New Event</Link>
      </React.Fragment>
    )
  }
}

// stateをpropsのeventsに設定
const mapStateToProps = state => ({ events: state.events })

// propsとeventをマッピング
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
