import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IProps {
  className: string;
  searchParamKey: string;
  defaultValue: string;
  tabList: { label: string; value: string }[] | [];
  vertical?: boolean;
  variant?: "outline" | "pills" | "default";
}

export const TabsSearchParamsNav = ({
  className,
  searchParamKey,
  defaultValue,
  tabList,
  vertical,
  variant,
}: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(defaultValue);

  useEffect(() => {
    const searchParam = searchParams.get(searchParamKey);
    if (searchParam && tabList.some((tab) => tab.value === searchParam)) {
      setTabValue(searchParam);
    }
  }, [searchParams, searchParamKey, tabList]);

  const onTabChange = (tabValue: string) => {
    setSearchParams({ [searchParamKey]: tabValue });
  };

  return (
    <Tabs
      orientation={vertical ? "vertical" : "horizontal"}
      variant={variant ? variant : "default"}
      value={tabValue}
      defaultValue={defaultValue}
      onTabChange={onTabChange}
      className={className}
    >
      <Tabs.List>
        {tabList.length > 0
          ? tabList.map((tab) => (
              <Tabs.Tab key={tab.label} value={tab.value}>
                {tab.label}
              </Tabs.Tab>
            ))
          : null}
      </Tabs.List>
    </Tabs>
  );
};
