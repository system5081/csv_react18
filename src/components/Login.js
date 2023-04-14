import React,{useReducer} from 'react';
import { Avatar } from '@mui/material';
import {Button} from '@mui/material';
//ブラウザの差異を平均化させる
//https://www.wakuwakubank.com/posts/763-react-material-ui/#index_id9
//https://mui.com/material-ui/api/css-baseline/
import {CssBaseline} from '@mui/material';
//
//https://mui.com/material-ui/api/text-field/
import {TextField} from '@mui/material';
//錠のアイコン
//https://mui.com/material-ui/material-icons/?query=lock
//アイコンは下で探す
//https://mui.com/material-ui/material-icons/
import LockIcon from '@mui/icons-material/Lock';
//フォント
//https://mui.com/material-ui/react-typography/
import { Typography } from '@mui/material';



import { styled } from '@mui/material/styles';
// import makeStyles  from '@mui/styles';
//
//https://mui.com/material-ui/api/container/
import { Container } from '@mui/material';
//読み込み中のグルグル
import { CircularProgress } from '@mui/material';

import { Box} from '@mui/material';


import { START_FETCH,FETCH_SUCCESS,ERROR_CATCHED,INPUT_EDIT,TOGGLE_MODE, } from './ActionTypes';
import { withCookies } from 'react-cookie';
import axios from 'axios';

const initialState={
    isLoading:false,
    isLoginView:true,
    error:'',
    credentialsLog:{
        email:'',
        password:'',
    },
};

const loginReducer =(state,action)=>{
    switch(action.type){
        case START_FETCH:{
            return{
                ...state,
                isLoading:true,
            };
        }
        case FETCH_SUCCESS:{
            return{
                ...state,
                isLoading:false,
            };
        }
        case ERROR_CATCHED:{
            return{
                ...state,
                error:"Email or password is not correct !",
                isLoading:false,
                };
            }
        case INPUT_EDIT:{
            return{
                ...state,
                credentialsLog:{
                    ...state.credentialsLog,
                    [action.inputName]:action.payload,
                },
                error:"",
            };
        }
        case TOGGLE_MODE:{
            return{
                ...state,
                isLoginView:!state.isLoginView,
            };
        }
        default:{
            return state;
        }
    };
};

const PaperBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));
  
const AvatarAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}));
  
const SpanTypography = styled(Typography)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'teal',
    marginTop: theme.spacing(1),
}));
  
const SubmitButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'teal',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
}));

const Login = (props) => {
    // const classes=useStyles();
    const [state,dispatch]=useReducer(loginReducer,initialState);

    const inputChangedLog=()=>event=>{
        const cred =state.credentialsLog;
        cred[event.target.name]=event.target.value;
        dispatch({
            type:INPUT_EDIT,
            inputName:'state.credentialLog',
            payload:cred,
        })
    };
    const login=async(event)=>{
        event.preventDefault();     //formのonsubmitが実行されるたびにページがリフレッシュされるのを防ぐ
        if (state.isLoginView) {
          try {
            dispatch({ type: START_FETCH });
            const res = await axios.post(
              `https://movieapi.system5081.com/authen/jwt/create/`,
              state.credentialsLog,     //認証の情報はcredentialsLogに入っている
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            props.cookies.set("jwt-token", res.data.access);
            res.data.access         //このresにjwtのトークンが返ってくる
              ? (window.location.href = "/movie")
              : (window.location.href = "/");
            dispatch({ type: FETCH_SUCCESS });
          } catch {
            dispatch({ type: ERROR_CATCHED });
          }
        } else {
          try {
            dispatch({ type: START_FETCH });
            await axios.post(
              `https://movieapi.system5081.com/api/create/`,
              state.credentialsLog,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
    
            const res = await axios.post(
              `https://movieapi.system5081.com/authen/jwt/create/`,
              state.credentialsLog,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            props.cookies.set("jwt-token", res.data.access);
            res.data.access
              ? (window.location.href = "/movie")
              : (window.location.href = "/");
            dispatch({ type: FETCH_SUCCESS });
          } catch {
            dispatch({ type: ERROR_CATCHED });
          }
        }
    };
    const toggleView=()=>{
        dispatch({type:TOGGLE_MODE});
    };
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <form onSubmit={login}>
        <PaperBox>
        {state.isLoading && <CircularProgress />}
        <AvatarAvatar>
            <LockIcon />
        </AvatarAvatar>
        <Typography component="h1" variant="h5">
            {state.isLoginView ?'Login':'Register'}
        </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={inputChangedLog()}
                value={state.credentialsLog.email}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputChangedLog()}
                value={state.credentialsLog.password}
            />
            <SpanTypography>{state.error}</SpanTypography>
            <SubmitButton
                type="submit"
                disabled={
                !state.credentialsLog.password || !state.credentialsLog.email
                }
                fullWidth
                variant="contained"
                color="primary"
            >
                {state.isLoginView ? "Login" : "Register"}
            </SubmitButton>
            <SpanTypography onClick={()=>toggleView()} >
                {state.isLoginView ?'Create Account':'Back to Login'}
            </SpanTypography>
        </PaperBox>        
        </form>      
    </Container>
  );
};

export default withCookies(Login);
