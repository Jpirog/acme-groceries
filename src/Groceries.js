import React from 'react';
import {toggle, createRandom, deleteThis} from "./store";

import { connect } from 'react-redux';

const _Groceries = ({ groceries, view, toggle, create, deleteThis })=> {
  return (
    <div>
      <button key='btn2' onClick={ create }>Create</button>
      <ul>
        {
          groceries.filter(grocery => !view || ( grocery.purchased && view === 'purchased') ||( !grocery.purchased && view === 'needs') ).map( grocery => {
            return (
              <div key={ grocery.id } >
                <li onClick={ ()=> toggle(grocery)} className={ grocery.purchased ? 'purchased': ''}>{ grocery.name } </li> 
                <button key='btn1' onClick={ ()=> deleteThis(grocery)} >-</button>
              </div>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    toggle: (grocery)=> {
      dispatch(toggle(grocery))
    },
    create: ()=>{
      dispatch(createRandom())
    },
    deleteThis: (grocery) => {
      dispatch(deleteThis(grocery))
    }
  };
};



const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;
