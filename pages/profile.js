import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Container,
  Box,
  VStack,
  Input,
  Button,
  Heading,
  Text,
  InputLeftElement,
  InputGroup,
  Icon,
  Center,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import Header from '../components/header';
import Adverts from '../components/adverts';
import NavbarBottom from '../components/navbarBottom';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import $ from 'jquery';
import Head from "next/head";

import {
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { loginStatus, csrfToken, userData,pageLoading, thisPage,mode } from '../components/recoil';
import Script from 'next/script';

export default function Profile() {

const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);

  useEffect(() => {
    const userChoice = window.localStorage.getItem("mode");
    if (userChoice === "null") {
      return;
    }
    if (userChoice === "dark") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, []);

  const showAlert = (message, type) => {
    toast[type](`📑 ${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     // progress: undefined,
      theme: 'light',
     // toastId:"profile",
    });

    setBtnLoading(false);
  };

  const [input, setInput] = useState({ email: '', fullName: '', password: '', newPassword: '', phoneNumber: '' });

  const logged = useRecoilValue(loginStatus);
  const setLogged = useSetRecoilState(loginStatus);

  const csrf = useRecoilValue(csrfToken);
  const setCsrf = useSetRecoilState(csrfToken);

  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);

  const [btnLoading, setBtnLoading] = useState(false);

  const profile = data.profile;
  const router = useRouter();

const loadingPage = useRecoilValue(pageLoading);
  
const setLoadingPage = useSetRecoilState(pageLoading);
    
const currentPage = useRecoilValue(thisPage);
  
const setCurrentPage = useSetRecoilState(thisPage);    
useEffect(()=>{
setCurrentPage("profile");
setLoadingPage(false);
   
},[]);
  
  useEffect(() => {

    
    if (!profile) {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
       // crossDomain: true,
        success: function (r, status, xhr) {
          if (r.data.isLogged) {
            setLogged(r.data.isLogged);
            const profile = r.data.profile;
            const dataBundle = r.data.dataBundle;
            setData({ profile: profile, dataBundle: dataBundle });
          }
        },
        error: function () {
         // showAlert('Server is down', 'warning');
        },
      });
    }
  }, [profile]);

  if (!data || !profile) {
    return (
      <Center color={currentMode === "dark" && "white"} bg={currentMode == "dark" && "black"} display="flex" justifyContent="center" alignItems="center" h="100vh">
      <Spinner size="lg" color="blue" speed="0.3s"/>
      </Center>
    );
  }

  const getInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const notify = () => {
    showAlert('Your profile has been updated..', 'info');
  };

  const update = () => {
    const updatedInput = { ...input, csrf: csrf };
    setBtnLoading(true);

    if (Object.keys(input).length < 1) {
      showAlert('Please fill a field to update!!!', 'warning');
    }

      const url = 'https://mylesvtu.com.ng/app/store/edit_profile';
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: updatedInput,
      success: function (r) {
        if (r.status === 1) {
          notify();
        } else {
          showAlert(r.msg, 'error');
        }
        setBtnLoading(false);
        setCsrf(r.token);
      },
      error: function () {
        setBtnLoading(false);
      },
    });
  };

  return (
    <>
      <Head>

      <title>mylesVTU — cheap data,airtime and hire web devey and graphics designer </title>
        </Head>
      <Header />
      <ChakraProvider>
        <Container color={currentMode == "dark" && "white"} bg={currentMode === "dark" && "black"}>
       

        <Container maxW="md" p={4}>
             {loadingPage ? (

<ChakraProvider>
      <Center mt={5} height="100vh">
      <Box
        p={4}
        maxW="md"
        borderWidth=",0px"
  borderColor="#657ce0"
        borderRadius="md"
        boxShadow="sm"
        textAlign="center"
          position="absolute"
            top="40%"
        
      >
        <Spinner color="#657ce0" size="xl" />
      
      </Box>
    </Center></ChakraProvider>) : currentMode !=="dark" && currentMode !== "light" ? (<></>) : (  

      <Flex mt={10} justifyContent="center" alignItems="center">
      <Box zIndex={-1} borderWidth="0px" borderRadius="lg" p={6}>
  <Heading mx={5} size="md" justify="center" align="center">
          My Profile
        </Heading>
            <VStack spacing={4} align="stretch">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaUser} color="gray.400" />
                </InputLeftElement>
                <Input name="fullName" onChange={getInput} type="text" placeholder={profile.fullName || 'Enter your Fullname'} />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="gray.400" />
                </InputLeftElement>
                <Input name="email" onChange={getInput} type="email" placeholder={profile.email || 'Email'} />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input name="password" onChange={getInput} type="password" placeholder="Password" />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input name="newPassword" onChange={getInput} type="password" placeholder="New Password" />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaPhone} color="gray.400" />
                </InputLeftElement>
                <Input name="phoneNumber" onChange={getInput} type="tel" placeholder={profile.phoneNumber || 'Phone Number'} />
              </InputGroup>

              <Button mt={5} onClick={update} colorScheme="blue" type="submit">
                {btnLoading ? <FallingLines color="white" width="50" visible={true} ariaLabel="falling-lines-loading" /> : 'Update'}
              </Button>
            </VStack>
          </Box></Flex>)}
        </Container>
        </Container>
      </ChakraProvider>
      
      <NavbarBottom />
      <ToastContainer />
    </>
  );
}
