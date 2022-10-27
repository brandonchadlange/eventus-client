import { Button, Card, Group, Stack, Text, Title } from "@mantine/core";

const EventSettings = () => {
  return (
    <Stack spacing={10}>
      <Card withBorder>
        <Title size={16}>Name</Title>
      </Card>
      <Card withBorder color="red" className="card__danger">
        <Group position="apart" align="center">
          <div>
            <Title size={16}>Delete event</Title>
            <Text>
              This will remove this event as well as all the actions and data
              linked it
            </Text>
          </div>
          <Button size="xs" color="red">
            Delete event
          </Button>
        </Group>
      </Card>
    </Stack>
  );
};

export default EventSettings;
