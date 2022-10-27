import {
  Anchor,
  AppShell,
  Button,
  Card,
  Container,
  createStyles,
  Group,
  Image,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Dots from "../components/dots";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { IconBrandTwitter } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 60,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors.pink,
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

const EarlyAccess = () => {
  const [loading, setloading] = useState(false);
  const [complete, setComplete] = useState(false);
  const { classes } = useStyles();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
    },
  });

  const onFormSubmit = async ({ email }: { email: string }) => {
    setloading(true);
    await axios.post("/api/early-access", { email });
    setloading(false);
    setComplete(true);
  };

  return (
    <AppShell>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      <Container style={{ height: "100%" }} size="xs">
        <Space h={100}></Space>
        {!complete && (
          <Card withBorder shadow="sm">
            <form onSubmit={form.onSubmit(onFormSubmit)}>
              <Stack align="center">
                <Image height={60} width={60} src="icon.png"></Image>
                <Title>Eventus</Title>
                <Text style={{ maxWidth: "400px", textAlign: "center" }}>
                  Please enter your email address below to recieve early access
                  to Eventus. We will not spam you :)
                </Text>
              </Stack>
              <TextInput
                {...form.getInputProps("email")}
                placeholder="your.name@mail.com"
                type="email"
                label="Email address"
                mt={40}
              />
              <Button loading={loading} type="submit" fullWidth mt="md">
                Request early access
              </Button>
              <Text size="xs" mt="md" style={{ textAlign: "center" }}>
                By clicking the button above we will notify you with news on the
                progress of Eventus as well as an early access key before the
                official launch of the product.
              </Text>
            </form>
          </Card>
        )}
        {complete && (
          <>
            <Card withBorder shadow="sm">
              <Stack align="center">
                <Image height={60} width={60} src="icon.png"></Image>
                <Title>Eventus</Title>
                <Text style={{ maxWidth: "400px", textAlign: "center" }}>
                  Thank you for requesting early access. Keep an eye out within
                  the next few weeks for an access link.
                </Text>
                <Text style={{ maxWidth: "400px", textAlign: "center" }}>
                  For any further requests please reach out to me
                  <br />
                  <br />
                  <Button
                    component="a"
                    target="_blank"
                    href="https://twitter.com/BrandonTheChad"
                    fullWidth
                    variant="default"
                    leftIcon={<IconBrandTwitter />}
                  >
                    @brandonthechad
                  </Button>
                  <Button fullWidth component="a" href="/" mt="md">
                    Back to home
                  </Button>
                </Text>
              </Stack>
            </Card>
          </>
        )}
      </Container>
    </AppShell>
  );
};

export default EarlyAccess;
