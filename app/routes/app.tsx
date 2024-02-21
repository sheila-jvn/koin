import { Icon } from "@iconify-icon/react";
import {
  ActionIcon,
  Box,
  Container,
  Group,
  ScrollArea,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "Home | QuikCash" }];

export default function App() {
  return (
    <Container
      size="sm"
      h="100vh"
      p={0}
      display="grid"
      style={{
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Box bg="blue" py={16} px={24}>
        <TextInput placeholder="Search for mutations..." />
      </Box>
      <ScrollArea>
        <Box p={24}>
          <Text>Wow body content wow</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            distinctio culpa molestiae illum neque at autem. Sequi dolor, dicta
            doloribus provident reiciendis illo numquam quidem suscipit
            voluptate dolore ipsam aliquid.
          </Text>
          <Box h="1000px">Wow long content</Box>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            possimus sapiente ut aperiam odit harum quia at aspernatur, cum sint
            consequatur asperiores mollitia ipsa esse debitis ea dolorem
            perferendis inventore!
          </Text>
        </Box>
      </ScrollArea>
      <Group bg="orange" px={24} py={16} gap={32} pos="relative">
        <ActionIcon size={56}>
          <Icon
            style={{
              height: rem(32),
              width: rem(32),
            }}
            height={32}
            width={32}
            icon="material-symbols:description-outline"
          />
        </ActionIcon>
        <ActionIcon size={56}>
          <Icon
            style={{
              height: rem(32),
              width: rem(32),
            }}
            height={32}
            width={32}
            icon="material-symbols:groups-outline"
          />
        </ActionIcon>

        <Box
          pos="absolute"
          right={32}
          top={0}
          style={{ transform: "translateY(-50%)" }}
        >
          <ActionIcon size={56}>
            <Icon
              style={{
                height: rem(32),
                width: rem(32),
              }}
              height={32}
              width={32}
              icon="material-symbols:add"
            />
          </ActionIcon>
        </Box>
      </Group>
    </Container>
  );
}
