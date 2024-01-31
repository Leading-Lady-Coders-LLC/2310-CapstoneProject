import React , { useState} from 'react';
import { TextField, Button, Container, Accordion, Typography, AccordionSummary, Box, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams  } from 'react-router-dom';

const Contact = ({user}) => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [cakeDetails, setCakeDetails] = useState("")
    const navigate = useNavigate();
 
  //   //get the Cake Request id from url
  // const { id } = useParams();

  //   const cakeRequest = CRequest?.find((request) => {
  //     return request.id === id;
  //   });
    const handleCakeRequest = async (event) => {
        event.preventDefault();
        const makeCakeRequest = {
          user_id: user.id,  
          fullName,
          email,
          phone,
          cakeDetails
        }
// //  is admin to update Cake in db once order is complete
//     const updateCakeRequest = async (editCRequest, setCRequest) => {
//           await api.updateRequest(editCRequest, setCRequest);
//       }   
// // creates cake request 
//     const createCakeRequest = async (newRequest, setnewRequest) => {
//       await api.addCakeRequest(newRequest, setnewRequest);
//     }
    // CRequest ? updateCakeRequest(editCRequest, setCRequest) : createCakeRequest(newRequest, setnewRequest);


      navigate("/thankyou?sentFrom=Contact");
  }


    return(
 <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} maxWidth="xl">
    <Typography variant="h3" align="center" sx={{ m: 4 }} >
       Contact Me
     <Typography variant="h5" align="center" sx={{ m: 2 }} >
       Email: CakeCode@gmail.com
       <br></br>
       Phone: 312-555-CAKE
      </Typography>
      </Typography>
      
      <Accordion  elevation={5} sx={{ mt: 0, mb: 4}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor: 'primary.light'}}
          elevation={5} 
        >
            <Box>
                <Typography variant='h4'>
                  Cake Request Form
                </Typography>
                <Typography variant='h6'>
                    
                </Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
         <form onSubmit={handleCakeRequest}>
      <TextField 
      required
      label="Full Name" 
      fullWidth 
      sx={{mb: 3}}
      />
      <TextField 
      required
      label="Email" 
      fullWidth 
      sx={{mb: 3}}
      />
      <TextField 
      required
      label="Phone" 
      fullWidth 
      sx={{mb: 3}}
      />
      <TextField 
      required
      label="Cake Details " 
      fullWidth multiline
      rows={10} 
      sx={{mb: 3}}
      />
      <Button
      type="submit"
      variant='contained'
      >Submit</Button>
    </form>
        </AccordionDetails>
      </Accordion>
   
   

</Container>
    )

}

export default Contact