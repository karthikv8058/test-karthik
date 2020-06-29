import React, { Component,createRef } from 'react';
import { render } from 'react-dom';
import {withRouter} from 'react-router-dom';
import './style.css';
import { connect } from "react-redux";
import Button from '../../Components/Button';
import {
  addUserPic
} from '../../actions/actions';

class Screen3 extends Component {
  constructor() {
    super();
    
    this.nameRef=createRef();
    this.fileUploadRef=createRef();
    this.telRef=createRef();
    this.emailRef=createRef();
    this.statesRef=createRef();
    this.interestsRef=createRef();
    this.ageRef=createRef();

    this.state = {
      imagePreviewUrl:'',
      isFileUpload:false,
      nameSize:0,
      fname:'',
      lname:'',
      ageVal:0,
      ageValText:'',
      ageValTextSize:0,
      email:'',
      emailSize:0,
      tel:'',
      telSize:0,
      states:'',
      statesSize:0,
      interests:[],
      interestsLists:'',
      interestsListsSize:0,
      isSubscribe:false,
      isDisable:true,
    };

    

  }

  UNSAFE_componentWillMount(){
      this.setState({
        imagePreviewUrl:this.props.user.imagePreviewUrl,
        fname:this.props.user.fname,
        lname:this.props.user.lname,
        ageVal:this.props.user.ageVal,
        email:this.props.user.email,
        tel:this.props.user.tel,
        states:this.props.user.states,
        interests:this.props.user.interests,
        isSubscribe:this.props.user.isSubscribe,
      });
      

      if(this.props.user.ageVal>13 && this.props.user.ageVal<=19){
        this.setState({
          ageValText:'above 13 years',
        });
      }else if(this.props.user.ageVal>19 && this.props.user.ageVal<=29){
        this.setState({
          ageValText:'above 20 years',
        });
      }else if(this.props.user.ageVal>29 && this.props.user.ageVal<=45){
        this.setState({
          ageValText:'above 30 years',
        });
      }else {
        this.setState({
          ageValText:'above 45 years',
        });
      }

      if(this.props.user.interests.length>0){
        this.setState({
          interestsLists:this.props.user.interests.toString(),
          interestsListsSize:this.props.user.interests.toString().length,
        })
      }



    }

   
    handleSubmit = (e) =>{
  
      e.preventDefault();

      this.props.history.push('/Screen2');
  
    }

    fileUploadAction = () =>
    this.fileUploadRef.current.click();
    
    fileUploadInputChange = (e) =>{
      
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        isFileUpload:true,
        isPageLoading:false,
      });

      let params = {
        'file':this.state.file,
        'imagePreviewUrl':this.state.imagePreviewUrl,
        'isFileUpload':true,
      }
      this.props.addUserPic(params);
      console.log('imagePreviewUrl:',this.state.file);
      
    }
    reader.readAsDataURL(file);
    
  }

  handleEdit = () => {

    this.setState({
      isDisable:false,
    });

  }

  componentDidMount(){
    this.nameRef.current.value=this.props.user.fname+' '+this.props.user.lname;
    this.telRef.current.value=this.props.user.tel;
    this.ageRef.current.value=this.props.user.ageVal;
    this.emailRef.current.value=this.props.user.email;
    this.statesRef.current.value=this.props.user.states;
    this.interestsRef.current.value=this.props.user.interests;
  }

  

  render() {

    let {
      imagePreviewUrl,
      isFileUpload,
      fname,
      ageVal,
      ageValText,
      states,
      email,
      tel,
      interestsLists,
      isSubscribe,
      isDisable,
        } = this.state;

    let telSize = this.state.tel.length; 
    let nameSize= this.state.fname.length; 
    let emailSize= this.state.email.length; 
    let interestsListsSize= this.state.interestsLists.length;
    let statesSize= this.state.states.length;
    let ageValTextSize=this.state.ageValText.length;
   

    return (
      <div className="container p-5">
        <div className="row text-dark">
          <div className="col-md-4 text-center border-right border-primary">
          <input type="file" hidden ref={this.fileUploadRef} onChange={this.fileUploadInputChange}/>
            <button style={{backgroundImage:`url(${imagePreviewUrl})`}}  className="btn btn-primary btn-upload-photo mx-auto">
            </button>
            <div className="">
              <center>
                <button className="btn btn-link text-theme mt-3 d-block" onClick={this.fileUploadAction}>Edit photo</button>
                <button className="btn btn-link text-theme d-block" onClick={this.handleEdit}>Edit profile</button>
              </center>
            </div>
          </div>
          <div className="col-md-8 mt-5 mt-md-0 profile-text">
            <div>
                <p>
                I am <input type="text" size={nameSize} ref={this.nameRef} className={isDisable?"text-theme-profile":"text-theme-profile border border-primary mb-1"} disabled={isDisable}/> and  I am <input size={ageValTextSize} type="text" ref={this.ageRef} className={isDisable?"text-theme-profile":"text-theme-profile border border-primary mb-1"} disabled={isDisable}/> and you can send your emails to <input size={emailSize} type="text" ref={this.emailRef} className={isDisable?"text-theme-profile":"text-theme-profile border border-primary mb-1"} disabled={isDisable}/>. I lives in the state of <input size={statesSize} type="text" ref={this.statesRef} className={isDisable?"text-theme-profile":"text-theme-profile border border-primary mb-1"} disabled={isDisable}/>. I likes to play <input size={interestsListsSize} type="text" ref={this.interestsRef} className={isDisable?"text-theme-profile":"text-theme-profile border border-primary mb-1"} disabled={isDisable}/>. {isSubscribe&&' And please send me the news letter.'} Please reach out to me on my phone <input size={telSize} type="text" ref={this.telRef} className={isDisable?"text-theme-profile":"text-theme-profile border border-primary mb-1"} disabled={isDisable}/>.
                </p>
            </div>
            <center>
            <Button title="Agree" />
            </center>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user:state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addUserPic:(params)=>
    dispatch(addUserPic(params)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Screen3);
