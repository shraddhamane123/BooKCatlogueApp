import {useState} from "react";
import { useParams } from "react-router";
import "./style.css";
import axios_obj from '../utils/axios';
import { MDBBtn,MDBIcon, MDBCard, MDBCardBody,  MDBCol, MDBContainer, MDBValidation, MDBValidationItem, MDBInput, MDBRow, 
    MDBModal,MDBModalDialog,MDBTypography,MDBModalContent,MDBModalHeader,MDBModalBody,MDBModalFooter } from "mdb-react-ui-kit";
import { useEffect } from "react";

    const AddBookFrm=()=>{
    const {id}=useParams();
    const [flg,setFlg]=useState(1)
    //console.log(id===undefined)
    const btnTitle=id?"Edit Book": "Add Book";
    const msg=id?"Details Updated Successfully": "Details Added Successfully";
    const title=id?"Edit Book details":"Add Book details";
    const [onSuccess, setOnSuccess]=useState(false);

      const [formValue, setFormValue] = useState({
          title: "",
          author: "",
          language:"",
          country: "",
          year:"",
          pages:"",
          link:"" 
        });

      const addBook=()=>
      { 
          axios_obj.post("", {formValue})
          .then((response) => {
            if(response.status==200)
            {
                setFormValue({ title: "",
                author: "",
                language:"",
                country: "",
                year:"",
                pages:"",
                link:"" });
                setOnSuccess(true);
            }
        
          });
          setOnSuccess(true);
         
      }

      
      const editBook=()=>
      { 
          axios_obj.put(id, {formValue})
          .then((response) => {
            if(response.status==200)
            {
                setFormValue({ title: "",
                author: "",
                language:"",
                country: "",
                year:"",
                pages:"",
                link:"" });
                setOnSuccess(true);
            }
            //console.log(response)
        
          });
          
      }


      

      useEffect(()=>
      {
          if(id)
         { 
            axios_obj.get("").then((response) => {
           
                const res=response.data.data.filter((item)=>
                {
                  return item.id==id;
                 
                })
                setFormValue(res[0])
                console.log(formValue)
          });
        }
        
      },[])
      
      
      
        const onChange = (e) => {
          setFormValue({ ...formValue, [e.target.name]: e.target.value });
        };
    return(
        <>
        <MDBContainer style={{textAlign:"center"}} style={{maxWidth:"600px"}}>
        <MDBRow className="justify-content-center align-items-center">
      
        <MDBCol>
          <MDBCard className="my-4 shadow-3" >
            <MDBRow className="g-0">
                <MDBCardBody className="p-md-2 ">
                  <MDBTypography tag="h3" style={{textAlign:"center", lineHeight:"2"}}>{title}</MDBTypography>
                  <MDBValidation>
                  <MDBRow>
                    <MDBCol  className="mb-4">
                    <MDBValidationItem  feedback="*Reqiured" invalid>
                      <MDBInput label="Title" type="text" size="lg"  name="title"  value={formValue.title} onChange={onChange} required/>
                    </MDBValidationItem>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol  className="mb-4">
                    <MDBValidationItem  feedback="*Reqiured" invalid>
                      <MDBInput label="Author" type="text" size="lg" name="author"  value={formValue.author} onChange={onChange} required/>
                    </MDBValidationItem>
                    </MDBCol>
                   </MDBRow>

                   <MDBRow>
                    <MDBCol  className="mb-4">
                    <MDBValidationItem  feedback="*Reqiured" invalid>
                      <MDBInput label="Language" type="text" size="lg" name="language" value={formValue.language} onChange={onChange} required/>
                    </MDBValidationItem>
                    </MDBCol>
                   </MDBRow>
                 
                  <MDBRow>
                    <MDBCol md="6" className="mb-4">
                      <MDBInput label="Country" type="text" size="lg" name="country" value={formValue.country} onChange={onChange} />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4">
                      <MDBInput label="Year" type="text" size="lg" name="year" value={formValue.year} onChange={onChange}/>
                    </MDBCol>
                  </MDBRow>

                  <MDBInput label="Page" type="text" className="mb-4" size="lg" name="pages" value={formValue.pages} onChange={onChange}/>

                  <MDBInput label="Link" type="text" className="mb-4" size="lg" name="link" value={formValue.link} onChange={onChange}/>
                
                  <MDBRow className="g-0">
                      <MDBBtn size="lg" style={{backgroundColor: "#1f1f61"}} onClick={()=>{
                       if( formValue.title && formValue.author && formValue.language && !id){
                          
                           addBook();
                       }
                       else if( formValue.title && formValue.author && formValue.language && id)
                       {
                         editBook();
                       }
                    }}>{btnTitle}</MDBBtn>
                 </MDBRow>
                 </MDBValidation>

                </MDBCardBody>
             
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>

   
    <MDBModal show={onSuccess}  tabIndex='-1'>
    <MDBModalDialog>
        <MDBModalContent>
        <MDBModalHeader>
    
            <MDBBtn className='btn-close' color='none' onClick={()=>{setOnSuccess(false)}}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody><MDBIcon fas icon="check-circle" style={{fontSize:"larger", color:"green"}} /> &nbsp; <b>{msg}</b></MDBModalBody>

        <MDBModalFooter>
            <MDBBtn color='secondary' onClick={()=>{setOnSuccess(false)}}>
            Close
            </MDBBtn>
            
        </MDBModalFooter>
        </MDBModalContent>
    </MDBModalDialog>
    </MDBModal>
    </MDBContainer>
</>
    )
}
export default AddBookFrm;