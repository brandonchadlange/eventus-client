import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useEventsStore from "../stores/event";

const EventCreateModal = () => {
  const eventStore = useEventsStore();
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
    await eventStore.createEvent(values);
    setLoading(false);
    setopened(false);
    form.reset();
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
      <Button
        onClick={() => setopened(true)}
        variant="outline"
        color="pink"
        fullWidth
      >
        Create Event
      </Button>
    </>
  );
};

const ApplicationEvents = () => {
  const eventStore = useEventsStore();
  const router = useRouter();
  const event_id = router.query.event;

  return (
    <Stack spacing="xs">
      <EventCreateModal />
      {eventStore.events.map((event) => (
        <NextLink
          href={`/project/core-supply/actions?event=${event.id}`}
          key={event.id}
        >
          <Card
            py="xs"
            style={{
              backgroundColor:
                event_id === event.id ? "rgb(231, 245, 255)" : "white",
            }}
          >
            <Title size={16}>{event.name}</Title>
            <Text size={14} color="dimmed">
              {event.event_id}
            </Text>
          </Card>
        </NextLink>
      ))}
    </Stack>
  );
};

export default ApplicationEvents;
