import { useUserStore } from "../store/userStore";
import { useCallback } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getUsernameForId = async (userId) => {
  let name;
  if (!userId) {
    return "anonymous";
  }
  const querySnapshot = await getDocs(
    collection(db, `users/${userId}`, "username")
  );
  querySnapshot.forEach((doc) => {
    name = doc.data()?.username ?? "anonymous";
  });
  return name;
};

const useUsername = () => {
  const user = useUserStore((state) => state.user);

  const myId = user?.uid;

  const setUsername = useUserStore((state) => state.setUsername);

  const saveUsername = useCallback(
    async (username) => {
      await addDoc(collection(db, `users/${myId}`, "username"), {
        username: username,
        merge: true,
      });
      setUsername(username);
    },
    [myId, setUsername]
  );

  const getUsername = useCallback(
    async (userId = myId) => {
      return getUsernameForId(userId);
    },
    [myId]
  );

  return { saveUsername, getUsername };
};

export default useUsername;
