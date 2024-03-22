export interface LoginUser {
  email: string;
  password: string;
}

export interface CreateUser extends LoginUser {
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
  // Should include name, membership status, other important details upon acct creation or login
}

export type CurrentUser = {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: {
    userCredentials: User;
    token: string;
  }) => Promise<void>;
  logout: () => void;
};

export type AccountInfo = {
  // image: string
  firstName: string;
  lastName: string;
  email: string;
  preferredName: string;
  // birthday: string
};

export interface ToastMessage {
  title: string;
  description: string;
  status: any; // Wouldn't take type string.
  duration: number;
  isClosable: boolean;
}

export interface ChangePassword {
  id: string | undefined;
  token: string | null;
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserInformation {
  //id: string | undefined;
  token: string | null;
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  email?: string;
}

export interface DeleteUser {
  id: string | undefined;
  token: string | null;
  password: string;
}

export interface TaskFormData {
  title: string;
  description: string;
}

export interface ModalContextInterface {
  form?: any | null;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  edits: TaskData;
  setEdits: (edits: TaskData) => void;
}

export interface TaskData {
  userId?: string;
  title: string;
  description?: string;
  priority: number;
  dueOn: string;
  index: string;
  completed: boolean;
}
