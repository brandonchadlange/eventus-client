import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Modal,
  Space,
  Stack,
  Tabs,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Action } from "@prisma/client";
import { IconArrowBackUp, IconBolt } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Application from "../../../components/application";
import EventSettings from "../../../components/event-settings";
import useActionStore from "../../../stores/action";

const ActionCreateModal = () => {
  const actionStore = useActionStore();
  const router = useRouter();
  const event_id = router.query.event as string;
  const [loading, setLoading] = useState(false);
  const [opened, setopened] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      event_id: "",
      action_id: "",
      endpoint: "",
      description: "",
    },
  });

  const onFormSubmit = async (values: any) => {
    setLoading(true);
    form.values.event_id = event_id;
    await actionStore.createAction(values);
    setLoading(false);
    setopened(false);
  };

  return (
    <>
      <Modal
        radius={0}
        withCloseButton={false}
        size="md"
        opened={opened}
        onClose={() => setopened(false)}
        centered
      >
        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Title size={20}>Create a new action</Title>
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
                {...form.getInputProps("action_id")}
                withAsterisk
                description="Used to trigger this event"
                label="Action ID"
              ></TextInput>
            </Grid.Col>
          </Grid>
          <Grid columns={12}>
            <Grid.Col span={12}>
              <TextInput
                {...form.getInputProps("endpoint")}
                withAsterisk
                description="Called when the event is triggered"
                label="Endpoint"
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
              Create action
            </Button>
          </Group>
        </form>
      </Modal>
      <Button
        leftIcon={<IconBolt size={18} />}
        color="pink"
        onClick={() => setopened(true)}
      >
        Create action
      </Button>
    </>
  );
};

const NoActionsBanner = () => {
  return (
    <Card withBorder>
      <Stack align="center">
        <div style={{ textAlign: "center" }}>
          <Title>No actions found for this event</Title>
          <Text>Please create an action</Text>
        </div>
        <ActionCreateModal />
      </Stack>
    </Card>
  );
};

const ActionsList = ({ actions }: { actions: Action[] }) => {
  const [editing, setEditing] = useState(false);
  const [selectedAction, setselectedAction] = useState<Action | null>(null);

  const editAction = (action: Action) => {
    setselectedAction(action);
    setEditing(true);
  };

  const cancelEditing = () => {
    setselectedAction(null);
    setEditing(false);
  };

  return (
    <>
      <Group position="right">
        <ActionCreateModal />
      </Group>
      <Space h="md"></Space>
      <Stack spacing={10}>
        {actions.map((action) => (
          <Card withBorder key={action.id}>
            <Group position="apart">
              <Title size={20}>{action.name}</Title>
              {selectedAction !== action && (
                <Button
                  size="xs"
                  variant="default"
                  disabled={editing && selectedAction !== action}
                  onClick={() => editAction(action)}
                >
                  Configure
                </Button>
              )}
            </Group>
            {editing && selectedAction === action && (
              <>
                <Card.Section py="sm">
                  <Divider></Divider>
                </Card.Section>
                <Grid columns={12}>
                  <Grid.Col span={6}>
                    <TextInput label="Name" />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput label="Action ID" />
                  </Grid.Col>
                </Grid>
                <Grid columns={12}>
                  <Grid.Col span={12}>
                    <TextInput placeholder="https://..." label="Endpoint" />
                  </Grid.Col>
                </Grid>
                <Card.Section py="sm">
                  <Divider></Divider>
                </Card.Section>
                <Group position="apart">
                  <Button size="xs" variant="default" onClick={cancelEditing}>
                    Cancel
                  </Button>
                  <Button size="xs" onClick={cancelEditing}>
                    Save
                  </Button>
                </Group>
              </>
            )}
          </Card>
        ))}
      </Stack>
    </>
  );
};

const Actions = () => {
  const actionStore = useActionStore();
  const router = useRouter();
  const event_id = router.query.event as string | undefined;

  const showNoActionsBanner =
    !actionStore.loading && actionStore.actions.length === 0;
  const showActionsList =
    !actionStore.loading && actionStore.actions.length > 0;

  useEffect(() => {
    if (event_id === undefined) return;
    actionStore.fetchActions(event_id);
  }, [event_id]);

  return (
    <Application>
      <Container size="md">
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="actions">Actions</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Space h="sm"></Space>
          <Tabs.Panel value="overview">
            <h1>Overview</h1>
          </Tabs.Panel>
          <Tabs.Panel value="actions">
            {actionStore.loading && <Text>Loading...</Text>}
            {showNoActionsBanner && <NoActionsBanner />}
            {showActionsList && <ActionsList actions={actionStore.actions} />}
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <EventSettings />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Application>
  );
};

export default Actions;
