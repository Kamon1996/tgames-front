import { Group, LoadingOverlay, Tabs } from "@mantine/core";
import { Loader } from "app/components/Common/Loader/Loader";
import { UserCard } from "app/components/UserCards/UserCard";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInvitesQuery } from "store/tgamesapi/people";

export const Friends = () => {
  const { data, isLoading } = useGetInvitesQuery();
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <>
      <Tabs
        value={tabValue}
        onTabChange={(value) => navigate(`/people/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="friends">Friends</Tabs.Tab>
          <Tabs.Tab disabled value="online">
            Friends Online
          </Tabs.Tab>
          <Tabs.Tab value="followers">Followers</Tabs.Tab>
          <Tabs.Tab value="following">Following</Tabs.Tab>
          <Tabs.Tab value="other">Other</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Group p="md" spacing="md">
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : data && tabValue ? (
          data[tabValue]?.map(
            ({ user_id, invite_id, username, name, email, created_at }) => (
              <UserCard
                key={user_id}
                user_id={user_id}
                invite_id={invite_id}
                created_at={created_at}
                username={username}
                name={name}
                email={email}
                status={tabValue}
              />
            )
          )
        ) : null}
      </Group>
    </>
  );
};
