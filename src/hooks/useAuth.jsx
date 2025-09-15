import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/auth/me", {
      withCredentials: true,
      headers: { "Cache-Control": "no-cache" }
    })
    .then((res) => {
      setUser(res.data.user);
      setLoading(false);
    })
    .catch(() => {
      setUser(null);
      setLoading(false);
    });
  }, []);

  return { user, setUser, loading };
}
