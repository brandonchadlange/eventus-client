import {
  ActionIcon,
  AppShell,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Project } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Application from "./application";
import { IconChevronRight } from "@tabler/icons";

const NoProjectsBanner = () => {
  return (
    <Card withBorder>
      <Stack align="center">
        <div style={{ textAlign: "center" }}>
          <Title>Welcome to Events API</Title>
          <Text>Please create a project to continue</Text>
        </div>
        <Button component="a" href="/project/new">
          Create project
        </Button>
      </Stack>
    </Card>
  );
};

const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <Grid columns={3}>
        {projects.map((project) => (
          <>
            <Grid.Col span={1} key={project.id}>
              <Card
                withBorder
                shadow="sm"
                component="a"
                href={`/project/${project.project_id}/events`}
              >
                <Group position="apart">
                  <div>
                    <Title size={20}>{project.name}</Title>
                    <Text>{project.project_id}</Text>
                  </div>
                  <IconChevronRight />
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={1} key={project.id}>
              <Card
                withBorder
                shadow="sm"
                component="a"
                href={`/project/${project.project_id}/events`}
              >
                <Group position="apart">
                  <div>
                    <Title size={20}>{project.name}</Title>
                    <Text>{project.project_id}</Text>
                  </div>
                  <IconChevronRight />
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={1} key={project.id}>
              <Card
                withBorder
                shadow="sm"
                component="a"
                href={`/project/${project.project_id}/events`}
              >
                <Group position="apart">
                  <div>
                    <Title size={20}>{project.name}</Title>
                    <Text>{project.project_id}</Text>
                  </div>
                  <IconChevronRight />
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={1} key={project.id}>
              <Card
                withBorder
                shadow="sm"
                component="a"
                href={`/project/${project.project_id}/events`}
              >
                <Group position="apart">
                  <div>
                    <Title size={20}>{project.name}</Title>
                    <Text>{project.project_id}</Text>
                  </div>
                  <IconChevronRight />
                </Group>
              </Card>
            </Grid.Col>
          </>
        ))}
      </Grid>
    </>
  );
};

const ApplicationDashboard = () => {
  const [loading, setloading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const response = await axios.get<Project[]>("/api/project");
    setProjects(response.data);
    setloading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <AppShell style={{ backgroundColor: "#f2f2f3" }} padding={0}>
      <Card style={{ height: "200px" }}>
        <Container color="red">
          <Title size={30}>
            <Group>
              <Image height={40} width={40} src="/icon.png"></Image>
              <span>Eventus</span>
            </Group>
          </Title>
          <Title mt="lg" size={20}>
            Projects
          </Title>
          <Text>Select a project or create a new one</Text>
        </Container>
      </Card>
      <Container style={{ marginTop: "-50px" }}>
        {loading && <Text>Loading...</Text>}
        {!loading && !projects.length && <NoProjectsBanner />}
        {!loading && projects.length && <ProjectsGrid projects={projects} />}
      </Container>
    </AppShell>
  );
};

export default ApplicationDashboard;
