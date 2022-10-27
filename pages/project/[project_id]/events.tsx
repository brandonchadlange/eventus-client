import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Progress,
  Space,
  Stack,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Event } from "@prisma/client";
import { IconArrowBackUp } from "@tabler/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Application from "../../../components/application";
import useEventsStore from "../../../stores/event";

const EventCreateModal = () => {
  const [loading, setLoading] = useState(false);
  const [opened, setopened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      event_id: "",
      description: "",
    },
  });

  const onFormSubmit = async (values: any) => {
    setLoading(true);
    await axios.post("/api/event", values);
    alert("Event created");
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        size="md"
        opened={opened}
        onClose={() => setopened(false)}
        centered
      >
        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Title size={20}>Create a new event</Title>
          <Card.Section py="sm">
            <Divider></Divider>
          </Card.Section>
          <Grid columns={12}>
            <Grid.Col span={12}>
              <TextInput
                {...form.getInputProps("name")}
                withAsterisk
                label="Name"
              ></TextInput>
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>
          </Grid>
          <Grid columns={12}>
            <Grid.Col span={12}>
              <TextInput
                {...form.getInputProps("event_id")}
                withAsterisk
                description="Used to trigger this event"
                label="Event ID"
              ></TextInput>
            </Grid.Col>
          </Grid>
          <Grid columns={12}>
            <Grid.Col span={12}>
              <Textarea
                {...form.getInputProps("description")}
                label="Description"
              ></Textarea>
            </Grid.Col>
          </Grid>
          <Card.Section py="sm">
            <Divider></Divider>
          </Card.Section>
          <Group position="apart">
            <Button
              onClick={() => setopened(false)}
              size="xs"
              variant="default"
            >
              Cancel
            </Button>
            <Button loading={loading} type="submit" size="xs">
              Create event
            </Button>
          </Group>
        </form>
      </Modal>
      <Button onClick={() => setopened(true)}>Create event</Button>
    </>
  );
};

const NoEventsBanner = () => {
  return (
    <Card withBorder>
      <Stack align="center">
        <div style={{ textAlign: "center" }}>
          <Title>No events found for this project</Title>
          <Text>Please create an event to continue</Text>
        </div>
        <EventCreateModal />
      </Stack>
    </Card>
  );
};

const EventsList = ({ events }: { events: Event[] }) => {
  const router = useRouter();
  const project_id = router.query.project_id;

  return (
    <>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="actions">Actions</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Space h="sm"></Space>
      <Grid columns={3}>
        <Grid.Col span={1}>
          <Card withBorder>
            <Group position="apart">
              <Title mb="sm" size={20}>
                Events
              </Title>
              <Text size={14}>2/3</Text>
            </Group>
            <Progress color="#ff7ccc" value={66} />
          </Card>
        </Grid.Col>
        <Grid.Col span={1}>
          <Card withBorder>
            <Group position="apart">
              <Title mb="sm" size={20}>
                Actions
              </Title>
              <Text size={14}>2/3</Text>
            </Group>
            <Progress color="#ff7ccc" value={66} />
          </Card>
        </Grid.Col>
      </Grid>
      <Group position="right">
        <EventCreateModal />
      </Group>
      <Space h="sm"></Space>
      <Stack spacing={5}>
        {events.map((event) => (
          <>
            <Card withBorder key={event.id}>
              <Group position="apart">
                <Group>
                  <div>
                    <Title size={20}>{event.name}</Title>
                    <Text>{event.event_id + (event.description || "")}</Text>
                  </div>
                </Group>
                <Button
                  variant="default"
                  component="a"
                  href={`/project/${project_id}/actions?event=${event.id}`}
                  size="xs"
                >
                  Setup
                </Button>
              </Group>
            </Card>
          </>
        ))}
      </Stack>
    </>
  );
};

const Events = () => {
  const eventStore = useEventsStore();

  const showNoEventsBanner =
    !eventStore.loading && eventStore.events.length === 0;
  const showEventsList = !eventStore.loading && eventStore.events.length > 0;

  useEffect(() => {
    eventStore.fetchEvents();
  }, []);

  return (
    <Application>
      <h1></h1>
    </Application>
  );
};

export default Events;
