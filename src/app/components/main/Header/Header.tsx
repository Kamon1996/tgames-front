import { Button, Grid, createStyles, Popover, Center } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";
import { LoginForm } from "../../LoginWindow/form";

export function HeaderMain() {
  const profile = useAppSelector((store) => store.profile);
  const [popoverOpened, setPopoverOpened] = useState(false);
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
      {profile.isLogged ? (
        "Account Icon"
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
                <LoginForm closePopover={() => setPopoverOpened(false)} />
              </Popover.Dropdown>
            </Popover>
          </Center>
        </Grid.Col>
      )}
    </Grid>
  );
}
