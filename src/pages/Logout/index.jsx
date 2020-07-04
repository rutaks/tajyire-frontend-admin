import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Functional component representing the logout view of the project
 * where admin will be disconnect from the dashboard
 * @since version-1
 */
export default function Logout() {
  localStorage.TAJYIRE_TOKEN = '';
  return (
    <div>
      <Redirect to="/login" />
    </div>
  );
}
