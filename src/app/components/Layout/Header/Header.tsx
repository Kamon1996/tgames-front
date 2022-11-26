import React, { useState } from "react";
import { Button, Grid, createStyles, Popover, Center } from "@mantine/core";
import { useClickOutside, useToggle } from "@mantine/hooks";
import { LoginForm } from "app/components/AuthPopover/LoginForm";
import { RegisterForm } from "app/components/AuthPopover/RegisterForm";
import { ProfileMenu } from "app/components/AvatarMenu";
import { useAppSelector } from "store";

export const HeaderMain = () => {
  const { isLogged } = useAppSelector((store) => store.profile);

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [type, toggle] = useToggle<"login" | "register">(["login", "register"]);
  const ref = useClickOutside(() => setPopoverOpened(false));

  const useStyles = createStyles((theme) => ({
    header: {
      backgroundColor: "transparent",
      height: 80,
      marginTop: 0,
      border: "none",
    },

    button: {
      backgroundColor: theme.colors.blue[5],
    },
    dropDown: {
      padding: 0,
    },
  }));
  const { classes } = useStyles();

  return (
    <Grid
      columns={12}
      className={classes.header}
      justify="space-between"
      align="center"
    >
      <Grid.Col span={6} xs={4} lg={3}>
        Logo
      </Grid.Col>
      {isLogged ? (
        <ProfileMenu />
      ) : (
        <Grid.Col span={6} xs={4} lg={3}>
          <Center ref={ref}>
            <Popover
              radius="md"
              trapFocus
              position="bottom"
              width={360}
              transition="pop"
              transitionDuration={300}
              opened={popoverOpened}
            >
              <Popover.Target>
                <Button
                  onClick={() => setPopoverOpened((prev) => !prev)}
                  className={classes.button}
                >
                  Login / Register
                </Button>
              </Popover.Target>
              <Popover.Dropdown className={classes.dropDown}>
                {type === "login" ? (
                  <LoginForm
                    toggleForm={() => toggle()}
                    closePopover={() => setPopoverOpened(false)}
                  />
                ) : (
                  <RegisterForm
                    toggleForm={() => toggle()}
                    closePopover={() => setPopoverOpened(false)}
                  />
                )}
              </Popover.Dropdown>
            </Popover>
          </Center>
        </Grid.Col>
      )}
    </Grid>
  );
};
