import { Card } from "@mui/material";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const BlankCard = ({ children, className }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative" }}
      className={className}
      elevation={9}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
