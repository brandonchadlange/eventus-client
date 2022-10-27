import { Button, Card, Group, Text, Title } from "@mantine/core";

interface ListCardProps {
  title: string;
  text?: string;
  buttonText: string;
  href: string;
}

const ListCard = (props: ListCardProps) => {
  return (
    <Card withBorder>
      <Group position="apart">
        <div>
          <Title size={20}>{props.title}</Title>
          <Text>{props.text}</Text>
        </div>
        <Button component="a" href={props.href} size="xs" variant="default">
          {props.buttonText}
        </Button>
      </Group>
    </Card>
  );
};

export default ListCard;
