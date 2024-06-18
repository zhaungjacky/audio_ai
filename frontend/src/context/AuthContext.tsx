import jwtDecode from "jwt-decode";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthRes, ChooseStylesProps, ContextData, ContextProviderProps, MainpageHtmlProps, ReturnAudioContextType, User } from "../constants/props";
import useFetch from "../hook/useFetch";


export const AuthContext = createContext({} as ContextData);

//export useAuth api
export function useAuth() {
  return useContext(AuthContext);
}

//main function page
export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")!).access)
      : null
  );

  const [authTokens, setAuthTokens] = useState<AuthRes | null>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );

  //record context that voice transfer to context
  const [getAudioContext,setGetAudioContext] = useState<ReturnAudioContextType | null>({} as ReturnAudioContextType)

  //get choosestyledata from server
  const { data:chooseStyleDataServer } = useFetch<ChooseStylesProps[]>("/api/style-types/", false);
  const [chooseStyleData, setChooseStyleData] = React.useState([] as ChooseStylesProps[]);
  React.useEffect(() => {
    if (chooseStyleDataServer) {
      setChooseStyleData(chooseStyleDataServer);
    }
  }, [chooseStyleDataServer]);

  //get htmlpage data from server
  const {data:mainPageDataServer} = useFetch<MainpageHtmlProps[]>(
    "/api/mainpage-content/",
    false
  );
  const [mainPageData, setMainPageData] = React.useState<MainpageHtmlProps>( {} as MainpageHtmlProps );

  //initial get mainpage html data from server
  React.useEffect(() => {
    if (mainPageDataServer) {
      setMainPageData(mainPageDataServer[0]);
      // console.log(mainPageDataServer[0]);
    }
  }, [mainPageDataServer]);


  const logoutUser = useCallback(
    () => {
      setUser(null);
      setAuthTokens(null);
      localStorage.removeItem("authTokens");
      navigate('/');
      // navigate('/login');
    },
    [navigate]
  ) ;

  const loginUser = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let obj = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };

    if(!obj.username.trim() || !obj.password.trim()){
      alert('要素不全')
      return
    };
    
    try {
      fetch("/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if(res.statusText === 'Unauthorized') {
            alert('请核对用户名或密码,或未激活用户')
            console.log(res.statusText);
             return
          } else{
            alert('登陆失败')
            return
          }
        })
        .then((data: AuthRes) => {
          if(data !== undefined && data !== null){
            // console.log(data)
            // console.log(jwtDecode(data.access))
            setUser(jwtDecode(data.access));
            setAuthTokens(data);
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate('/')
          } else {
            logoutUser()
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [logoutUser, navigate]);



  const updateToken = useCallback(
    () => {
      try {
        if (authTokens?.access) {
          fetch("/api/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: authTokens?.refresh,
            }),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                // loginUser(event: React.FormEvent<HTMLFormElement>);
              }
            })
            .then((data) => {
              setAuthTokens({ ...authTokens, access: data?.access });
              setUser(jwtDecode(data?.access));
              localStorage.setItem(
                "authTokens",
                JSON.stringify({ ...authTokens, access: data?.access })
              );
              setLoading(false);
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [authTokens]
  );

  useEffect(() => {
    if (loading && authTokens?.access) {
      updateToken();
    }
    let timeInterval = 1000 * 60 * 58;
    let interval = setInterval(() => {
      if (authTokens?.access) {
        updateToken();
        // console.log("update token called!");
      }
      return () => clearInterval(interval);
    }, timeInterval);
  }, [authTokens, loading, updateToken]);

  const contextData = useMemo(
    () => ({
      user: user,
      authTokens: authTokens,
      loginUser: loginUser,
      logoutUser: logoutUser,
      setUser: setUser,
      setAuthTokens: setAuthTokens,
      chooseStyleData: chooseStyleData,
      mainPageData: mainPageData,
      getAudioContext: getAudioContext,
      setGetAudioContext: setGetAudioContext
    }),
    [user, authTokens, loginUser, logoutUser, chooseStyleData, mainPageData, getAudioContext]
  );

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
