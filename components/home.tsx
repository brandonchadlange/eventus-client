import {
  AppShell,
  Card,
  Container,
  createStyles,
  Grid,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import HomeHero from "./home-hero";
import HomeFeatures from "./home-features";
import HomeFooter from "./home-footer";
import { IconBolt, IconHeartRateMonitor, IconTools } from "@tabler/icons";
import HomePreregisterBanner from "./home-preregister-banner";

const footerData = [
  {
    title: "About",
    links: [
      {
        label: "Features",
        link: "#",
      },
      {
        label: "Pricing",
        link: "#",
      },
      {
        label: "Support",
        link: "#",
      },
      {
        label: "Forums",
        link: "#",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "Contribute",
        link: "#",
      },
      {
        label: "Media assets",
        link: "#",
      },
      {
        label: "Changelog",
        link: "#",
      },
      {
        label: "Releases",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join Discord",
        link: "#",
      },
      {
        label: "Follow on Twitter",
        link: "#",
      },
      {
        label: "Email newsletter",
        link: "#",
      },
      {
        label: "GitHub discussions",
        link: "#",
      },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  gray: {
    backgroundColor: "#fafafa",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

const HomePage = () => {
  const { classes, theme } = useStyles();

  return (
    <AppShell padding={0} footer={<HomeFooter data={footerData} />}>
      <HomeHero />
      <Container size="md" pb={80}>
        <Card p={0} shadow="sm" withBorder>
          <Image radius="md" src="app-image.png"></Image>
        </Card>
      </Container>
      <Container fluid py={60} className={classes.gray}>
        <Container size="sm">
          <Title className={classes.title}>
            Create http requests to run in the background of your application
          </Title>
          <Text className={classes.description}>
            Background processes can become unmanagable quickly, so why not be
            able to list and monitor them all in one place?
          </Text>
        </Container>
        <Container size="md" mt={80}>
          <Grid columns={3}>
            <Grid.Col span={1}>
              <Stack spacing={0} align="center">
                <IconTools size={35} />
                <Title className={classes.title} mt="md">
                  Create
                </Title>
                <Text className={classes.description}>
                  Add an event and all of the actions to fire when that event is
                  triggered.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={1}>
              <Stack spacing={0} align="center">
                <IconBolt size={35} />
                <Title className={classes.title} mt="md">
                  Trigger
                </Title>
                <Text className={classes.description}>
                  Request for an event to fire off its actions and let them
                  process.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={1}>
              <Stack spacing={0} align="center">
                <IconHeartRateMonitor size={35} />
                <Title className={classes.title} mt="md">
                  Monitor
                </Title>
                <Text className={classes.description}>
                  Catch any issues and automatically retry events until
                  conditions are met.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
      <HomeFeatures
        title="Features built to ensure you can manage your business quickly and with confidence."
        description="We may be new but are planning to release features regularly to ensure you are always in control of your business processes."
      />
      {/* <Container fluid py={60} className={classes.gray}>
        <Container size="md">
          <HomePreregisterBanner />
        </Container>
      </Container> */}
    </AppShell>
  );
};

export default HomePage;
