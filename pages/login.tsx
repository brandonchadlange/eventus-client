import {
  AppShell,
  Button,
  Card,
  Container,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <AppShell style={{ backgroundColor: "#f2f2f3" }}>
      <Container size="xs" style={{ height: "100%" }}>
        <Stack style={{ height: "100%" }} align="" justify="center">
          <Card withBorder style={{ width: "100%" }} shadow="md">
            <Stack align="center" spacing={0}>
              <Image height={60} width={60} src="icon.png"></Image>
              <Title size={30}>Eventus</Title>
              <Text mt="sm">Sign in to continue</Text>
              <Space h={40}></Space>
              <Button onClick={loginWithGoogle} loading={googleLoading}>
                Login with Google
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </AppShell>
  );
};

export default Login;
