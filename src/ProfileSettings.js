import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { Box, Button, Card, Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PasswordDialog from "./PasswordDialog";


const ProfileSettings = ({user, setUser}) => {
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [userName, setUserName] = useState(user.username);
    const [addressLine1, setAddressLine1] = useState(user.address_line1 || '');
    const [addressLine2, setAddressLine2] = useState(user.address_line2 || '');
    const [city, setCity] = useState(user.city || '');
    const [state, setState] = useState(user.state || '');
    const [zipCode, setZipCode] = useState(user.zip_code || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [displayField, setDisplayField] = useState(true);
    const [displayAddress, setDisplayAddress] = useState(true);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    const navigate = useNavigate();

    const formatNumber = (phone) => {
      const strPhone = phone.toString()
      return `(${strPhone.slice(0, 3)})${strPhone.slice(3, 6)}-${strPhone.slice(6)}`
    }

    const handleUserUpdate = async (event) => {
        event.preventDefault();
        const updatedUserInfo = {
          user_id: user.id,  
          firstName,
          lastName,
          userName,
          is_admin: user.is_admin,
          is_vip: user.is_vip
        }

        const updateUser = async (updatedUserInfo,setUser)=>{
            await api.updateProfile(updatedUserInfo,setUser);
        }
        updateUser(updatedUserInfo,setUser);
        setDisplayField(true);
        navigate("/user-profile_mui")
      };

      const handleAddressUpdate = async (event) => {
        event.preventDefault();
        const updatedUserAddress = {
          user_id: user.id,  
          address_line1:addressLine1,
          address_line2:addressLine2 ,
          city,
          state,
          zip_code:zipCode,
          phone
        }

        const changeAddress = async (updatedUserAddress,setUser)=>{
            await api.updateAddress(updatedUserAddress,setUser);
        }
        changeAddress(updatedUserAddress,setUser);
        setDisplayAddress(true);
        navigate("/user-profile_mui")
      };

      const profileUserInfo = () => {
        return (
          <Box sx={{ flexGrow: 1, p:"1rem" }}>
            <Typography variant="h5">
              Customer Information
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`First Name: ${user.firstname}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`Last Name: ${user.lastname}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={`Username/Email: ${user.username}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                {
                  user.is_vip? (
                    <ListItemButton>
                      <StarIcon sx={{ color: 'accentYellow.main' }} />
                      <ListItemText primary="Thank you for being a VIP member!" sx={{ textAlign: 'center' }} />
                      <StarIcon sx={{ color: 'accentYellow.main' }} />
                    </ListItemButton>
                  ) : (
                    <ListItemButton>
                      <ListItemText primary="Please contact the store to become a VIP member." />
                    </ListItemButton>
                  )
                }
              </ListItem>
              <Button variant="contained" onClick={()=>setDisplayField(false)}>Edit</Button>
              <Button variant="text" sx={{fontWeight:700, float:"right", color: "primary.dark" }} onClick={()=>{setShowPasswordDialog(true)}}>Change Password</Button>
              <PasswordDialog open={showPasswordDialog} handleClose={()=>{setShowPasswordDialog(false)}} userId={user.id}/>
            </List>
          </Box>
        )
      }

      const updateUserInfo = () => {
        return (
          <Box sx={{ flexGrow: 1, p:"1rem" }}>
            <Typography variant="h5">
              Edit Information
            </Typography>
            <Box component="form" onSubmit={handleUserUpdate}>
              <TextField
                name="firstname"
                required                
                id="firstname"
                label="First Name"
                autoComplete="none"
                inputProps={{ minLength: 3, maxLength: 12 }}
                value={firstName}
                autoFocus
                onChange={(e)=>{setFirstName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="lastname"
                required                
                id="lastname"
                label="Last Name"
                autoComplete="none"
                inputProps={{ minLength: 3, maxLength: 12 }}
                value={lastName}
                autoFocus
                onChange={(e)=>{setLastName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="username"
                required
                id="username"
                label="Username/Email"
                autoComplete="none"
                inputProps={{ minLength: 6, maxLength: 25 }}
                value={userName}
                autoFocus
                onChange={(e)=>{setUserName(e.target.value)}}
                sx={{ m: 1 }}
              />
              <Button type="submit" variant="contained">Update</Button>
            </Box>
          </Box>
        )
      }

      const profileUserAddress = () => {
        return (
          <Box sx={{ flexGrow: 1, p:"1rem", maxWidth: "50%" }}>
            <Typography variant="h5">
              Customer Address & Phone
            </Typography>
            {
              addressLine1 && city && state && zipCode ? (
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${addressLine1}`} />
                    </ListItemButton>
                  </ListItem>
                  {
                    addressLine2 && (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={`${addressLine2}`} />
                        </ListItemButton>
                      </ListItem>
                    )
                  }
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`${city}, ${state} ${zipCode}`} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={`Phone: ${formatNumber(phone)}`} />
                    </ListItemButton>
                  </ListItem>
                </List>
              ) : (
                <Card sx={{ mt: "1rem", mb: "1rem", p: "1rem" }} >
                  <Typography>
                    Address and/or phone are incomplete.  Please click EDIT to update.
                  </Typography>
                </Card>
              )
            }
            <Button variant="contained" onClick={()=>setDisplayAddress(false)}>Edit</Button>
          </Box>
        )
      }

      const updateUserAddress = () => {
        return (
          <Box sx={{ flexGrow: 1, p:"1rem" }}>
            <Typography variant="h5">
              Edit Address & Phone
            </Typography>
            <Box component="form" onSubmit={handleAddressUpdate}>
              <TextField
                name="address1"
                required
                id="address1"
                label="Address Line 1"
                autoComplete="none"
                inputProps={{ minLength: 10, maxLength: 30 }}
                value={addressLine1}
                autoFocus
                onChange={(e)=>{setAddressLine1(e.target.value)}}
                sx={{ m: 1 }}
              />
               <TextField
                name="address2"
                id="address2"
                label="Address Line 2 (optional)"
                autoComplete="none"
                inputProps={{ minLength: 3, maxLength: 30 }}
                value={addressLine2}
                autoFocus
                onChange={(e)=>{setAddressLine2(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="city"
                required
                id="city"
                label="City"
                autoComplete="none"
                inputProps={{ minLength: 3, maxLength: 25 }}
                value={city}
                autoFocus
                onChange={(e)=>{setCity(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="state"
                required
                id="state"
                label="State"
                autoComplete="none"
                inputProps={{ minLength: 2, maxLength: 2 }}
                value={state}
                autoFocus
                onChange={(e)=>{setState(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="zipCode"
                required
                id="zipCode"
                label="Zip Code (5 digits)"
                autoComplete="none"
                inputProps={{ pattern:'^(?:[0-9]{5})$',title:'Please enter a 5 digit zip code' }}
                value={zipCode}
                autoFocus
                onChange={(e)=>{setZipCode(e.target.value)}}
                sx={{ m: 1 }}
              />
              <TextField
                name="phone"
                required
                id="phone"
                label="Phone Number"
                autoComplete="none"
                inputProps={{ pattern:'^(?:[0-9]{10})$',title:'Please enter a 10-digit phone number' }}
                value={phone}
                autoFocus
                onChange={(e)=>{setPhone(e.target.value)}}
                sx={{ m: 1 }}
              />
              <Button type="submit" variant="contained">Update</Button>
            </Box>
          </Box>
        )
      }

return (
    <Box sx={{ display: 'flex', p: 2, justifyContent: "space-evenly" }}>      
        {displayField ? profileUserInfo() : updateUserInfo()}
      <Divider orientation="vertical" variant="middle" flexItem />
        {displayAddress ? profileUserAddress() : updateUserAddress()}
    </Box>
)

}

export default ProfileSettings