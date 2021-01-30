import React from "react";
import { Flex,icons } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      width="100%"
      height="40px"
      bgColor="#FEEBC8"
      alignItems="center"
      justify="center"
      fontSize="l"
    >
      Copyright © 2021 Tüm hakları saklıdır. AGALAR ANONİM ŞİRKETİ
<icons class="fab fa-instagram"></icons>
    </Flex>
  );
};

export default Footer;
