import React from 'react';
import {useEffect} from "react";
import $ from "jquery";
import {
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  ChakraProvider,
  Center,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { userData,csrfToken,mode } from '../components/recoil';

const Transactions = () => {
  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);
 // const csrf = useRecoilValue(csrfToken);
 // const setCsrf = useSetRecoilState(csrfToken); 
  const currentMode = useRecoilValue(mode);
    const setMode = useSetRecoilState(mode);

  useEffect(()=>{


    const userChoice = localStorage.getItem("mode");

    if(userChoice === "dark"){
    setMode("dark");
    }
    else{
      setMode("light");
    }
useEffect(() => {
    
    if (!data.profile || data) {
    //alert(4)
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        //crossDomain: true,
        success: function (r, status, xhr) {
          //const dataBundle = r.data.dataBundle;
         const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle
                  });
        //  setData({ dataBundle: dataBundle });
        //  setSpin(false);
          
        //   setCsrf(r.token);
//console.log(data.profile.phoneNumber);
        //  console.log("csrf id ",csrf);
        },
        error: function () {
          //showAlert("Server is down", "warning");
        },
      });
    }
  }, []);


  if(!data || !data.profile.transactions){

    return(<></>);

  }
    
//  const d =JSON.parse(window.localStorage.getItem("data"));
 /* useEffect(() => {  
   // if (!csrf) {
    //alert(4)
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        //crossDomain: true,
        success: function (r, status, xhr) {
          const dataBundle = r.data.dataBundle;
          setData({ dataBundle: dataBundle });
        //  setSpin(false);
          // setCsrf(r.token);
//console.log(data.profile.phoneNumber);
        //  console.log("csrf id ",csrf);
        },
        error: function () {
          //showAlert("Server is down", "warning");
        },
      });
  //  }
  }, []);*/
 // const data = useRecoilValue(userData);
  const transacs = data.profile.transactions || [];
  const requests = data.profile.request || [];

  const [isDesktop] = useMediaQuery('(min-width: 768px)');
//console.log(data.profile.transactions);
  return (
    <ChakraProvider>
      <Flex bg={currentMode ==="dark"  && "black"}
        mt={8}
        as={isDesktop ? 'center' : ''}
        justifyContent="center"
        alignItems="center"
        flexDirection={isDesktop ? 'row' : 'column'}
      >
        <Heading color={currentMode==="dark" && "white"} as="h4" size="sm">
          Transaction History
        </Heading>
      </Flex>
      <Box
        mb={0}
        p={4}
        borderRadius="lg"
        boxShadow="lg"
        bg={currentMode === "dark" &&"black"}
        color={currentMode==="dark" && "white"}
        maxH="400px"
        overflowY="scroll"
        marginTop={2}
        marginBottom="2px"
        ml={isDesktop ? '150px' : ''}
        mr={isDesktop ? '150px' : ''}
        minW={isDesktop ? '500px' : ''}
      >
        <Table variant="simple" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Transaction ID</Th>
              <Th>Description</Th>
              <Th>Amount(₦)</Th>
              <Th>Order date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transacs && transacs.length >= 1 &&
              transacs.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.tid}</Td>
                  <Td>{item.details}</Td>
                  <Td>{item.amount}</Td>
                  <Td>{item.date}</Td>
                  <Td>
                    <Tag size="sm" variant="solid" colorScheme="green">
                      Success
                    </Tag>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
{transacs && transacs.length < 1 && (
          <Center m={3}>
            <Text textAlign="center" color="#657ce0">
              No transactions have been made
            </Text>
          </Center>
        )}
      </Box>

      <Box bg={currentMode==="dark" && "black"}   mb="0em">
        <Flex
          mt={0}
          as={isDesktop ? 'center' : ''}
          justifyContent="center"
          alignItems="center"
          flexDirection={isDesktop ? 'row' : 'column'}
        >
          <Heading as="h4" size="sm">
            Request History
          </Heading>
        </Flex>

        <Box
          mb={20}
          p={4}
          borderRadius="lg"
          boxShadow="lg"
          bg={currentMode === "dark" && "black"}
        color={currentMode==="dark" && "white"}
          maxH="400px"
          overflowY="scroll"
          marginTop={2}
          marginBottom="2px"
          ml={isDesktop ? '150px' : ''}
          mr={isDesktop ? '150px' : ''}
          minW={isDesktop ? '500px' : ''}
        >
          <Table variant="simple" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Request ID</Th>
                <Th>Description</Th>
                <Th>Whatsapp</Th>
                <Th>Order Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests && requests.length >= 1 &&
                requests.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.rid}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.phoneNo}</Td>
                    <Td>{item.date}</Td>
                    <Td>
                      <Tag size="sm" variant="solid" colorScheme="green">
                        Success
                      </Tag>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {requests && requests.length < 1 && (
            <Center m={3}>
              <Text textAlign="center" color="#657ce0">
                No request have been made
              </Text>
            </Center>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Transactions;
