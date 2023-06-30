import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "@firebase/auth";

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);

  const setUser = useUserStore((state) => state.setUser);

  const setUsername = useUserStore((state) => state.setUsername);

  const onAuthState = useCallback(
    (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing, setUser]
  );

  useEffect(() => {
    return onAuthStateChanged(auth, onAuthState); // unsubscribe on unmount
  }, [onAuthStateChanged]);

  return { initializing };
};

export default useAuth;
