import React from "react";
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import CollectorListHeader from "./CollectorListHeader";
import CollectorsList from "./CollectorsList";

const CollectorBoard = () => {
  return (
    <Card>
      <CardHeader type="Collectors" />
      <CollectorListHeader />
      <CollectorsList />
    </Card>
  );
};

export default CollectorBoard;
