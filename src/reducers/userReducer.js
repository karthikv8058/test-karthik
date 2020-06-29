import produce from "immer";
import { 
  ADD_USER,
  ADD_USER_PIC,
  ADD_USER_ADDRESS,
  UPDATE_INTERESTS,
 } from "../actions/constants";

const initialState = { 
  min:19,
  step:10,
  max:49,

  ageVal:19,
  fname:'',
  lname:'',
  age:0,
  email:'',
  tel:'',
  address:'',
  interests:[],

  addressHome1:'',
  addressHome2:'',
  addressCompany1:'',
  addressCompany2:'',
  states:'',
  country:'',
  
  imagePreviewUrl:'',
  file:'',

  isFileUpload:false,
  isSubscribe:false,

};


/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_USER:
  
      console.log('action.params',action.params);
        
          draft.fname=action.params.fname;
          draft.lname=action.params.lname;
          draft.age=action.params.age;
          draft.email=action.params.email;
          draft.tel=action.params.tel;
          draft.address=action.params.address;
          draft.addressHome1=action.params.addressHome1;
          draft.addressHome2=action.params.addressHome2;
          draft.addressCompany1=action.params.addressCompany1;
          draft.addressCompany2=action.params.addressCompany2;
          draft.states=action.params.states;
          draft.country=action.params.country;
          draft.imagePreviewUrl=action.params.imagePreviewUrl;
          draft.isFileUpload=action.params.isFileUpload;
          draft.file=action.params.file;
          draft.interests=action.params.interests;
          draft.ageVal=action.params.ageVal;
          draft.isSubscribe=action.params.isSubscribe;
          
        break;
      case ADD_USER_PIC:
          console.log('ADD_USER_PIC reducer values :',action.params);
          draft.imagePreviewUrl=action.params.imagePreviewUrl;
          draft.isFileUpload=action.params.isFileUpload;
          draft.file=action.params.file;
        break;
    }
  });

export default userReducer;