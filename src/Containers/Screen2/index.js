import React, { Component , createRef } from 'react';
import { render } from 'react-dom';
import Button from '../../Components/Button';
import './style.css';
import ReactSlider from 'react-slider';
import Screen3 from '../Screen3';
import history from '../../history';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {
  addUser,
  addUserPic,
  addUserAddress,
} from '../../actions/actions';

class Screen2 extends Component {
  constructor(props) {
    super(props);

    this.fnameRef=createRef();
    this.lnameRef=createRef();
    this.emailRef=createRef();
    this.telRef=createRef();
    this.stateRef=createRef();
    this.countryRef=createRef();
    this.addressRef=createRef();
    this.interestsRef=createRef();
    this.fileUploadRef=createRef();
    this.subscribeRef=createRef();
    this.home1Ref=createRef();
    this.home2Ref=createRef();
    this.company1Ref=createRef();
    this.company2Ref=createRef();
    this.ageSliderRef=createRef();

    this.state = {
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
      addressHome1:'',
      addressHome2:'',
      addressCompany1:'',
      addressCompany2:'',
      states:'',
      country:'',
      interestsValues:'',

      fnameError:false,
      emailError:false,
      telError:false,
      stateError:false,
      countryError:false,
      addressError:false,
      home1Error:false,
      company1Error:false,

      fnameErrorText:'',
      emailErrorText:'',
      telErrorText:'',
      stateErrorText:'',
      countryErrorText:'',
      addressErrorText:'',
      home1ErrorText:'',
      company1ErrorText:'',

      interests:[],
      imagePreviewUrl:'',
      file:'',

      isFileUpload:false,
      isSubscribe:false,
      isPageLoading:true,
      isInterest:true,

      errorCount:0,
    };
  }

   handleNameOnBlur = () =>{

    let regexname=/^[a-zA-Z]{1,20}$/gm;
    if(this.fnameRef.current.value=='')
      {
        this.setState({
          fnameError:true,
          fnameErrorText:'First Name is required',
          errorCount:this.state.errorCount++,
        });
      }else if(!regexname.test(this.fnameRef.current.value)){
        this.setState({
          fnameError:true,
          fnameErrorText:'Not more than 20 alphabet',
          errorCount:this.state.errorCount++,
        });
        this.fnameRef.current.value='';
      }else{
        this.setState({
          fnameError:false,
          fnameErrorText:'',
        });
      }
      console.log('Error in fn',this.state.errorCount);
      
  }

  handleNameOnChnage = () =>{

    this.setState({
      isPageLoading:false,
    });    

    let regexname=/^[a-zA-Z]{0,20}$/gm;

    if(!regexname.test(this.fnameRef.current.value)){
      this.setState({
        fnameError:true,
        fnameErrorText:'Not more than 20 alphabet',
      });
      this.fnameRef.current.value='';
    }else{
      this.setState({
        fname:this.fnameRef.current.value,
        fnameError:false,
        fnameErrorText:'',
      });
    }

  }

  handleLnameOnChnage = () =>{

    this.setState({
      isPageLoading:false,
    });    

   
      this.setState({
        lname:this.lnameRef.current.value,
      });
 
  }

  handleEmailOnBlur=()=>{

    let regexmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
    if(this.emailRef.current.value=='')
      {
        this.setState({
          emailError:true,
          emailErrorText:'Mail ID is required',
          errorCount:this.state.errorCount++,
        });
      }else if(!regexmail.test(this.emailRef.current.value)){
        this.setState({
          emailError:true,
          emailErrorText:'Invalid Mail ID',
          errorCount:this.state.errorCount++,
        });
        this.emailRef.current.value='';
      }
      else{
        this.setState({
          emailError:false,
          emailErrorText:'',
        });
      }
  }

  handleEmailOnChnage = () =>{

    this.setState({
      isPageLoading:false,
      email:this.emailRef.current.value,
      emailError:false,
      emailErrorText:'',
    });
  
  }

