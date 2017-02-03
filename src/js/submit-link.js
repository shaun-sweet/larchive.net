import React from 'react';
import {render} from 'react-dom';
var Dropdown = require('react-input-datalist');
var graph = require('fb-react-sdk');
var listItems = ['shaun', 'sweet', 'athena'];
graph.setAccessToken($('#secret').attr("fbToken"));
class LinkSubmitForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      friends: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._getFbFriends();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  _getFbFriends() {
    var that = this;
    graph.get("/me/friends", function(err, res) {
      that.setState({friends: res.data});
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="hidden" name="_csrf" value={$('#secret').attr("value")} />
        <div className='form-group'>
          <label htmlFor="url"> Link URL </label>
          <input className='form-control' type='text' placeholder="Link URL" name='url' id='url' />
        </div>
        <div className='form-group'>
          <label htmlFor="name"> Link display name </label>
          <input className='form-control' type='text' placeholder="Link name" name='name' id='name' />
        </div>
        <div className='form-group'>
          <label htmlFor="subject"> Short URL description or message for your friend </label>
          <textarea className='form-control' type='textarea' placeholder="Description of link content" name='subject' id='subject' />
        </div>
        <div>
          <input className='form-control' type='text' placeholder="Send to?" list='friends' />
          <datalist id='friends' name='recipient'>
            {this.state.friends.map(function(friend, index) {
              return <option value={friend.name} key={index} />
            })}
          </datalist>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

render(<LinkSubmitForm/>, document.getElementById('sweet'));
