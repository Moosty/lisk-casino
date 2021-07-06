import React from "react";
import {Container, Button} from "@moosty/dao-storybook";

export const HandControl = ({split,double}) => {
  return (
    <Container className="justify-center	flex w-full flex-row space-x-4 items-center">
      {!double && <>
  <Button  label="Hit" />
  <Button  label="Stand" />
      {split &&
      <Button label="Split"/>
      }

      <Button label="Double"/>
      </>
      }

    </Container>
  )
}