//before upload audio to service choose styles types
// choosestylemodel.tsx
export interface ChooseStylesProps {
  id: number;
  title: string;
  context: string;
  icon: string;
  importString?: string;
}

//authContext.tsx
export type AuthRes = {
  access: string;
  refresh: string;
};

export type User = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
};

export type UserStatusType = {
  id:"number",
  "user": {
      "id": number,
      "username": string,
      "email": string
  },
  "prime": boolean,
  "plus": boolean,
  "vip": boolean,
  "svip": boolean
}

export type ReturnAudioContextType = {
  "ori": string,
  "trans_res": string,
  "title": string,
  "file_name"?: string,
}

export type ContextData = {
  user: User | null;
  authTokens: AuthRes | null;
  loginUser: (event: React.FormEvent<HTMLFormElement>) => void | null;
  logoutUser: () => void | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthRes | null>>;
  chooseStyleData: ChooseStylesProps[] | null;
  mainPageData: MainpageHtmlProps | null;
  getAudioContext: ReturnAudioContextType | null;
  setGetAudioContext: React.Dispatch<React.SetStateAction<ReturnAudioContextType | null>>;
};

export type ContextProviderProps = {
  children: React.ReactNode;
};

//mainPage.tsx

export type MainpageHtmlProps = {
  id: number;
  title: string;
  top_0: string;
  top_1: string;
  top_2: string;
  top_3: string;
  top_4: string;
  top_5: string;
  mid_0: string;
  mid_1: string;
  mid_2: string;
  mid_3: string;
  mid_4: string;
  mid_5: string;
  bottom_0: string;
  bottom_1: string;
  bottom_2: string;
  bottom_3: string;
  bottom_4: string;
  bottom_5: string;
  bottom_6: string;
  bottom_7: string;
  created_at?: Date;
  updated_at?: Date;
};

//notes

export type NoteTypeProps = {
  id: string;
  userStatus: UserStatusType;
  title: string;
  ori: string;
  trans_res: string;
  tag_0: string;
  tag_1: string;
  tag_2: string;
  tag_3: string;
  tag_4: string;
  tag_5: string;
  created_at?: string;
  file_name?: string;
};
