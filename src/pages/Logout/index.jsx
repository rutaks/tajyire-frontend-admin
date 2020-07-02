import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout() {
  localStorage.TAJYIRE_TOKEN = '';
  return (
    <div>
      <Redirect to="/login" />
    </div>
  );
}
