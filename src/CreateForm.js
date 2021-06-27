import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { create } from './store';


class CreateForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }
  validate(item){
    if (item.length < 1 || item.length > 15){
      alert ('ERROR: Item to be added must be between 1 and 15 characters');
      document.querySelector('#item').focus()
    } else {
       this.props.create(item);
      }
  }
  render(){
    const { name } = this.state;
    return (
      <form>
        <input id='item' value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <button onClick={()=> this.validate(this.state.name)}>Create</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    create: (name)=> {
      dispatch(create(name) );
    }
  };
}

export default connect(null, mapDispatchToProps)(CreateForm);

//<button onClick={()=> this.props.create(this.state.name)}>Create</button>
//<button onClick={()=> this.validate(this.state.name)}>Create</button>

