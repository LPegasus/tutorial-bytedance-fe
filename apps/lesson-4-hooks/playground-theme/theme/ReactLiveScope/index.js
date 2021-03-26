import React from 'react';
import { searchUser } from '@sjtu-fe/github-scanner/es/api';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  github: {
    searchUser,
  },
};

export default ReactLiveScope;
