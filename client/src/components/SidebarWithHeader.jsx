/* eslint-disable react/prop-types */
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Divider,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiChevronDown,
  FiBookOpen,
  FiCheck,
  FiTrash2,
  FiBook,
  FiTrendingUp,
  FiBookmark,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import bookLogo from "../assets/bookLogo.png";
import React from "react";
const LinkItems = [
  { name: "All Books", icon: FiHome, path: "/" },
  { name: "Currently Reading", icon: FiBookOpen, path: "/reading" },
  { name: "Completed", icon: FiCheck, path: "/completed" },
  { name: "Not Started", icon: FiBookmark, path: "/starting" },
  { name: "Dropped", icon: FiTrash2, path: "/dropped" },
  { name: "Explore Books", icon: FiBook, path: "/explore" },
  { name: "Explore Users", icon: FiTrendingUp, path: "/users" },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const orangeTextTheme = useColorModeValue("orange.500", "orange.200");

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to={"/"}>
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color={orangeTextTheme}
            display={"flex"}
            alignItems={"center"}
          >
            <Image src={bookLogo} width={8} />
            Book'd
          </Text>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => (
        <React.Fragment key={index}>
          {link.name === "Explore Books" && <Divider />}
          <NavItem icon={link.icon} href={link.path} onClose = {onClose}>
            {link.name}
          </NavItem>
        </React.Fragment>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, href, onClose, ...rest }) => {
  return (
    <Link to={href} onClick={onClose}>
      {/* <Link to={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}> */}
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "orange.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const orangeTextTheme = useColorModeValue("orange.500", "orange.200");

  const authVariables = useAuthContext();
  const userProfile = authVariables.userProfile;
  const [profilePicture, setProfilePicture] = useState();

  const username = userProfile.user ? userProfile.user.username : "";

  async function handleSignOut() {
    await authVariables.logoutUser();
  }

  useEffect(() => {
    setProfilePicture(userProfile.profile_picture);
  }, [userProfile]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color={orangeTextTheme}
        alignItems={"center"}
      >
        <Image src={bookLogo} width={8} />
        Book'd
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          display={{ base: "none", md: "block" }}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={profilePicture}
                  fallbacksrc="https://via.placeholder.com/250"
                />

                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{username}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Link to={"/me"}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
