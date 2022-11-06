import { LoadingOverlay } from "@mantine/core";
import React from "react";

interface IProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: IProps) => {
  return (
    <LoadingOverlay
      transitionDuration={300}
      overlayOpacity={0}
      visible={isLoading}
      overlayColor="#e3f5ff"
    />
  );
};
