import { useCallback, useState } from "react";
import { auth } from "../../../firebase";
import { parseFirebaseAuthError } from "../../utils/auth";
import createUserWithEmailAndPassword from "firebase/auth";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
      setError(parseFirebaseAuthError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  return { register, loading, error };
};

export default useRegister;
