import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import Application from "../../components/application";
import axios from "axios";

const CreateProject = () => {
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      project_id: "",
    },
  });

  const onFormSubmit = async (values: any) => {
    setFormLoading(true);
    await axios.post("/api/project", values);
  };

  return (
    <Application>
      <Card withBorder>
        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Title size={20}>Create a new project</Title>
          <Text>Project</Text>
          <Card.Section py="sm">
            <Divider></Divider>
          </Card.Section>
          <Grid columns={12}>
            <Grid.Col span={4}>
              <TextInput
                {...form.getInputProps("name")}
                label="Name"
              ></TextInput>
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                {...form.getInputProps("project_id")}
                label="Project Id"
              ></TextInput>
            </Grid.Col>
          </Grid>
          <Card.Section py="sm">
            <Divider></Divider>
          </Card.Section>
          <Group position="apart">
            <Button component="a" href="/" variant="default" size="xs">
              Cancel
            </Button>
            <Button loading={formLoading} type="submit" size="xs">
              Create new project
            </Button>
          </Group>
        </form>
      </Card>
    </Application>
  );
};

export default CreateProject;
