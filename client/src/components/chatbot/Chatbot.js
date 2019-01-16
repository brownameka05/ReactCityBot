import React, { Component } from 'react';
import axios from "axios/index";
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';


import Message from './Message';
import Card from './Card';

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.state = {
      messages: []
    };
    if (cookies.get('userID') === undefined){
      cookies.set('userID', uuid(), { path: '/'});
    }
  }


async df_text_query(queryText) {
  let msg;
  let says = {
    speaks: 'me',
    msg: {
      text: {
        text: queryText
      }
    }
  }

  this.setState({messages: [...this.state.messages, says]});

  const res = await axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID')});

  if (res.data.fulfillmentMessages) {
    for (let i =0; i < res.data.fulfillmentMessages.length; i++) {
      msg = res.data.fulfillmentMessages[i];
      says = {
        speaks: 'bot',
        msg: msg
      }
      this.setState({ messages: [...this.state.messages, says]});
    }
  }
};


async df_event_query(eventName) {

  const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')});
  let msg, says = {};

  if (res.data.fulfillmentMessages ) {
    for (let i=0; i<res.data.fulfillmentMessages.length; i++) {
      msg = res.data.fulfillmentMessages[i];
      says = {
        speaks: 'bot',
        msg: msg
      }
      this.setState({ messages: [...this.state.messages, says]});

    }
  }

};


componentDidMount() {
  this.df_event_query('welcome');
}

componentDidUpdate(){
  this.scrollToBottom();
}

_handleInputKeyPress(e) {
  if (e.key === 'Enter') {
    this.df_text_query(e.target.value);
    e.target.value = '';
  }
}

renderCards(cards) {
  return cards.map((card, i) => <Card key={i} payload={card.structValue}/>);
}


renderOneMessage(message, i) {
  if (message.msg && message.msg.text && message.msg.text.text) {
    return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
  } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <button className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</button>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }











renderMessages(returnedMessages) {
  if (returnedMessages) {
    return returnedMessages.map((message, i) => {
      return this.renderOneMessage(message, i);

    })
  } else {
    return null;
  }
}

  render(){
      return (
          <div style={{ height: 500, width: 600, float: 'right'}}>
            <nav>
              <div className="nav-wrapper teal lighten-2">
                <div className='brand-logo'> CITYBOT</div>
              </div>
            </nav>
            <div id="chatbot" style={{ height: 388, width: '100%', overflow: 'auto'}}>
                  {this.renderMessages(this.state.messages)}
                  <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                  </div>
              </div>
              <div className="teal lighten-2">
                <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="Ask me something?:"  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
              </div>

            </div>
      );
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
}

export default Chatbot;
