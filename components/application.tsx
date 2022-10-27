import {
  AppShell,
  Button,
  Card,
  Container,
  Group,
  Header,
  Image,
  Navbar,
  Select,
  Space,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ReactNode } from "react";
import ApplicationEvents from "./application-events";

const ApplicationHeader = () => {
  return (
    <Header height={60}>
      <NextLink href="/">
        <Title mt="xs" size={30} ml="sm">
          <Group>
            <Image height={40} width={40} src="/icon.png"></Image>
            <span>Eventus</span>
          </Group>
        </Title>
      </NextLink>
    </Header>
  );
};

const ApplicationNavBar = () => {
  return (
    <Navbar width={{ sm: 350 }}>
      <Navbar.Section p="sm">
        <ApplicationEvents />
      </Navbar.Section>
    </Navbar>
  );
};

const Application = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      style={{ backgroundColor: "#fafafa" }}
      header={<ApplicationHeader />}
      navbar={<ApplicationNavBar />}
    >
      {children}
    </AppShell>
  );
};

export default Application;
