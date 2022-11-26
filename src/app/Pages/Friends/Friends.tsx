import { Box, createStyles, Group, ScrollArea, Stack } from "@mantine/core";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Loader } from "app/components/Common/Loader/Loader";
import { UserCard } from "app/components/UserCards/UserCard";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetInvitesQuery } from "store/tgamesapi/people";
import { RightNavigation } from "./RightNavigation/RightNavigation";
import { TabsSearchParamsNav } from "./TabsSearchParamsNav/TabsSearchParamsNav";

type Tabs = {
  [key: string]: { label: string; value: string }[] | [];
};

const tabs: Tabs = {
  my_friends: [
    { label: "Friends", value: "all" },
    { label: "Friends Online", value: "online" },
  ],
  requests: [
    { label: "Sended Requests", value: "sended_requests" },
    { label: "Recived Requests", value: "recived_requests" },
  ],
  find_friends: [],
};

const useStyles = createStyles((theme) => ({
  headerNav: {
    marginBottom: 10,
  },
}));

export const Friends = () => {
  const [searchParams, _] = useSearchParams();
  const [currentSection, setSection] = useState({
    head: "all",
    right: "my_friends",
  });

  const { data, isLoading } = useGetInvitesQuery(
    currentSection.head || currentSection.right,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const searchParam = searchParams.get("section");
    if (!searchParam) return;
    Object.keys(tabs).forEach((navRightLabel) => {
      if (navRightLabel === searchParam) {
        return setSection({ head: "", right: navRightLabel });
      }
      tabs[navRightLabel].forEach((headTab) => {
        if (headTab.value === searchParam) {
          return setSection({ head: searchParam, right: navRightLabel });
        }
      });
    });
  }, [searchParams]);

  const { classes } = useStyles();

  return (
    <>
      {tabs[currentSection.right].length ? (
        <TabsSearchParamsNav
          className={classes.headerNav}
          searchParamKey="section"
          defaultValue={tabs[currentSection.right][0].value}
          tabList={tabs[currentSection.right]}
        />
      ) : (
        <div className="search_people"></div>
      )}
      <Group h={"100%"} noWrap align="start">
        <ScrollArea w={"100%"} h={"100%"} type="hover" scrollbarSize={6}>
          <Group>
            {data?.map((u) => (
              <UserCard
                key={u.user_id}
                user_id={u.user_id}
                invite_id={u.invite_id}
                created_at={u.created_at}
                username={u.username}
                name={u.name}
                email={u.email}
                status={u.status}
              />
            ))}
          </Group>
        </ScrollArea>
        <RightNavigation tabs={tabs} currentTab={currentSection.right} />
      </Group>
    </>
  );
};
