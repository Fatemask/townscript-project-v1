export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  mobileNumber?: string;
  street?: string;
  zip?: number;
  roles: Roles;
}
