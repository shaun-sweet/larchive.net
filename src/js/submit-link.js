import React from 'react';
import {render} from 'react-dom';
var Dropdown = require('react-input-datalist');
var graph = require('fb-react-sdk');
var _ = require('underscore');
var listItems = ['shaun', 'sweet', 'athena'];
graph.setAccessToken($('#secret').attr("fbToken"));
class LinkSubmitForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        _csrf: $('#secret').attr("value")
      },
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

  _handleInputChange(e){
    var key = e.target.name;
    var value = e.target.value;
    var newState = _.extend(this.state.formData, {[key]: value});
    this.setState({formData: newState});
  }

  _serializeForm(){
    var result = "";
    var value;
    for (var attr in this.state.formData) {
      // skip the friends key
      if (attr == "friends") {
        continue;
      }
      if (attr == "recipient") {
        for (var i = 0; i < this.state.friends.length; i++) {
          if (this.state.friends[i].name == this.state.formData[attr]) {
            value = encodeURI(this.state.friends[i].id);
            result += attr +"="+ value +"&"
          }
        }
        break;
      }
      value = encodeURI(this.state.formData[attr]);
      result += attr +"="+ value +"&"
    }
    return result.slice(0, -1);
  }

  _submitForm(){

    $.ajax({
      type: "POST",
      url: '/link',
      data: this._serializeForm(),
    })
    .done((res)=> {
      console.log(res);
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} id="new-link-form" className="container">
        <input type='hidden' name="_csrf" value={this.state.formData._csrf} />
        <div className='form-group'>
          <label htmlFor="url"> Link URL </label>
          <input onChange={this._handleInputChange.bind(this)} className='form-control' type='text' placeholder="Link URL" name='url' id='url' />
        </div>
        <div className='form-group'>
          <label htmlFor="name"> Link display name </label>
          <input onChange={this._handleInputChange.bind(this)} className='form-control' type='text' placeholder="Link name" name='name' id='name' />
        </div>
        <div className='form-group'>
          <label htmlFor="subject"> Short URL description or message for your friend </label>
          <textarea onChange={this._handleInputChange.bind(this)} className='form-control' type='textarea' placeholder="Description of link content" name='subject' id='subject' />
        </div>
        <div>
          <input className='form-control' type='text' placeholder="Send to?" list='friends' name='recipient' onChange={this._handleInputChange.bind(this)} />
          <datalist id='friends' name='recipient'>
            {this.state.friends.map(function(friend, index) {
              return <option  value={friend.name} key={friend.id} />
            })}
          </datalist>
        </div>
        <input onClick={this._submitForm.bind(this)} type="submit" value="Submit" />
      </form>
    );
  }

}

render(<LinkSubmitForm/>, document.getElementById('sweet'));