  handleTelOnBlur =()=>{

    let regextel=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/gm;

    if(this.telRef.current.value=='')
      {
        this.setState({
          telError:true,
          telErrorText:'Phone Number is required',
          errorCount:this.state.errorCount++,
        });
      }else if(!regextel.test(this.telRef.current.value)){
        this.setState({
          telError:true,
          telErrorText:'Invalid Phone Number',
          errorCount:this.state.errorCount++,
        });
        this.telRef.current.value='';
      }
      else{
        this.setState({
          telError:false,
          telErrorText:'',
        });
      }
  }

  handleTelOnChnage = () =>{

    this.setState({
      isPageLoading:false,
      tel:this.telRef.current.value,
      telError:false,
      telErrorText:'',
    });

  }

  handleAddressOnChnage = () =>{
    this.setState({
      isPageLoading:false,
      address:this.addressRef.current.value,
    });
    if(this.addressRef.current.value==''){
      this.setState({
        addressError:true,
        addressErrorText:'Address is required',
      });
    } else if(this.addressRef.current.value=='Home'){
      this.handleHome1OnBlur();
      this.handleHome1OnChange();
      this.handleHome2OnChange();
      this.setState({
        addressError:false,
        addressErrorText:'',
      });
    }else{
      this.handleCompany1OnBlur();
      this.handleCompany1OnChange();
      this.handleCompany2OnChange();
      
    } 
    
  }

  handleHome1OnBlur = () => {
    
    if(this.home1Ref.current.value==''){
      this.setState({
        home1Error:true,
        home1ErrorText:'This field is required',
      });
    } else {
      this.setState({
        addressHome1:this.home1Ref.current.value,
        home1Error:false,
        home1ErrorText:'',
      })
    }
  }

  handleHome1OnChange = () => {

    this.setState({
      isPageLoading:false,
      addressHome1:this.home1Ref.current.value,
      home1Error:false,
      home1ErrorText:'',
    });
  }

  handleHome2OnChange = () => {

    console.log('handleHome2OnChange');
    
    this.setState({
      isPageLoading:false,
      addressHome2:this.home2Ref.current.value,
    });
  }

  // ************************Company******************************

  handleCompany1OnBlur = () => {
    if(this.company1Ref.current.value==''){
      this.setState({
        company1Error:true,
        company1ErrorText:'This field is required',
      });
    } else {
      this.setState({
        addressCompany1:this.company1Ref.current.value,
        company1Error:false,
        company1ErrorText:'',
      })
    }
  }

  handleCompany1OnChange = () => {

    this.setState({
      isPageLoading:false,
      addressCompany1:this.company1Ref.current.value,
      compay1Error:false,
      compay1ErrorText:'',
    });
  }

  handleCompany2OnChange = () => {

    this.setState({
      isPageLoading:false,
      addressCompany2:this.company2Ref.current.value,
    });
  }

  // ******************************************************
  

  handleCountryOnChnage = () =>{

    if(this.countryRef.current.value==''){
      this.setState({
        countryError:true,
        countryErrorText:'Country is required',
      });
    }else{
      this.setState({
        countryError:false,
        countryErrorText:'',
        country:this.countryRef.current.value,
      });
    }
    
    
  }

  handleStateOnChnage = () =>{

    if(this.stateRef.current.value==''){
      this.setState({
        stateError:true,
        stateErrorText:'State is required',

      });
    }else{
      this.setState({
        stateError:false,
        stateErrorText:'',
        states:this.stateRef.current.value,
      });
    }
    console.log('states:',this.state.states);
  }

  handleOnAgeChnage = (values) =>{
    console.log('changed',values);
    this.setState({
      ageVal:values,
    })
  }

