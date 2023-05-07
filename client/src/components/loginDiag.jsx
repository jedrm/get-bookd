import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function LoginDiag() {
    return (
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
                </FormControl>
                <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
                </FormControl>
                <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                        <Link color={'orange.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                        bg={'orange.400'}
                        color={'white'}
                        _hover={{
                        bg: 'orange.500',
                        }}>
                        Sign in
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
  }