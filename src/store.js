import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

const groceriesReducer = (state=[], action) => {
  if(action.type === 'LOAD'){
    state = action.groceries;
  }
  if(action.type === 'UPDATE'){
    state = state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if(action.type === 'DELETE'){
    state = state.filter(grocery => grocery.id !== action.grocery.id);
  }
  if(action.type === 'CREATE'){
    state = [...state, action.grocery ];
  }
  return state;
}

const viewReducer = (state = '', action) => {
  if (action.type === 'SET_VIEW'){
    return action.view
  }
  return state;
}

const reducer = combineReducers({
  view: viewReducer,
  groceries: groceriesReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export const updateGrocery = (grocery)=> {
  return {
    type: 'UPDATE',
    grocery
  };
};

const toggle = (grocery)=>{
  return async (dispatch) => {
      const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
      dispatch(updateGrocery(updated));
    }
  };

export const createGrocery = (grocery)=> {
  return {
    type: 'CREATE',
    grocery
  };
};
  
const createRandom = () => {
  return async (dispatch) => {
      const grocery = (await axios.post('/api/groceries/random')).data;
      dispatch(createGrocery(grocery));
  } 
}
  
const create = (name) => {
  return async (dispatch) => {
    const existing = await axios.get(`/api/groceries/${ name }`)
    if (existing.data.length === 0){
      const grocery = (await axios.post('/api/groceries', { name })).data;
      dispatch(createGrocery(grocery));
    } else {
        alert (`Error - ${name} is already on your shopping list`)
    }
  } 
}

export const deleteGrocery = (grocery)=> {
  return {
    type: 'DELETE',
    grocery
  };
};

const deleteThis = (grocery)=>{
  return async (dispatch) => {
      const deleted = (await axios.delete(`/api/groceries/${grocery.id}`)).data;
      dispatch(deleteGrocery(grocery));
    }
  };

export {createRandom, toggle, create, deleteThis};
