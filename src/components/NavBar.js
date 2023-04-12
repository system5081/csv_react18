import React from 'react'

import { styled } from '@mui/material/styles';
import {AppBar} from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import LiveTvIcon from '@mui/icons-material/LiveTv';


import { withCookies } from 'react-cookie';

const TitleTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
  }));

const NavBar = (props) => {

    const Logout =()=>{
        props.cookies.remove('jwt-token');
        window.location.href='/';
    };

  return (
    <AppBar position='static'>
    <Toolbar>
      <button className='logo'>
        <LiveTvIcon />
      </button>
      <TitleTypography variant='h5' >movie</TitleTypography>
      <button className='logout' onClick={()=>Logout()}>
        <LogoutIcon />
      </button>
    </Toolbar>
    </AppBar>
  )
}

export default withCookies(NavBar);
