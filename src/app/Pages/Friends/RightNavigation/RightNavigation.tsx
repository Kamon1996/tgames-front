import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tabs } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

type TabsType = {
  [key: string]: { label: string; value: string }[] | [];
};

type Props = {
  tabs: TabsType;
  currentTab: string;
};

export const RightNavigation = ({ tabs, currentTab }: Props) => {
  const [_, setSearchParams] = useSearchParams();

  const onTabChange = (tabValue: string) => {
    if (Object.keys(tabs).some((rightLabel) => tabs[rightLabel])) {
      setSearchParams({ section: tabs[tabValue][0]?.value || tabValue });
    }
  };

  return (
    <Tabs
      defaultValue={Object.keys(tabs)[0]}
      value={currentTab}
      orientation="vertical"
      variant="pills"
      onTabChange={onTabChange}
    >
      <Tabs.List>
        {Object.keys(tabs).map((tabLabel) => (
          <Tabs.Tab key={tabLabel} value={tabLabel}>
            {tabLabel}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