  handleInterestsonKeyUp = (e) =>{

    this.setState({
      isPageLoading:false,
    });

    const interests=this.state.interests;


    console.log('Key',e.key);
    console.log('interests in keypress',interests);

    if(e.key===','){
      this.interestsRef.current.value.split(",").map((item) =>  
        {
          if(interests.find(interest=>interest.toLowerCase()===item.toLowerCase()) || item==''){

          }
          else{
            interests.push(item);
            
          } 
        }
        );
        this.setState({
          interests
        });
    }
  }

  removeInterest = (i) =>{

    
    const interests=this.state.interests;

    console.log('Interests:',interests);
    console.log('Interests lists:',interests.toString());
    
    interests.splice(i,1);
    this.setState({
      interests,
      isInterest:true,
    });

    this.interestsRef.current.value=interests.toString();
  }
  
  
  Thumb = (props, state) => {

    return <div className="d-block" {...props}>
      {state.valueNow<20&&state.valueNow>13&&'13-19'}
      {state.valueNow<30&&state.valueNow>20&&'20-29'}
      {state.valueNow<45&&state.valueNow>30&&'30-45'}
      {state.valueNow>40&&'45 & Above'}

    </div>;
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

    
    
   }
  reader.readAsDataURL(file);

  }

  handleCheckBox = () =>{
    console.log('checked');
    
    this.setState({
      isSubscribe:!this.state.isSubscribe,
    })
  }

  handleSubmit = (e) =>{
  

    e.preventDefault();

    this.handleNameOnBlur();
    this.handleEmailOnBlur();
    this.handleTelOnBlur();
    this.handleAddressOnChnage();
    this.handleStateOnChnage();
    this.handleCountryOnChnage();

    if(this.state.errorCount==0){

      
      
      if(this.state.interests.length==0){
        this.setState({
          interests:this.state.interests.concat(this.props.user.interests)
        });

        console.log('Interests props values in submit:',this.props.user.interests);
        console.log('Interests state values in submit:',this.state.interests);
      }

      this.props.history.push('/Screen3');
     
      this.props.addUser(this.state);

      this.setState({
        isPageLoading:true,
      });
    }else{
      console.log('Errors in page',this.errorCount);
      this.setState({
        errorCount:0,
      });
    }

  }

  UNSAFE_componentWillMount(){
      this.setState({
        imagePreviewUrl:this.props.user.imagePreviewUrl,
        file:this.props.user.file,
        fname:this.props.user.fname,
        lname:this.props.user.lname,
        email:this.props.user.email,
        tel:this.props.user.tel,
        country:this.props.user.country,
        states:this.props.user.states,
        address:this.props.user.address,
        addressHome1:this.props.user.addressHome1,
        addressHome2:this.props.user.addressHome2,
        addressCompany1:this.props.user.addressCompany1,
        addressCompany2:this.props.user.addressCompany2,
        ageVal:this.props.user.ageVal,
        isSubscribe:this.props.user.isSubscribe,
        //interests:[...this.state.interests,this.props.user.interests],
      });

      console.log('imagePreviewUrl:',this.state.file);
     
    }

    componentDidMount(){

      this.interestsRef.current.value=this.props.user.interests.toString();
      this.ageSliderRef.current.value=this.props.user.ageVal;
      
      if(this.props.user.isSubscribe){
        this.subscribeRef.current.checked=true;
      }

      //console.log('Interests values :',this.props.user.interests);

    }

    componentWillReceiveProps(nextProps){
      console.log('componentWillReceiveProps',nextProps);
      
    }

  render() {

    let {
      fnameError,
      emailError,
      telError,
      stateError,
      countryError,
      addressError,
      home1Error,
      company1Error,
      fnameErrorText,
      emailErrorText,
      telErrorText,
      stateErrorText,
      countryErrorText,
      addressErrorText,
      home1ErrorText,
      company1ErrorText,
      interestsValues,
    }=this.state;

    let {
      fname,
      address,
      addressHome1,
      addressHome2,
      addressCompany1,
      addressCompany2,
      lname,
      email,
      states,
      country,
      tel,
      fileUploadState,
      imagePreviewUrl,
      file,
      isFileUpload,
      isSubscribe,
      interests,
      ageVal,
    }= this.state.isPageLoading?this.props.user:this.state;

    console.log('Reducer image on screen2 :',this.props.user.file);
    
    //interestsValues = this.state.isInterest?interests.toString():this.state.interestsValues    //console.log('interests in screen2 :',this.props.user.interests);
    
    
    return (
      <div className="container p-5">
        <div className="row text-dark">
          <div className="col-md-4 text-center border-right border-primary">
          <input type="file" hidden ref={this.fileUploadRef} onChange={this.fileUploadInputChange}/>
            <button style={{backgroundImage:`url(${imagePreviewUrl})`}} onClick={this.fileUploadAction} className="btn btn-primary btn-upload-photo mx-auto">
              {isFileUpload?'Change':'Upload'} <br/>
              Your Photo
            </button>
          </div>
          <div className="col-md-8 mt-5 mt-md-0">
            <div>
                <form className="">
                  <div className="form-group row mb-3">
                      <div className="col-3 text-right">
                          <span>Name</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                            <input type="text" placeholder="First Name" 
                            onBlur={this.handleNameOnBlur} 
                            onChange={this.handleNameOnChnage} 
                            ref={this.fnameRef} 
                            value={fname}
                            className=" px-3 text-input-form"/>
                            <input 
                            type="text" 
                            value={lname}
                            ref={this.lnameRef}
                            onChange={this.handleLnameOnChnage} 
                            placeholder="Last Name" 
                            className="ml-0 ml-xl-3 mt-3 mt-xl-0 px-3 text-input-form"/>
                            <span className="text-danger">
                              {fnameError&&fnameErrorText}
                            </span>
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-5">
                      <div className="col-3 text-right">
                          <span>Age</span>
                      </div>
                      <div className="col-9">
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            min={this.state.min}
                            max={this.state.max}
                            step={this.state.step}
                            ref={this.ageSliderRef}
                            onChange={(values)=>{this.handleOnAgeChnage(values)}}
                            renderThumb={this.Thumb}
                        />
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-5">
                      <div className="col-3 text-right">
                          <span>Email</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                            <input type="text" placeholder="Email" 
                            onBlur={this.handleEmailOnBlur} 
                            onChange={this.handleEmailOnChnage}
                            value={email} 
                            ref={this.emailRef}
                            className=" px-3 text-input-form w-100"/>
                            <span className="text-danger">
                              {emailError&&emailErrorText}
                            </span>
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-4">
                      <div className="col-3 text-right">
                          <span>Tel</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                            <input type="text" placeholder="Tele" 
                            onBlur={this.handleTelOnBlur} 
                            onChange={this.handleTelOnChnage} 
                            ref={this.telRef}
                            value={tel} 
                            className=" px-3 text-input-form w-100"/>
                            <span className="text-danger">
                              {telError&&telErrorText}
                            </span>
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-4">
                      <div className="col-3 text-right">
                          <span>State</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                            <select  
                            onChange={this.handleStateOnChnage} 
                            ref={this.stateRef} 
                            className=" px-3 text-input-form w-100">
                              <option value="">Select State</option>
                              <option value="Alaska" selected={states=='Alaska'&&'selected'}>Alaska</option>
                              </select>
                            <span className="text-danger">
                              {stateError&&stateErrorText}
                            </span>
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-4">
                      <div className="col-3 text-right">
                          <span>Country</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                            <select  
                            onChange={this.handleCountryOnChnage} 
                            ref={this.countryRef} 
                            className=" px-3 text-input-form w-100">
                              <option value="">Select Country</option>
                              <option value="United States" selected={country=='United States'&&'selected'}>United States</option>
                              </select>
                            <span className="text-danger">
                              {countryError&&countryErrorText}
                            </span>
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-4">
                      <div className="col-3 text-right">
                          <span>Address</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                            <select  
                            onChange={this.handleAddressOnChnage} 
                            ref={this.addressRef} 
                            className=" px-3 text-input-form w-100 mb-3">
                              <option value="">Select Address</option>
                              <option value="Home" selected={country=='Home'&&'selected'}>Home</option>
                              <option value="Company" selected={country=='Company'&&'selected'}>Company</option>
                              </select>
                            
                            <div className={address=='Home'?'d-block':'d-none'}>
                            <input 
                              type="text" 
                              ref={this.home1Ref} 
                              onBlur={this.handleHome1OnBlur}
                              onChange={this.handleHome1OnChange}
                              value={addressHome1}
                              placeholder="Address 1" 
                              className=" px-3 text-input-form"/>
                            <input 
                            type="text"
                            ref={this.home2Ref}
                            onChange={this.handleHome2OnChange} 
                            placeholder="Address 2" 
                            value={addressHome2}
                            className="ml-0 ml-xl-3 mt-3 mt-xl-0 px-3 text-input-form"/>
                             <span className="text-danger">
                              {home1Error&&home1ErrorText}
                            </span>
                            </div>
                           
                            <div className={address=='Company'?'d-block':'d-none'}>
                            <input 
                              type="text"
                              ref={this.company1Ref}
                              onBlur={this.handleCompany1OnBlur}
                              onChange={this.handleCompany1OnChange}
                              value={addressCompany1} 
                              placeholder="Company Address 1" 
                              className=" px-3 text-input-form"/>
                            <input 
                            type="text"
                            ref={this.company2Ref}
                            onChange={this.handleCompany2OnChange}
                            value={addressCompany2} 
                            placeholder="Company Address 2" 
                            className="ml-0 ml-xl-3 mt-3 mt-xl-0 px-3 text-input-form"/>
                             <span className="text-danger">
                              {company1Error&&company1ErrorText}
                            </span>
                            </div>
                           

                            <span className="text-danger">
                              {/* {fnameError&&fnameErrorText} */}
                            </span>
                            <span className="text-danger">
                              {addressError&&addressErrorText}
                            </span>
                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-4">
                      <div className="col-3 text-right">
                          <span>Interests</span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                      <input type="text" placeholder="Type interests seperated by comma" 
                            // onBlur={this.handleInterestsOnBlur} 
                            onKeyUp={(e)=>this.handleInterestsonKeyUp(e)} 
                            ref={this.interestsRef}
                            // value={interestsValues}
                            className=" px-3 text-input-form w-100"/>

                            <ul className="list-unstyled mt-3">
                              {interests.map((item,index)=>
                                <li key={index} className="bg-theme py-1 pl-2 pr-5 text-white list-inline-item relative">{item}
                                  <button onClick={()=>this.removeInterest(index)} className="btn bg-theme text-white tag-item-close p-0">X</button>
                                </li>
                              )}
                            </ul>
                            <span className="text-danger">
                              
                            </span>

                      </div>
                  </div>
                  <div className="form-group row mb-3 mt-4">
                      <div className="col-3 text-right">
                          <span className="pt-1">
                          <label class="containercheckbox text-right">
                            <input type="checkbox" className="bg-theme" onChange={this.handleCheckBox} ref={this.subscribeRef}/>
                            <span class="checkmark"></span>
                            </label>
                          </span>
                      </div>
                      <div className="col-9 mt-3 mt-sm-0">
                          <span className="d-block mb-3">Subscribe to the news letter</span>
                          <div className="text-right">
                            <Button  handleButtonClick={(e)=>this.handleSubmit(e)} title="Submit" />
                          </div>
                      </div>
                  </div>
                </form>
            </div>
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
    addUser:(params)=>
    dispatch(addUser(params)),
    addUserPic:(params)=>
    dispatch(addUserPic(params)),
    addUserAddress:(params)=>
    dispatch(addUserAddress(params)),
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Screen2);

