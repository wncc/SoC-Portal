import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState } from 'react';


function ProjectCard(props) {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.link} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
